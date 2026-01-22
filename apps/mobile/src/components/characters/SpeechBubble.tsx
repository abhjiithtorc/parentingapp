import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { colors, typography, spacing, borderRadius, shadows } from '@/utils/theme';

interface SpeechBubbleProps {
  message: string;
  position?: 'left' | 'right' | 'bottom';
  variant?: 'default' | 'tip' | 'celebration' | 'warning';
  animated?: boolean;
  delay?: number;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  message,
  position = 'right',
  variant = 'default',
  animated = true,
  delay = 0,
}) => {
  const scale = useSharedValue(animated ? 0 : 1);
  const opacity = useSharedValue(animated ? 0 : 1);

  useEffect(() => {
    if (animated) {
      scale.value = withDelay(delay, withSpring(1, { damping: 12, stiffness: 150 }));
      opacity.value = withDelay(delay, withSpring(1));
    }
  }, [animated, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const getVariantStyles = () => {
    switch (variant) {
      case 'tip':
        return {
          backgroundColor: colors.secondary.blueLight,
          borderColor: colors.secondary.blue,
          textColor: colors.neutral[800],
        };
      case 'celebration':
        return {
          backgroundColor: colors.secondary.yellowLight,
          borderColor: colors.secondary.yellow,
          textColor: colors.neutral[800],
        };
      case 'warning':
        return {
          backgroundColor: colors.secondary.orangeLight,
          borderColor: colors.secondary.orange,
          textColor: colors.neutral[800],
        };
      default:
        return {
          backgroundColor: colors.neutral.white,
          borderColor: colors.neutral[200],
          textColor: colors.neutral[800],
        };
    }
  };

  const variantStyles = getVariantStyles();

  const getTailPosition = () => {
    switch (position) {
      case 'left':
        return { left: -10, top: '50%', transform: [{ translateY: -10 }, { rotate: '90deg' }] };
      case 'right':
        return { right: -10, top: '50%', transform: [{ translateY: -10 }, { rotate: '-90deg' }] };
      case 'bottom':
        return { bottom: -10, left: '50%', transform: [{ translateX: -10 }] };
      default:
        return { left: -10, top: '50%', transform: [{ translateY: -10 }, { rotate: '90deg' }] };
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: variantStyles.backgroundColor,
            borderColor: variantStyles.borderColor,
          },
        ]}
      >
        <Text style={[styles.text, { color: variantStyles.textColor }]}>{message}</Text>

        {/* Speech bubble tail */}
        <View style={[styles.tail, getTailPosition()]}>
          <Svg width={20} height={20} viewBox="0 0 20 20">
            <Path
              d="M 0 0 L 10 10 L 20 0 Z"
              fill={variantStyles.backgroundColor}
            />
            <Path
              d="M 0 0 L 10 10 L 20 0"
              stroke={variantStyles.borderColor}
              strokeWidth={2}
              fill="none"
            />
          </Svg>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 250,
  },
  bubble: {
    padding: spacing[3],
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    ...shadows.md,
  },
  text: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.base,
    lineHeight: typography.fontSize.base * 1.4,
  },
  tail: {
    position: 'absolute',
  },
});

export default SpeechBubble;
