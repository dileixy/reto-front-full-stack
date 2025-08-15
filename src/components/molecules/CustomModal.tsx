import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLORS } from '../../styles/colors';
import { SPACING } from '../../styles/spacing';
import { TYPOGRAPHY } from '../../styles/typography';
import { RADIUS } from '../../styles/radius';
import { SHADOWS } from '../../styles/shadows';
import ModalIcon from '../atoms/ModalIcon/ModalIcon';

export interface ModalButton {
  text: string;
  onPress: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

interface CustomModalProps {
  visible: boolean;
  title: string;
  message: string;
  buttons: ModalButton[];
  onClose: () => void;
  closeOnBackdrop?: boolean;
  iconType?: 'error' | 'success' | 'warning' | 'info';
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  message,
  buttons,
  onClose,
  closeOnBackdrop = true,
  iconType,
}) => {
  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  const getButtonStyle = (style: 'primary' | 'secondary' | 'danger' = 'primary') => {
    switch (style) {
      case 'primary':
        return [styles.button, styles.primaryButton];
      case 'secondary':
        return [styles.button, styles.secondaryButton];
      case 'danger':
        return [styles.button, styles.dangerButton];
      default:
        return [styles.button, styles.primaryButton];
    }
  };

  const getButtonTextStyle = (style: 'primary' | 'secondary' | 'danger' = 'primary') => {
    switch (style) {
      case 'primary':
        return [styles.buttonText, styles.primaryButtonText];
      case 'secondary':
        return [styles.buttonText, styles.secondaryButtonText];
      case 'danger':
        return [styles.buttonText, styles.dangerButtonText];
      default:
        return [styles.buttonText, styles.primaryButtonText];
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop} testID="modal-backdrop">
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {iconType && (
                  <View style={styles.iconOnlyContainer}>
                    <ModalIcon type={iconType} />
                  </View>
                )}
                <Text style={styles.message}>{message}</Text>
                
                <View style={styles.buttonsContainer}>
                  {buttons.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      style={getButtonStyle(button.style)}
                      onPress={button.onPress}
                    >
                      <Text style={getButtonTextStyle(button.style)}>
                        {button.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    margin: SPACING.large,
    maxWidth: 350,
    width: '90%',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    padding: SPACING.large,
    alignItems: 'center',
    ...SHADOWS.md,
    minWidth: 280,
  },
  iconOnlyContainer: {
    alignItems: 'center',
    marginBottom: SPACING.large,
  },
  message: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text,
    marginBottom: SPACING.large,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: SPACING.medium,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  dangerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  buttonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  primaryButtonText: {
    color: COLORS.white,
  },
  secondaryButtonText: {
    color: COLORS.text,
  },
  dangerButtonText: {
    color: COLORS.text,
  },
});

export default CustomModal;
