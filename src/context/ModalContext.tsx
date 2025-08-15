import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import CustomModal, { ModalButton } from '../components/molecules/CustomModal';

interface ModalConfig {
  title: string;
  message: string;
  buttons: ModalButton[];
  closeOnBackdrop?: boolean;
  iconType?: 'error' | 'success' | 'warning' | 'info';
}

interface ModalContextType {
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
  showAlert: (title: string, message: string, onConfirm?: () => void) => void;
  showConfirm: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  showError: (message: string, onConfirm?: () => void) => void;
  showSuccess: (message: string, onConfirm?: () => void) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showModal = useCallback((config: ModalConfig) => {
    setModalConfig(config);
    setIsVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsVisible(false);
    // Delay clearing config to allow animation to complete
    setTimeout(() => setModalConfig(null), 200);
  }, []);

  const showAlert = useCallback((title: string, message: string, onConfirm?: () => void) => {
    showModal({
      title: '',
      message,
      iconType: 'info',
      buttons: [
        {
          text: 'Aceptar',
          onPress: () => {
            try {
              hideModal();
              onConfirm?.();
            } catch (error) {
              console.error('Error en showAlert onPress:', error);
              hideModal();
            }
          },
          style: 'primary',
        },
      ],
    });
  }, [showModal, hideModal]);

  const showConfirm = useCallback((
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    showModal({
      title: '',
      message,
      iconType: 'warning',
      buttons: [
        {
          text: 'Cancelar',
          onPress: () => {
            try {
              hideModal();
              onCancel?.();
            } catch (error) {
              console.error('Error en showConfirm cancel:', error);
              hideModal();
            }
          },
          style: 'secondary',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            try {
              hideModal();
              onConfirm();
            } catch (error) {
              console.error('Error en showConfirm confirm:', error);
              hideModal();
            }
          },
          style: 'primary',
        },
      ],
      closeOnBackdrop: false,
    });
  }, [showModal, hideModal]);

  const showError = useCallback((message: string, onConfirm?: () => void) => {
    showModal({
      title: '',
      message,
      iconType: 'warning',
      buttons: [
        {
          text: 'Entendido',
          onPress: () => {
            try {
              hideModal();
              onConfirm?.();
            } catch (error) {
              console.error('Error en showError onPress:', error);
              hideModal();
            }
          },
          style: 'primary',
        },
      ],
    });
  }, [showModal, hideModal]);

  const showSuccess = useCallback((message: string, onConfirm?: () => void) => {
    showModal({
      title: '',
      message,
      iconType: 'success',
      buttons: [
        {
          text: 'Aceptar',
          onPress: () => {
            try {
              hideModal();
              onConfirm?.();
            } catch (error) {
              console.error('Error en showSuccess onPress:', error);
              hideModal();
            }
          },
          style: 'primary',
        },
      ],
    });
  }, [showModal, hideModal]);

  const value: ModalContextType = {
    showModal,
    hideModal,
    showAlert,
    showConfirm,
    showError,
    showSuccess,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalConfig && (
        <CustomModal
          visible={isVisible}
          title={modalConfig.title}
          message={modalConfig.message}
          buttons={modalConfig.buttons}
          onClose={hideModal}
          closeOnBackdrop={modalConfig.closeOnBackdrop}
          iconType={modalConfig.iconType}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Hook conveniente para manejo de errores
export const useErrorHandler = () => {
  const { showError } = useModal();
  
  return {
    handleError: (error: any, fallbackMessage = 'Ha ocurrido un error inesperado') => {
      const message = error?.message || error?.toString() || fallbackMessage;
      showError(message);
    },
    handleAuthError: (error: any) => {
      const message = error?.message || error?.toString() || 'Credenciales inválidas';
      // Para errores de autenticación, usar un mensaje más amigable
      if (message.includes('Invalid login credentials') || message.includes('email') || message.includes('password')) {
        showError('Las credenciales ingresadas no son correctas. Por favor, verifica tu email y contraseña.');
      } else {
        showError(message);
      }
    },
  };
};
