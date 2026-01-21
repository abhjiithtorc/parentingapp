import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryArea,
} from 'victory-native';
import Svg, { Path, Circle } from 'react-native-svg';

import { Card, Badge, Button, ProgressBar } from '@/components/ui';
import { colors, typography, spacing, borderRadius } from '@/utils/theme';
import { RootState } from '@/store';

const { width } = Dimensions.get('window');

type TabType = 'milestones' | 'growth' | 'daily';

// Mock data for charts
const mockGrowthData = [
  { month: 0, weight: 3.5, height: 50 },
  { month: 1, weight: 4.2, height: 54 },
  { month: 2, weight: 5.0, height: 57 },
  { month: 3, weight: 5.7, height: 60 },
  { month: 4, weight: 6.2, height: 62 },
  { month: 5, weight: 6.7, height: 64 },
  { month: 6, weight: 7.2, height: 66 },
];

const milestoneCategories = [
  { id: 'PHYSICAL', name: 'Physical', emoji: '🏃', progress: 75, color: colors.secondary.green },
  { id: 'COGNITIVE', name: 'Cognitive', emoji: '🧠', progress: 60, color: colors.secondary.blue },
  { id: 'LANGUAGE', name: 'Language', emoji: '🗣️', progress: 45, color: colors.secondary.pink },
  { id: 'SOCIAL', name: 'Social', emoji: '👋', progress: 80, color: colors.secondary.yellow },
  { id: 'EMOTIONAL', name: 'Emotional', emoji: '❤️', progress: 55, color: colors.secondary.orange },
];

export default function TrackScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('milestones');
  const { selectedChild } = useSelector((state: RootState) => state.children);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Track</Text>
        <TouchableOpacity style={styles.addButton}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 5v14M5 12h14"
              stroke={colors.neutral.white}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TabButton
          label="Milestones"
          isActive={activeTab === 'milestones'}
          onPress={() => setActiveTab('milestones')}
        />
        <TabButton
          label="Growth"
          isActive={activeTab === 'growth'}
          onPress={() => setActiveTab('growth')}
        />
        <TabButton
          label="Daily"
          isActive={activeTab === 'daily'}
          onPress={() => setActiveTab('daily')}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'milestones' && <MilestonesTab />}
        {activeTab === 'growth' && <GrowthTab />}
        {activeTab === 'daily' && <DailyTab />}
      </ScrollView>
    </SafeAreaView>
  );
}

function TabButton({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.tab, isActive && styles.tabActive]}
      onPress={onPress}
    >
      <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function MilestonesTab() {
  return (
    <Animated.View entering={FadeInDown.springify()}>
      {/* Overall Progress */}
      <Card variant="elevated" padding={5} style={styles.overallCard}>
        <Text style={styles.cardTitle}>Overall Progress</Text>
        <View style={styles.overallProgress}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressValue}>68%</Text>
            <Text style={styles.progressLabel}>Complete</Text>
          </View>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statText}>Achieved</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.statNumber}>11</Text>
              <Text style={styles.statText}>Remaining</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Categories */}
      <Text style={styles.sectionTitle}>By Category</Text>
      {milestoneCategories.map((category, index) => (
        <Animated.View
          key={category.id}
          entering={FadeInDown.delay(index * 100).springify()}
        >
          <Card variant="default" padding={4} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryInfo}>
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category.color + '20' },
                  ]}
                >
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                </View>
                <View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryProgress}>
                    {category.progress}% complete
                  </Text>
                </View>
              </View>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 18l6-6-6-6"
                  stroke={colors.neutral[400]}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </Svg>
            </View>
            <ProgressBar
              progress={category.progress}
              variant="default"
              size="sm"
            />
          </Card>
        </Animated.View>
      ))}
    </Animated.View>
  );
}

