import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { colors, typography, spacing, borderRadius } from '@/utils/theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  haptic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
  haptic = true,
}) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
    translateY.value = withSpring(2, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    translateY.value = withSpring(0, { damping: 15, stiffness: 400 });
  };

  const handlePress = () => {
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  };

  const buttonStyles = getButtonStyles(variant, size, disabled, fullWidth);
  const textStyles = getTextStyles(variant, size, disabled);

  return (
    <AnimatedTouchable
      style={[styles.button, buttonStyles, animatedStyle, style]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.9}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? colors.primary[600] : colors.neutral.white}
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={[styles.text, textStyles, textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </AnimatedTouchable>
  );
};

const getButtonStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
  fullWidth: boolean
): ViewStyle => {
  const baseStyle: ViewStyle = {
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : undefined,
  };

  // Size styles
  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    sm: { paddingVertical: spacing[2], paddingHorizontal: spacing[4], minHeight: 40 },
    md: { paddingVertical: spacing[3], paddingHorizontal: spacing[6], minHeight: 52 },
    lg: { paddingVertical: spacing[4], paddingHorizontal: spacing[8], minHeight: 60 },
  };

  // Variant styles (Duolingo-style with bottom shadow border)
  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: colors.primary[500],
      borderBottomWidth: 4,
      borderBottomColor: colors.primary[700],
    },
    secondary: {
      backgroundColor: colors.secondary.blue,
      borderBottomWidth: 4,
      borderBottomColor: '#2563EB',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.primary[500],
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    success: {
      backgroundColor: colors.secondary.green,
      borderBottomWidth: 4,
      borderBottomColor: '#059669',
    },
    warning: {
      backgroundColor: colors.secondary.yellow,
      borderBottomWidth: 4,
      borderBottomColor: '#D97706',
    },
  };

  return { ...baseStyle, ...sizeStyles[size], ...variantStyles[variant] };
};

const getTextStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean
): TextStyle => {
  const sizeStyles: Record<ButtonSize, TextStyle> = {
    sm: { fontSize: typography.fontSize.sm },
    md: { fontSize: typography.fontSize.base },
    lg: { fontSize: typography.fontSize.lg },
  };

  const colorStyles: Record<ButtonVariant, TextStyle> = {
    primary: { color: colors.neutral.white },
    secondary: { color: colors.neutral.white },
    outline: { color: colors.primary[600] },
    ghost: { color: colors.primary[600] },
    success: { color: colors.neutral.white },
    warning: { color: colors.neutral[900] },
  };

  return { ...sizeStyles[size], ...colorStyles[variant] };
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.xl,
    gap: spacing[2],
  },
  text: {
    fontFamily: typography.fontFamily.bold,
    textAlign: 'center',
  },
});

export default Button;
