import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/utils/theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'streak' | 'new';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
  icon,
  style,
}) => {
  const { containerStyle, textStyle } = getBadgeStyles(variant, size);

  return (
    <View style={[styles.container, containerStyle, style]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </View>
  );
};

const getBadgeStyles = (variant: BadgeVariant, size: BadgeSize) => {
  const sizeStyles: Record<BadgeSize, { container: ViewStyle; fontSize: number }> = {
    sm: {
      container: { paddingVertical: spacing[1], paddingHorizontal: spacing[2] },
      fontSize: typography.fontSize.xs,
    },
    md: {
      container: { paddingVertical: spacing[1], paddingHorizontal: spacing[3] },
      fontSize: typography.fontSize.sm,
    },
    lg: {
      container: { paddingVertical: spacing[2], paddingHorizontal: spacing[4] },
      fontSize: typography.fontSize.base,
    },
  };

  const variantStyles: Record<BadgeVariant, { bg: string; text: string; border?: string }> = {
    default: {
      bg: colors.primary[100],
      text: colors.primary[700],
    },
    success: {
      bg: colors.secondary.greenLight,
      text: '#065F46',
    },
    warning: {
      bg: colors.secondary.yellowLight,
      text: '#92400E',
    },
    error: {
      bg: colors.secondary.redLight,
      text: '#991B1B',
    },
    info: {
      bg: colors.secondary.blueLight,
      text: '#1E40AF',
    },
    streak: {
      bg: colors.secondary.orange,
      text: colors.neutral.white,
    },
    new: {
      bg: colors.secondary.pink,
      text: colors.neutral.white,
    },
  };

  const { container, fontSize } = sizeStyles[size];
  const { bg, text, border } = variantStyles[variant];

  return {
    containerStyle: {
      ...container,
      backgroundColor: bg,
      borderColor: border,
      borderWidth: border ? 1 : 0,
    },
    textStyle: {
      fontSize,
      color: text,
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: spacing[1],
  },
  text: {
    fontFamily: typography.fontFamily.bold,
  },
});

export default Badge;