function GrowthTab() {
  const [chartType, setChartType] = useState<'weight' | 'height'>('weight');

  return (
    <Animated.View entering={FadeInDown.springify()}>
      {/* Latest Measurements */}
      <View style={styles.measurementsRow}>
        <Card variant="filled" color={colors.secondary.blueLight} padding={4} style={styles.measurementCard}>
          <Text style={styles.measurementLabel}>Weight</Text>
          <Text style={styles.measurementValue}>7.2 kg</Text>
          <Badge label="+0.5 kg" variant="success" size="sm" />
        </Card>
        <Card variant="filled" color={colors.secondary.pinkLight} padding={4} style={styles.measurementCard}>
          <Text style={styles.measurementLabel}>Height</Text>
          <Text style={styles.measurementValue}>66 cm</Text>
          <Badge label="+2 cm" variant="success" size="sm" />
        </Card>
      </View>

      {/* Growth Chart */}
      <Card variant="elevated" padding={4} style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.cardTitle}>Growth Chart</Text>
          <View style={styles.chartTabs}>
            <TouchableOpacity
              style={[styles.chartTab, chartType === 'weight' && styles.chartTabActive]}
              onPress={() => setChartType('weight')}
            >
              <Text style={[styles.chartTabText, chartType === 'weight' && styles.chartTabTextActive]}>
                Weight
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chartTab, chartType === 'height' && styles.chartTabActive]}
              onPress={() => setChartType('height')}
            >
              <Text style={[styles.chartTabText, chartType === 'height' && styles.chartTabTextActive]}>
                Height
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <VictoryChart
          width={width - spacing[8] - spacing[8]}
          height={200}
          theme={VictoryTheme.material}
          padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
        >
          <VictoryAxis
            tickFormat={(t) => `${t}m`}
            style={{
              axis: { stroke: colors.neutral[300] },
              tickLabels: {
                fill: colors.neutral[500],
                fontSize: 10,
                fontFamily: typography.fontFamily.medium,
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => (chartType === 'weight' ? `${t}kg` : `${t}cm`)}
            style={{
              axis: { stroke: colors.neutral[300] },
              tickLabels: {
                fill: colors.neutral[500],
                fontSize: 10,
                fontFamily: typography.fontFamily.medium,
              },
            }}
          />
          <VictoryArea
            data={mockGrowthData}
            x="month"
            y={chartType}
            style={{
              data: {
                fill: colors.primary[100],
                stroke: colors.primary[500],
                strokeWidth: 2,
              },
            }}
            interpolation="natural"
          />
        </VictoryChart>
      </Card>

      {/* Add Measurement Button */}
      <Button
        title="Log New Measurement"
        variant="primary"
        size="lg"
        fullWidth
        onPress={() => {}}
        style={styles.addMeasurementButton}
      />
    </Animated.View>
  );
}

function DailyTab() {
  const todayStats = {
    sleep: { total: '10h 30m', naps: 2 },
    feeding: { total: 6, lastTime: '2h ago' },
    diaper: { wet: 5, dirty: 2 },
  };

  return (
    <Animated.View entering={FadeInDown.springify()}>
      {/* Today's Summary */}
      <Text style={styles.sectionTitle}>Today's Summary</Text>

      <Card variant="elevated" padding={4} style={styles.dailyCard}>
        <View style={styles.dailyHeader}>
          <Text style={styles.dailyEmoji}>😴</Text>
          <View style={styles.dailyInfo}>
            <Text style={styles.dailyTitle}>Sleep</Text>
            <Text style={styles.dailyValue}>{todayStats.sleep.total}</Text>
          </View>
          <Badge label={`${todayStats.sleep.naps} naps`} variant="info" />
        </View>
      </Card>

      <Card variant="elevated" padding={4} style={styles.dailyCard}>
        <View style={styles.dailyHeader}>
          <Text style={styles.dailyEmoji}>🍼</Text>
          <View style={styles.dailyInfo}>
            <Text style={styles.dailyTitle}>Feeding</Text>
            <Text style={styles.dailyValue}>{todayStats.feeding.total} times</Text>
          </View>
          <Badge label={todayStats.feeding.lastTime} variant="default" />
        </View>
      </Card>

      <Card variant="elevated" padding={4} style={styles.dailyCard}>
        <View style={styles.dailyHeader}>
          <Text style={styles.dailyEmoji}>👶</Text>
          <View style={styles.dailyInfo}>
            <Text style={styles.dailyTitle}>Diaper</Text>
            <Text style={styles.dailyValue}>
              {todayStats.diaper.wet + todayStats.diaper.dirty} changes
            </Text>
          </View>
          <View style={styles.diaperBadges}>
            <Badge label={`${todayStats.diaper.wet} wet`} variant="info" size="sm" />
            <Badge label={`${todayStats.diaper.dirty} dirty`} variant="warning" size="sm" />
          </View>
        </View>
      </Card>

      {/* Quick Log Buttons */}
      <Text style={[styles.sectionTitle, { marginTop: spacing[6] }]}>Quick Log</Text>
      <View style={styles.quickLogGrid}>
        <QuickLogButton emoji="😴" label="Sleep" color={colors.secondary.blue} />
        <QuickLogButton emoji="🍼" label="Bottle" color={colors.secondary.pink} />
        <QuickLogButton emoji="🤱" label="Nursing" color={colors.secondary.pink} />
        <QuickLogButton emoji="🥣" label="Solids" color={colors.secondary.orange} />
        <QuickLogButton emoji="💧" label="Wet" color={colors.secondary.blue} />
        <QuickLogButton emoji="💩" label="Dirty" color={colors.secondary.yellow} />
      </View>
    </Animated.View>
  );
}

