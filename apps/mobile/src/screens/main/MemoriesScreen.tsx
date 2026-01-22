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
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import Svg, { Path, Rect } from 'react-native-svg';

import { Card, Badge } from '@/components/ui';
import { colors, typography, spacing, borderRadius } from '@/utils/theme';

const { width } = Dimensions.get('window');
const photoSize = (width - spacing[4] * 2 - spacing[2] * 2) / 3;

// Mock photos data
const mockPhotos = [
  { id: '1', date: '2024-01-15', milestone: 'First smile' },
  { id: '2', date: '2024-01-10', milestone: null },
  { id: '3', date: '2024-01-08', milestone: null },
  { id: '4', date: '2024-01-05', milestone: 'New Year!' },
  { id: '5', date: '2023-12-25', milestone: 'First Christmas' },
  { id: '6', date: '2023-12-20', milestone: null },
  { id: '7', date: '2023-12-15', milestone: null },
  { id: '8', date: '2023-12-10', milestone: null },
  { id: '9', date: '2023-12-05', milestone: 'Rolled over!' },
];

const mockAlbums = [
  { id: '1', name: 'First Month', count: 24, coverEmoji: '👶' },
  { id: '2', name: 'Milestones', count: 12, coverEmoji: '⭐' },
  { id: '3', name: 'Family Time', count: 18, coverEmoji: '👨‍👩‍👧' },
  { id: '4', name: 'Favorites', count: 8, coverEmoji: '❤️' },
];

type ViewMode = 'timeline' | 'albums';

export default function MemoriesScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Memories</Text>
        <TouchableOpacity style={styles.cameraButton}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z"
              stroke={colors.neutral.white}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M12 17a4 4 0 100-8 4 4 0 000 8z"
              stroke={colors.neutral.white}
              strokeWidth={2}
            />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* View Mode Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, viewMode === 'timeline' && styles.toggleButtonActive]}
          onPress={() => setViewMode('timeline')}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Rect
              x="3"
              y="3"
              width="7"
              height="7"
              stroke={viewMode === 'timeline' ? colors.primary[600] : colors.neutral[500]}
              strokeWidth={2}
            />
            <Rect
              x="14"
              y="3"
              width="7"
              height="7"
              stroke={viewMode === 'timeline' ? colors.primary[600] : colors.neutral[500]}
              strokeWidth={2}
            />
            <Rect
              x="3"
              y="14"
              width="7"
              height="7"
              stroke={viewMode === 'timeline' ? colors.primary[600] : colors.neutral[500]}
              strokeWidth={2}
            />
            <Rect
              x="14"
              y="14"
              width="7"
              height="7"
              stroke={viewMode === 'timeline' ? colors.primary[600] : colors.neutral[500]}
              strokeWidth={2}
            />
          </Svg>
          <Text style={[styles.toggleText, viewMode === 'timeline' && styles.toggleTextActive]}>
            Timeline
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, viewMode === 'albums' && styles.toggleButtonActive]}
          onPress={() => setViewMode('albums')}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2v11z"
              stroke={viewMode === 'albums' ? colors.primary[600] : colors.neutral[500]}
              strokeWidth={2}
            />
          </Svg>
          <Text style={[styles.toggleText, viewMode === 'albums' && styles.toggleTextActive]}>
            Albums
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {viewMode === 'timeline' ? <TimelineView /> : <AlbumsView />}
      </ScrollView>
    </SafeAreaView>
  );
}

