import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ViewToken,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Steppie } from '@/components/characters';
import { Button } from '@/components/ui';
import { colors, typography, spacing } from '@/utils/theme';
import { RootStackParamList } from '@/navigation/types';

const { width } = Dimensions.get('window');

type SteppieMood = 'happy' | 'excited' | 'celebrating' | 'waving';

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  mood: SteppieMood;
  gradient: [string, string];
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Welcome to LittleSteps!',
    description:
      "I'm Steppie, your friendly parenting companion. Let me help you track your little one's amazing journey!",
    mood: 'waving',
    gradient: [colors.primary[400], colors.primary[600]],
  },
  {
    id: '2',
    title: 'Track Milestones',
    description:
      "First smile, first steps, first words - celebrate every achievement and never miss a precious moment!",
    mood: 'excited',
    gradient: [colors.secondary.pink, '#DB2777'],
  },
  {
    id: '3',
    title: 'Monitor Growth',
    description:
      'Easy-to-read charts help you track height, weight, and more. Share updates with your pediatrician effortlessly.',
    mood: 'happy',
    gradient: [colors.secondary.green, '#059669'],
  },
  {
    id: '4',
    title: 'Daily Tips & Support',
    description:
      "Get personalized advice for your child's age. You've got this, and I'm here to help every step of the way!",
    mood: 'celebrating',
    gradient: [colors.secondary.yellow, colors.secondary.orange],
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    }
  ).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Auth', { screen: 'Welcome' });
    }
  };

  const handleSkip = () => {
    navigation.navigate('Auth', { screen: 'Welcome' });
  };

  const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => (
    <View style={styles.slide}>
      <LinearGradient colors={item.gradient} style={styles.gradient}>
        <View style={styles.characterContainer}>
          <Steppie mood={item.mood} size="xl" animated />
        </View>
      </LinearGradient>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        onScroll={(e) => {
          scrollX.value = e.nativeEvent.contentOffset.x;
        }}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <PaginationDot key={index} index={index} currentIndex={currentIndex} />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        {currentIndex < slides.length - 1 ? (
          <>
            <Button
              title="Skip"
              variant="ghost"
              onPress={handleSkip}
              style={styles.skipButton}
            />
            <Button
              title="Next"
              variant="primary"
              onPress={handleNext}
              style={styles.nextButton}
            />
          </>
        ) : (
          <Button
            title="Get Started"
            variant="primary"
            onPress={handleNext}
            fullWidth
          />
        )}
      </View>
    </View>
  );
}

function PaginationDot({
  index,
  currentIndex,
}: {
  index: number;
  currentIndex: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = index === currentIndex;
    return {
      width: withSpring(isActive ? 24 : 8),
      opacity: withSpring(isActive ? 1 : 0.4),
      backgroundColor: colors.primary[500],
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  slide: {
    width,
    flex: 1,
  },
  gradient: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  characterContainer: {
    marginTop: 40,
  },
  textContainer: {
    flex: 0.45,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[8],
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['2xl'],
    color: colors.neutral[900],
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  description: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.base,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing[6],
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  buttons: {
    flexDirection: 'row',
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[10],
    gap: spacing[3],
  },
  skipButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});