function QuickLogButton({
  emoji,
  label,
  color,
}: {
  emoji: string;
  label: string;
  color: string;
}) {
  return (
    <TouchableOpacity style={styles.quickLogButton}>
      <View style={[styles.quickLogIcon, { backgroundColor: color + '20' }]}>
        <Text style={styles.quickLogEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.quickLogLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  title: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['2xl'],
    color: colors.neutral[900],
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
    gap: spacing[2],
  },
  tab: {
    flex: 1,
    paddingVertical: spacing[3],
    borderRadius: borderRadius.xl,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary[500],
  },
  tabLabel: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
  },
  tabLabelActive: {
    color: colors.neutral.white,
  },
  scrollContent: {
    padding: spacing[4],
    paddingBottom: spacing[8],
  },
  overallCard: {
    marginBottom: spacing[4],
  },
  cardTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.neutral[900],
    marginBottom: spacing[4],
  },
  overallProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[6],
  },
  progressValue: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['2xl'],
    color: colors.primary[600],
  },
  progressLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.primary[500],
  },
  progressStats: {
    flex: 1,
    gap: spacing[3],
  },
  progressStat: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing[2],
  },
  statNumber: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.neutral[900],
  },
  statText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.neutral[900],
    marginBottom: spacing[3],
    marginTop: spacing[2],
  },
  categoryCard: {
    marginBottom: spacing[3],
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  categoryEmoji: {
    fontSize: 20,
  },
  categoryName: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
  },
  categoryProgress: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  measurementsRow: {
    flexDirection: 'row',
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  measurementCard: {
    flex: 1,
    alignItems: 'center',
  },
  measurementLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
    marginBottom: spacing[1],
  },
  measurementValue: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['2xl'],
    color: colors.neutral[900],
    marginBottom: spacing[2],
  },
  chartCard: {
    marginBottom: spacing[4],
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  chartTabs: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.lg,
    padding: 2,
  },
  chartTab: {
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
    borderRadius: borderRadius.md,
  },
  chartTabActive: {
    backgroundColor: colors.neutral.white,
  },
  chartTabText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  chartTabTextActive: {
    color: colors.primary[600],
  },
  addMeasurementButton: {
    marginTop: spacing[2],
  },
  dailyCard: {
    marginBottom: spacing[3],
  },
  dailyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dailyEmoji: {
    fontSize: 32,
    marginRight: spacing[3],
  },
  dailyInfo: {
    flex: 1,
  },
  dailyTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
  },
  dailyValue: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  diaperBadges: {
    flexDirection: 'row',
    gap: spacing[1],
  },
  quickLogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  quickLogButton: {
    width: '30%',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing[3],
    alignItems: 'center',
  },
  quickLogIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  quickLogEmoji: {
    fontSize: 24,
  },
  quickLogLabel: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[700],
  },
});
