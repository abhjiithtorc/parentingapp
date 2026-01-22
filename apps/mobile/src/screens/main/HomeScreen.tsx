import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';

import { Card, ProgressBar, Badge, Button } from '@/components/ui';
import { Steppie, SpeechBubble } from '@/components/characters';
import { colors, typography, spacing, borderRadius } from '@/utils/theme';
import { RootState, AppDispatch } from '@/store';
import { fetchChildren } from '@/store/slices/childrenSlice';
import { fetchMilestones } from '@/store/slices/milestonesSlice';
import { differenceInMonths, format } from 'date-fns';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedChild, children } = useSelector((state: RootState) => state.children);
  const { progress, upcoming } = useSelector((state: RootState) => state.milestones);

  useEffect(() => {
    dispatch(fetchChildren());
  }, [dispatch]);

  useEffect(() => {
    if (selectedChild) {
      dispatch(fetchMilestones(selectedChild.id));
    }
  }, [selectedChild, dispatch]);

  const childAge = selectedChild
    ? differenceInMonths(new Date(), new Date(selectedChild.dateOfBirth))
    : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getTipMessage = () => {
    const tips = [
      "Every milestone is worth celebrating! You're doing amazing!",
      "Remember to take time for yourself too. Happy parent, happy child!",
      "Reading together builds strong bonds. Try 10 minutes today!",
      "Tummy time helps build strong muscles. Keep it up!",
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={styles.header}
        >
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{user?.name?.split(' ')[0] || 'Parent'}!</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
                stroke={colors.neutral[700]}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </Animated.View>

        {/* Child Selector */}
        {selectedChild && (
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <Card variant="filled" color={selectedChild.color + '20'} padding={4}>
              <View style={styles.childCard}>
                <View
                  style={[
                    styles.childAvatar,
                    { backgroundColor: selectedChild.color },
                  ]}
                >
                  <Text style={styles.childInitial}>
                    {selectedChild.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.childInfo}>
                  <Text style={styles.childName}>{selectedChild.name}</Text>
                  <Text style={styles.childAge}>
                    {childAge < 12
                      ? `${childAge} month${childAge !== 1 ? 's' : ''} old`
                      : `${Math.floor(childAge / 12)} year${Math.floor(childAge / 12) !== 1 ? 's' : ''} old`}
                  </Text>
                </View>
                {children.length > 1 && (
                  <TouchableOpacity style={styles.switchChildButton}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M6 9l6 6 6-6"
                        stroke={colors.neutral[500]}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                )}
              </View>
            </Card>
          </Animated.View>
        )}

        {/* Tip of the Day */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          style={styles.tipSection}
        >
          <View style={styles.tipContainer}>
            <View style={styles.tipContent}>
              <SpeechBubble
                message={getTipMessage()}
                position="left"
                variant="tip"
                animated
                delay={500}
              />
            </View>
            <Steppie mood="happy" size="sm" animated />
          </View>
        </Animated.View>

        {/* Milestone Progress */}
        {progress && (
          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <Card variant="elevated" padding={5}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Milestone Progress</Text>
                <Badge label={`${progress.achieved}/${progress.total}`} variant="success" />
              </View>

              <ProgressBar
                progress={progress.percentage}
                variant="milestone"
                size="lg"
                showLabel
                label={`${progress.percentage}% completed`}
              />

              <View style={styles.milestoneStats}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{progress.achieved}</Text>
                  <Text style={styles.statLabel}>Achieved</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{progress.total - progress.achieved}</Text>
                  <Text style={styles.statLabel}>Remaining</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{progress.ageMonths}</Text>
                  <Text style={styles.statLabel}>Months</Text>
                </View>
              </View>
            </Card>
          </Animated.View>
        )}

        {/* Upcoming Milestones */}
        {upcoming && upcoming.length > 0 && (
          <Animated.View entering={FadeInDown.delay(500).springify()}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Coming Up</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.upcomingList}
            >
              {upcoming.slice(0, 5).map((milestone: any, index: number) => (
                <Animated.View
                  key={milestone.id}
                  entering={FadeInRight.delay(600 + index * 100).springify()}
                >
                  <Card
                    variant="outlined"
                    padding={4}
                    style={styles.milestoneCard}
                    onPress={() => {}}
                  >
                    <View style={styles.milestoneIcon}>
                      <Text style={styles.milestoneEmoji}>
                        {getMilestoneEmoji(milestone.category)}
                      </Text>
                    </View>
                    <Text style={styles.milestoneTitle} numberOfLines={2}>
                      {milestone.title}
                    </Text>
                    <Badge
                      label={`${milestone.ageMonthsMin}-${milestone.ageMonthsMax}mo`}
                      size="sm"
                    />
                  </Card>
                </Animated.View>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        {/* Quick Actions */}
        <Animated.View
          entering={FadeInDown.delay(700).springify()}
          style={styles.quickActions}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <QuickActionButton
              icon="📏"
              label="Log Growth"
              color={colors.secondary.green}
            />
            <QuickActionButton
              icon="😴"
              label="Sleep"
              color={colors.secondary.blue}
            />
            <QuickActionButton
              icon="🍼"
              label="Feeding"
              color={colors.secondary.pink}
            />
            <QuickActionButton
              icon="📸"
              label="Memory"
              color={colors.secondary.yellow}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickActionButton({
  icon,
  label,
  color,
}: {
  icon: string;
  label: string;
  color: string;
}) {
  return (
    <TouchableOpacity style={styles.actionButton}>
      <View style={[styles.actionIcon, { backgroundColor: color + '20' }]}>
        <Text style={styles.actionEmoji}>{icon}</Text>
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function getMilestoneEmoji(category: string): string {
  const emojis: Record<string, string> = {
    PHYSICAL: '🏃',
    COGNITIVE: '🧠',
    SOCIAL: '👋',
    LANGUAGE: '🗣️',
    EMOTIONAL: '❤️',
    SELF_CARE: '🧹',
  };
  return emojis[category] || '⭐';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  scrollContent: {
    padding: spacing[4],
    paddingBottom: spacing[8],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  greeting: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.base,
    color: colors.neutral[600],
  },
  userName: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['2xl'],
    color: colors.neutral[900],
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary.pink,
    borderWidth: 2,
    borderColor: colors.neutral.white,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childInitial: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.neutral.white,
  },
  childInfo: {
    flex: 1,
    marginLeft: spacing[3],
  },
  childName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.neutral[900],
  },
  childAge: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
  },
  switchChildButton: {
    padding: spacing[2],
  },
  tipSection: {
    marginTop: spacing[4],
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  tipContent: {
    flex: 1,
    marginRight: spacing[3],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing[6],
    marginBottom: spacing[3],
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.neutral[900],
  },
  seeAll: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.primary[600],
  },
  milestoneStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing[4],
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.primary[600],
  },
  statLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.neutral[500],
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.neutral[200],
  },
  upcomingList: {
    paddingRight: spacing[4],
    gap: spacing[3],
  },
  milestoneCard: {
    width: 140,
    alignItems: 'center',
  },
  milestoneIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  milestoneEmoji: {
    fontSize: 24,
  },
  milestoneTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[800],
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  quickActions: {
    marginTop: spacing[6],
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    marginTop: spacing[3],
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  actionEmoji: {
    fontSize: 28,
  },
  actionLabel: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[700],
  },
});
