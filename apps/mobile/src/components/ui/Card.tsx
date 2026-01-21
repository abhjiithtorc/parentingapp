import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius, shadows } from '@/utils/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled' | 'gradient';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
  color?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  onPress,
  style,
  padding = 4,
  color,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.98, { damping: 15, stiffness: 400 });
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    }
  };

  const cardStyles = getCardStyles(variant, color);

  if (onPress) {
    return (
      <AnimatedPressable
        style={[styles.card, cardStyles, { padding: spacing[padding] }, animatedStyle, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return (
    <View style={[styles.card, cardStyles, { padding: spacing[padding] }, style]}>
      {children}
    </View>
  );
};

const getCardStyles = (variant: CardVariant, color?: string): ViewStyle => {
  const variantStyles: Record<CardVariant, ViewStyle> = {
    default: {
      backgroundColor: colors.background.card,
      ...shadows.sm,
    },
    elevated: {
      backgroundColor: colors.background.card,
      ...shadows.lg,
    },
    outlined: {
      backgroundColor: colors.background.card,
      borderWidth: 2,
      borderColor: colors.neutral[200],
    },
    filled: {
      backgroundColor: color || colors.primary[50],
    },
    gradient: {
      backgroundColor: colors.primary[100],
    },
  };

  return variantStyles[variant];
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
  },
});

export default Card;
