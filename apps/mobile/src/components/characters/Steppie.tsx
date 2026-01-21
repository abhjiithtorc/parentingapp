import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Ellipse,
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { colors } from '@/utils/theme';

type SteppieMood = 'happy' | 'excited' | 'thinking' | 'celebrating' | 'sleeping' | 'waving';
type SteppieSize = 'sm' | 'md' | 'lg' | 'xl';

interface SteppieProps {
  mood?: SteppieMood;
  size?: SteppieSize;
  animated?: boolean;
  message?: string;
}

/**
 * Steppie - The LittleSteps Mascot
 *
 * A friendly purple owl character that guides parents through their journey.
 * Inspired by Duolingo's Duo but unique to our brand.
 */
export const Steppie: React.FC<SteppieProps> = ({
  mood = 'happy',
  size = 'md',
  animated = true,
}) => {
  const bounce = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const eyeBlink = useSharedValue(1);

  const sizeMap: Record<SteppieSize, number> = {
    sm: 60,
    md: 100,
    lg: 150,
    xl: 200,
  };

  const dimension = sizeMap[size];

  useEffect(() => {
    if (!animated) return;

    // Gentle bounce animation
    bounce.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Blink animation
    eyeBlink.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500 }),
        withTiming(0.1, { duration: 100 }),
        withTiming(1, { duration: 100 }),
        withTiming(1, { duration: 2500 })
      ),
      -1,
      false
    );

    // Mood-specific animations
    if (mood === 'excited' || mood === 'celebrating') {
      scale.value = withRepeat(
        withSequence(
          withSpring(1.1, { damping: 8 }),
          withSpring(1, { damping: 8 })
        ),
        -1,
        true
      );
    }

    if (mood === 'waving') {
      rotate.value = withRepeat(
        withSequence(
          withTiming(10, { duration: 300 }),
          withTiming(-10, { duration: 300 })
        ),
        -1,
        true
      );
    }
  }, [animated, mood]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bounce.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
  }));

  const eyeScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: eyeBlink.value }],
  }));

  const getEyeExpression = () => {
    switch (mood) {
      case 'happy':
        return { leftEyeY: 35, rightEyeY: 35, eyeHeight: 12 };
      case 'excited':
        return { leftEyeY: 33, rightEyeY: 33, eyeHeight: 14 };
      case 'thinking':
        return { leftEyeY: 36, rightEyeY: 34, eyeHeight: 10 };
      case 'celebrating':
        return { leftEyeY: 32, rightEyeY: 32, eyeHeight: 8 }; // Happy squint
      case 'sleeping':
        return { leftEyeY: 38, rightEyeY: 38, eyeHeight: 2 };
      case 'waving':
        return { leftEyeY: 35, rightEyeY: 35, eyeHeight: 12 };
      default:
        return { leftEyeY: 35, rightEyeY: 35, eyeHeight: 12 };
    }
  };

  const getMouthPath = () => {
    switch (mood) {
      case 'happy':
        return 'M 40 55 Q 50 62 60 55';
      case 'excited':
        return 'M 38 52 Q 50 65 62 52';
      case 'thinking':
        return 'M 45 55 Q 50 55 55 56';
      case 'celebrating':
        return 'M 35 50 Q 50 68 65 50';
      case 'sleeping':
        return 'M 45 56 Q 50 58 55 56';
      case 'waving':
        return 'M 40 54 Q 50 62 60 54';
      default:
        return 'M 40 55 Q 50 62 60 55';
    }
  };

  const { leftEyeY, rightEyeY, eyeHeight } = getEyeExpression();

  return (
    <View style={[styles.container, { width: dimension, height: dimension }]}>
      <Animated.View style={animatedStyle}>
        <Svg width={dimension} height={dimension} viewBox="0 0 100 100">
          <Defs>
            <LinearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={colors.primary[400]} />
              <Stop offset="100%" stopColor={colors.primary[600]} />
            </LinearGradient>
            <LinearGradient id="bellyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={colors.primary[200]} />
              <Stop offset="100%" stopColor={colors.primary[300]} />
            </LinearGradient>
          </Defs>

          {/* Body */}
          <Ellipse
            cx="50"
            cy="55"
            rx="35"
            ry="40"
            fill="url(#bodyGradient)"
          />

          {/* Belly */}
          <Ellipse
            cx="50"
            cy="60"
            rx="22"
            ry="25"
            fill="url(#bellyGradient)"
          />

          {/* Left Ear/Tuft */}
          <Path
            d="M 20 25 Q 15 10 30 20 Q 25 25 28 30"
            fill={colors.primary[500]}
          />

          {/* Right Ear/Tuft */}
          <Path
            d="M 80 25 Q 85 10 70 20 Q 75 25 72 30"
            fill={colors.primary[500]}
          />

          {/* Eye whites */}
          <Ellipse cx="38" cy="38" rx="12" ry="14" fill="white" />
          <Ellipse cx="62" cy="38" rx="12" ry="14" fill="white" />

          {/* Pupils */}
          <Animated.View style={eyeScaleStyle}>
            <Svg width={dimension} height={dimension} viewBox="0 0 100 100" style={StyleSheet.absoluteFill}>
              <Ellipse
                cx="38"
                cy={leftEyeY}
                rx="6"
                ry={eyeHeight}
                fill={colors.character.eyes}
              />
              <Ellipse
                cx="62"
                cy={rightEyeY}
                rx="6"
                ry={eyeHeight}
                fill={colors.character.eyes}
              />
              {/* Eye sparkle */}
              <Circle cx="35" cy={leftEyeY - 3} r="2" fill="white" />
              <Circle cx="59" cy={rightEyeY - 3} r="2" fill="white" />
            </Svg>
          </Animated.View>

          {/* Beak */}
          <Path
            d="M 45 45 L 50 52 L 55 45 Z"
            fill={colors.secondary.orange}
          />

          {/* Mouth */}
          <Path
            d={getMouthPath()}
            stroke={colors.primary[700]}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Cheeks */}
          <Circle cx="25" cy="48" r="6" fill={colors.character.cheeks} opacity={0.6} />
          <Circle cx="75" cy="48" r="6" fill={colors.character.cheeks} opacity={0.6} />

          {/* Feet */}
          <Ellipse cx="40" cy="92" rx="8" ry="4" fill={colors.secondary.orange} />
          <Ellipse cx="60" cy="92" rx="8" ry="4" fill={colors.secondary.orange} />

          {/* Wing (left) */}
          <Path
            d="M 15 55 Q 5 60 10 75 Q 15 70 20 65"
            fill={colors.primary[600]}
          />

          {/* Wing (right) - waving if mood is waving */}
          {mood === 'waving' ? (
            <G>
              <Path
                d="M 85 45 Q 95 35 90 55 Q 85 50 80 55"
                fill={colors.primary[600]}
              />
            </G>
          ) : (
            <Path
              d="M 85 55 Q 95 60 90 75 Q 85 70 80 65"
              fill={colors.primary[600]}
            />
          )}

          {/* Celebration extras */}
          {mood === 'celebrating' && (
            <G>
              <Circle cx="20" cy="15" r="3" fill={colors.secondary.yellow} />
              <Circle cx="80" cy="12" r="2" fill={colors.secondary.pink} />
              <Circle cx="15" cy="30" r="2" fill={colors.secondary.green} />
              <Circle cx="85" cy="28" r="3" fill={colors.secondary.blue} />
            </G>
          )}
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Steppie;
