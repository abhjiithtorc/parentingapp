import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';

import { Card, Badge } from '@/components/ui';
import { Steppie } from '@/components/characters';
import { colors, typography, spacing, borderRadius } from '@/utils/theme';

const categories = [
  { id: 'all', name: 'All', emoji: '✨' },
  { id: 'development', name: 'Development', emoji: '🧒' },
  { id: 'health', name: 'Health', emoji: '🏥' },
  { id: 'nutrition', name: 'Nutrition', emoji: '🥗' },
  { id: 'sleep', name: 'Sleep', emoji: '😴' },
  { id: 'activities', name: 'Activities', emoji: '🎨' },
];

const featuredArticles = [
  {
    id: '1',
    title: 'Understanding Your Baby\'s Sleep Cycles',
    category: 'Sleep',
    readTime: 5,
    image: 'https://picsum.photos/300/200?1',
  },
  {
    id: '2',
    title: 'Introducing Solid Foods: A Complete Guide',
    category: 'Nutrition',
    readTime: 8,
    image: 'https://picsum.photos/300/200?2',
  },
];

const dailyTips = [
  {
    id: '1',
    title: 'Tummy Time Tips',
    content: 'Start with 3-5 minutes of tummy time, several times a day.',
    emoji: '👶',
  },
  {
    id: '2',
    title: 'Reading Together',
    content: 'Reading aloud helps develop language skills from day one.',
    emoji: '📚',
  },
  {
    id: '3',
    title: 'Skin-to-Skin',
    content: 'Skin-to-skin contact helps regulate baby\'s temperature and heart rate.',
    emoji: '🤱',
  },
];

export default function DiscoverScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Circle cx="11" cy="11" r="8" stroke={colors.neutral[400]} strokeWidth={2} />
            <Path
              d="M21 21l-4.35-4.35"
              stroke={colors.neutral[400]}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
          <TextInput
            style={styles.searchInput}
            placeholder="Search articles, tips..."
            placeholderTextColor={colors.neutral[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text
                style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.categoryNameActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Articles */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContainer}
          >
            {featuredArticles.map((article, index) => (
              <Animated.View
                key={article.id}
                entering={FadeInRight.delay(200 + index * 100).springify()}
              >
                <TouchableOpacity style={styles.featuredCard}>
                  <View style={styles.featuredImageContainer}>
                    <View style={styles.featuredImagePlaceholder}>
                      <Text style={styles.placeholderEmoji}>📖</Text>
                    </View>
                  </View>
                  <View style={styles.featuredContent}>
                    <Badge label={article.category} size="sm" />
                    <Text style={styles.featuredTitle} numberOfLines={2}>
                      {article.title}
                    </Text>
                    <Text style={styles.readTime}>{article.readTime} min read</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Daily Tips */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Tips</Text>
          </View>

          <View style={styles.tipsContainer}>
            {dailyTips.map((tip, index) => (
              <Animated.View
                key={tip.id}
                entering={FadeInDown.delay(400 + index * 100).springify()}
              >
                <Card variant="default" padding={4} style={styles.tipCard}>
                  <View style={styles.tipHeader}>
                    <View style={styles.tipIcon}>
                      <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                    </View>
                    <View style={styles.tipContent}>
                      <Text style={styles.tipTitle}>{tip.title}</Text>
                      <Text style={styles.tipText}>{tip.content}</Text>
                    </View>
                  </View>
                </Card>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Ask Steppie */}
        <Animated.View entering={FadeInDown.delay(600).springify()}>
          <Card
            variant="filled"
            color={colors.primary[100]}
            padding={5}
            style={styles.askCard}
          >
            <View style={styles.askContent}>
              <View style={styles.askText}>
                <Text style={styles.askTitle}>Have a Question?</Text>
                <Text style={styles.askSubtitle}>
                  Ask me anything about parenting!
                </Text>
                <TouchableOpacity style={styles.askButton}>
                  <Text style={styles.askButtonText}>Chat with Steppie</Text>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke={colors.primary[600]}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>
              <Steppie mood="thinking" size="md" animated />
            </View>
          </Card>
        </Animated.View>

        {/* Popular Topics */}
        <Animated.View entering={FadeInDown.delay(700).springify()}>
          <Text style={styles.sectionTitle}>Popular Topics</Text>
          <View style={styles.topicsGrid}>
            <TopicCard emoji="🛁" title="Bath Time" count={12} />
            <TopicCard emoji="🦷" title="Teething" count={8} />
            <TopicCard emoji="🎵" title="Lullabies" count={15} />
            <TopicCard emoji="🧸" title="Play Ideas" count={24} />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TopicCard({
  emoji,
  title,
  count,
}: {
  emoji: string;
  title: string;
  count: number;
}) {
  return (
    <TouchableOpacity style={styles.topicCard}>
      <Text style={styles.topicEmoji}>{emoji}</Text>
      <Text style={styles.topicTitle}>{title}</Text>
      <Text style={styles.topicCount}>{count} articles</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  title: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['2xl'],
    color: colors.neutral[900],
  },
  searchContainer: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
  },
  scrollContent: {
    paddingBottom: spacing[8],
  },
  categoriesContainer: {
    paddingHorizontal: spacing[4],
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    gap: spacing[2],
  },
  categoryChipActive: {
    backgroundColor: colors.primary[500],
  },
  categoryEmoji: {
    fontSize: 16,
  },
  categoryName: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[700],
  },
  categoryNameActive: {
    color: colors.neutral.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    marginBottom: spacing[3],
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.neutral[900],
    paddingHorizontal: spacing[4],
    marginBottom: spacing[3],
  },
  seeAll: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.primary[600],
  },
  featuredContainer: {
    paddingHorizontal: spacing[4],
    gap: spacing[4],
  },
  featuredCard: {
    width: 260,
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
  },
  featuredImageContainer: {
    height: 140,
  },
  featuredImagePlaceholder: {
    flex: 1,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 48,
  },
  featuredContent: {
    padding: spacing[4],
  },
  featuredTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
    marginVertical: spacing[2],
  },
  readTime: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  tipsContainer: {
    paddingHorizontal: spacing[4],
    gap: spacing[3],
  },
  tipCard: {
    marginBottom: 0,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  tipEmoji: {
    fontSize: 20,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
    marginBottom: spacing[1],
  },
  tipText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
    lineHeight: 20,
  },
  askCard: {
    marginHorizontal: spacing[4],
    marginTop: spacing[6],
    marginBottom: spacing[6],
  },
  askContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  askText: {
    flex: 1,
  },
  askTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.neutral[900],
  },
  askSubtitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
    marginTop: spacing[1],
    marginBottom: spacing[3],
  },
  askButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  askButtonText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.sm,
    color: colors.primary[600],
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing[4],
    gap: spacing[3],
  },
  topicCard: {
    width: '47%',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    alignItems: 'center',
  },
  topicEmoji: {
    fontSize: 32,
    marginBottom: spacing[2],
  },
  topicTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
  },
  topicCount: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
});
