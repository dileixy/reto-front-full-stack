import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, Text, View, Animated, Easing, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { UserIcon } from 'react-native-heroicons/solid';
import { userButtonStyles } from '../../../styles';

interface UserButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const UserButton = ({ onPress, disabled = false }: UserButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const expandButton = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setIsExpanded(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  };

  const collapseButton = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      easing: Easing.in(Easing.quad),
      useNativeDriver: false,
    }).start(() => {
      setIsExpanded(false);
    });
  };

  const handleIconPress = () => {
    if (!isExpanded) {
      expandButton();
    } else {
      collapseButton();
    }
  };

  const handleLogoutPress = () => {
    collapseButton();
    setTimeout(() => {
      onPress(); // Execute logout after animation
    }, 200);
  };

  const buttonWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [56, 180], // Expande de 56px (circular) a 180px para dar más espacio al texto
  });

  const textOpacity = animation.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0, 1], // El texto aparece al final
  });

  return (
    <>
      {/* Overlay de pantalla completa para detectar clicks fuera */}
      {isExpanded && (
        <View style={userButtonStyles.fullScreenOverlay}>
          <TouchableWithoutFeedback onPress={collapseButton}>
            <View style={{ width: screenWidth, height: screenHeight }} />
          </TouchableWithoutFeedback>
        </View>
      )}
      
      {/* Botón de usuario */}
      <View style={{ position: 'relative', zIndex: 1001 }}>
        <Animated.View style={[userButtonStyles.container, { width: buttonWidth }]}>
          <View
            style={[
              userButtonStyles.button,
              disabled && userButtonStyles.buttonDisabled,
              { width: '100%' }
            ]}
          >
            {/* Icono de usuario - siempre visible */}
            <TouchableOpacity
              style={userButtonStyles.iconContainer}
              onPress={handleIconPress}
              disabled={disabled}
              activeOpacity={0.8}
            >
              <UserIcon size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Texto de cerrar sesión - solo visible cuando está expandido */}
            {isExpanded && (
              <TouchableOpacity
                style={userButtonStyles.textContainer}
                onPress={handleLogoutPress}
                activeOpacity={0.8}
              >
                <Animated.Text 
                  style={[
                    userButtonStyles.expandedText, 
                    { opacity: textOpacity }
                  ]}
                >
                  Cerrar sesión
                </Animated.Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
    </>
  );
};

export default UserButton;
