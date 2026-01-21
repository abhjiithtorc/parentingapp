import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Steppie } from '@/components/characters';
import { colors, typography } from '@/utils/theme';

export default function SplashScreen() {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <LinearGradient
      colors={[colors.primary[500], colors.primary[700]]}
      style={styles.container}
    >
      <Animated.View style={[styles.content, animatedStyle]}>
        <Steppie mood="happy" size="xl" animated />
        <Text style={styles.title}>LittleSteps</Text>
        <Text style={styles.subtitle}>Your parenting companion</Text>
      </Animated.View>

      <View style={styles.loadingContainer}>
        <LoadingDots />
      </View>
    </LinearGradient>
  );
}

function LoadingDots() {
  const dot1 = useSharedValue(1);
  const dot2 = useSharedValue(1);
  const dot3 = useSharedValue(1);

  useEffect(() => {
    dot1.value = withRepeat(
      withSequence(
        withTiming(1.4, { duration: 300 }),
        withTiming(1, { duration: 300 })
      ),
      -1,
      false
    );

    setTimeout(() => {
      dot2.value = withRepeat(
        withSequence(
          withTiming(1.4, { duration: 300 }),
          withTiming(1, { duration: 300 })
        ),
        -1,
        false
      );
    }, 150);

    setTimeout(() => {
      dot3.value = withRepeat(
        withSequence(
          withTiming(1.4, { duration: 300 }),
          withTiming(1, { duration: 300 })
        ),
        -1,
        false
      );
    }, 300);
  }, []);

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot1.value }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot2.value }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot3.value }],
  }));

  return (
    <View style={styles.dots}>
      <Animated.View style={[styles.dot, dot1Style]} />
      <Animated.View style={[styles.dot, dot2Style]} />
      <Animated.View style={[styles.dot, dot3Style]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['4xl'],
    color: colors.neutral.white,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
    color: colors.primary[200],
    marginTop: 8,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.neutral.white,
  },
});
