import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius } from '@/utils/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = useSharedValue(colors.neutral[300]);
  const labelScale = useSharedValue(1);

  const handleFocus = () => {
    setIsFocused(true);
    borderColor.value = withSpring(1);
    labelScale.value = withSpring(0.9);
  };

  const handleBlur = () => {
    setIsFocused(false);
    borderColor.value = withSpring(0);
    labelScale.value = withSpring(1);
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderColor: error
      ? colors.error
      : isFocused
        ? colors.primary[500]
        : colors.neutral[300],
    borderWidth: isFocused ? 2 : 1.5,
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    transform: [{ scale: labelScale.value }],
  }));

  return (
    <View style={styles.wrapper}>
      {label && (
        <Animated.Text style={[styles.label, animatedLabelStyle]}>
          {label}
        </Animated.Text>
      )}

      <Animated.View style={[styles.container, animatedContainerStyle]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            style,
          ]}
          placeholderTextColor={colors.neutral[400]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </Animated.View>

      {(error || hint) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || hint}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing[4],
  },
  label: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[700],
    marginBottom: spacing[2],
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    minHeight: 56,
  },
  input: {
    flex: 1,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  inputWithLeftIcon: {
    paddingLeft: spacing[1],
  },
  inputWithRightIcon: {
    paddingRight: spacing[1],
  },
  leftIcon: {
    paddingLeft: spacing[4],
  },
  rightIcon: {
    paddingRight: spacing[4],
  },
  helperText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    marginTop: spacing[1],
  },
  errorText: {
    color: colors.error,
  },
});

export default Input;