function TimelineView() {
  return (
    <Animated.View entering={FadeInDown.springify()}>
      {/* Stats */}
      <View style={styles.statsRow}>
        <Card variant="filled" color={colors.secondary.pinkLight} padding={4} style={styles.statCard}>
          <Text style={styles.statValue}>47</Text>
          <Text style={styles.statLabel}>Photos</Text>
        </Card>
        <Card variant="filled" color={colors.secondary.blueLight} padding={4} style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Milestones</Text>
        </Card>
        <Card variant="filled" color={colors.secondary.yellowLight} padding={4} style={styles.statCard}>
          <Text style={styles.statValue}>6</Text>
          <Text style={styles.statLabel}>Months</Text>
        </Card>
      </View>

      {/* Photo Grid */}
      <Text style={styles.sectionTitle}>January 2024</Text>
      <View style={styles.photoGrid}>
        {mockPhotos.map((photo, index) => (
          <Animated.View
            key={photo.id}
            entering={FadeIn.delay(index * 50)}
          >
            <TouchableOpacity style={styles.photoContainer}>
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoEmoji}>📷</Text>
              </View>
              {photo.milestone && (
                <View style={styles.milestoneBadge}>
                  <Text style={styles.milestoneBadgeText}>⭐</Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Load More */}
      <TouchableOpacity style={styles.loadMoreButton}>
        <Text style={styles.loadMoreText}>Load More</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function AlbumsView() {
  return (
    <Animated.View entering={FadeInDown.springify()}>
      {/* Create Album Button */}
      <TouchableOpacity style={styles.createAlbumButton}>
        <View style={styles.createAlbumIcon}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 5v14M5 12h14"
              stroke={colors.primary[600]}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
        </View>
        <Text style={styles.createAlbumText}>Create New Album</Text>
      </TouchableOpacity>

      {/* Albums Grid */}
      <View style={styles.albumsGrid}>
        {mockAlbums.map((album, index) => (
          <Animated.View
            key={album.id}
            entering={FadeInDown.delay(index * 100).springify()}
          >
            <TouchableOpacity style={styles.albumCard}>
              <View style={styles.albumCover}>
                <Text style={styles.albumEmoji}>{album.coverEmoji}</Text>
              </View>
              <Text style={styles.albumName}>{album.name}</Text>
              <Text style={styles.albumCount}>{album.count} photos</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Auto Albums */}
      <Text style={styles.sectionTitle}>Auto Albums</Text>
      <Card variant="default" padding={4} style={styles.autoAlbumCard}>
        <View style={styles.autoAlbumHeader}>
          <Text style={styles.autoAlbumEmoji}>📅</Text>
          <View style={styles.autoAlbumInfo}>
            <Text style={styles.autoAlbumName}>This Week</Text>
            <Text style={styles.autoAlbumCount}>5 new photos</Text>
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
      </Card>

      <Card variant="default" padding={4} style={styles.autoAlbumCard}>
        <View style={styles.autoAlbumHeader}>
          <Text style={styles.autoAlbumEmoji}>🎉</Text>
          <View style={styles.autoAlbumInfo}>
            <Text style={styles.autoAlbumName}>Milestones</Text>
            <Text style={styles.autoAlbumCount}>Auto-collected moments</Text>
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
      </Card>
    </Animated.View>
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
  cameraButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
    gap: spacing[2],
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingVertical: spacing[3],
    borderRadius: borderRadius.xl,
    backgroundColor: colors.neutral[100],
  },
  toggleButtonActive: {
    backgroundColor: colors.primary[100],
  },
  toggleText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  toggleTextActive: {
    color: colors.primary[600],
  },
  scrollContent: {
    padding: spacing[4],
    paddingBottom: spacing[8],
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['2xl'],
    color: colors.neutral[900],
  },
  statLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.neutral[900],
    marginBottom: spacing[3],
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[1],
  },
  photoContainer: {
    width: photoSize,
    height: photoSize,
    position: 'relative',
  },
  photoPlaceholder: {
    flex: 1,
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoEmoji: {
    fontSize: 24,
    opacity: 0.5,
  },
  milestoneBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.secondary.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneBadgeText: {
    fontSize: 12,
  },
  loadMoreButton: {
    alignItems: 'center',
    paddingVertical: spacing[4],
    marginTop: spacing[4],
  },
  loadMoreText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.base,
    color: colors.primary[600],
  },
  createAlbumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    marginBottom: spacing[4],
    borderWidth: 2,
    borderColor: colors.primary[200],
    borderStyle: 'dashed',
  },
  createAlbumIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  createAlbumText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.base,
    color: colors.primary[600],
  },
  albumsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  albumCard: {
    width: (width - spacing[4] * 2 - spacing[3]) / 2,
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    alignItems: 'center',
  },
  albumCover: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  albumEmoji: {
    fontSize: 36,
  },
  albumName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
  },
  albumCount: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  autoAlbumCard: {
    marginBottom: spacing[3],
  },
  autoAlbumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  autoAlbumEmoji: {
    fontSize: 32,
    marginRight: spacing[3],
  },
  autoAlbumInfo: {
    flex: 1,
  },
  autoAlbumName: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
  },
  autoAlbumCount: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
});
