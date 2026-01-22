import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius } from '@/utils/theme';

type ProgressVariant = 'default' | 'success' | 'warning' | 'milestone';
type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  progress: number; // 0-100
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  animated = true,
}) => {
  const width = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      width.value = withDelay(
        200,
        withSpring(progress, { damping: 15, stiffness: 100 })
      );
    } else {
      width.value = progress;
    }
  }, [progress, animated]);

  const animatedWidth = useAnimatedStyle(() => ({
    width: `${Math.min(100, Math.max(0, width.value))}%`,
  }));

  const { trackStyle, fillStyle, height } = getProgressStyles(variant, size);

  return (
    <View style={styles.container}>
      {(showLabel || label) && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label || `${Math.round(progress)}%`}</Text>
        </View>
      )}
      <View style={[styles.track, trackStyle, { height }]}>
        <Animated.View style={[styles.fill, fillStyle, { height }, animatedWidth]} />
      </View>
    </View>
  );
};

const getProgressStyles = (variant: ProgressVariant, size: ProgressSize) => {
  const sizeMap: Record<ProgressSize, number> = {
    sm: 8,
    md: 12,
    lg: 20,
  };

  const variantColors: Record<ProgressVariant, { track: string; fill: string }> = {
    default: {
      track: colors.primary[100],
      fill: colors.primary[500],
    },
    success: {
      track: colors.secondary.greenLight,
      fill: colors.secondary.green,
    },
    warning: {
      track: colors.secondary.yellowLight,
      fill: colors.secondary.yellow,
    },
    milestone: {
      track: colors.secondary.pinkLight,
      fill: colors.secondary.pink,
    },
  };

  const { track, fill } = variantColors[variant];

  return {
    height: sizeMap[size],
    trackStyle: { backgroundColor: track },
    fillStyle: { backgroundColor: fill },
  };
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    marginBottom: spacing[1],
  },
  label: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
  },
  track: {
    width: '100%',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: borderRadius.full,
  },
});

export default ProgressBar;
