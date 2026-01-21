import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';

import { Card, Badge, Button } from '@/components/ui';
import { Steppie } from '@/components/characters';
import { colors, typography, spacing, borderRadius } from '@/utils/theme';
import { RootState, AppDispatch } from '@/store';
import { logout } from '@/store/slices/authSlice';

const menuItems = [
  {
    id: 'children',
    title: 'Manage Children',
    subtitle: 'Add or edit child profiles',
    icon: '👶',
    badge: null,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Reminders and alerts',
    icon: '🔔',
    badge: '3',
  },
  {
    id: 'export',
    title: 'Export Data',
    subtitle: 'Download growth reports',
    icon: '📊',
    badge: null,
  },
  {
    id: 'premium',
    title: 'LittleSteps Premium',
    subtitle: 'Unlock all features',
    icon: '⭐',
    badge: 'NEW',
  },
  {
    id: 'support',
    title: 'Help & Support',
    subtitle: 'FAQs and contact us',
    icon: '💬',
    badge: null,
  },
  {
    id: 'about',
    title: 'About',
    subtitle: 'Version 1.0.0',
    icon: 'ℹ️',
    badge: null,
  },
];

export default function ProfileScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { children, selectedChild } = useSelector((state: RootState) => state.children);

  const handleLogout = () => {
    dispatch(logout());
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
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Circle cx="12" cy="12" r="3" stroke={colors.neutral[700]} strokeWidth={2} />
              <Path
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                stroke={colors.neutral[700]}
                strokeWidth={2}
              />
            </Svg>
          </TouchableOpacity>
        </Animated.View>

        {/* User Profile Card */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Card variant="elevated" padding={5} style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editAvatarButton}>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                      stroke={colors.neutral.white}
                      strokeWidth={2}
                    />
                    <Path
                      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                      stroke={colors.neutral.white}
                      strokeWidth={2}
                    />
                  </Svg>
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{user?.name || 'Parent'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
                <View style={styles.childrenBadge}>
                  <Text style={styles.childrenText}>
                    {children.length} {children.length === 1 ? 'child' : 'children'}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </Animated.View>

        {/* Streak Card */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <Card variant="filled" color={colors.secondary.orangeLight} padding={4} style={styles.streakCard}>
            <View style={styles.streakContent}>
              <View>
                <Text style={styles.streakLabel}>Daily Streak</Text>
                <View style={styles.streakValue}>
                  <Text style={styles.streakNumber}>7</Text>
                  <Text style={styles.streakDays}>days</Text>
                </View>
              </View>
              <Text style={styles.streakEmoji}>🔥</Text>
            </View>
            <Text style={styles.streakMessage}>
              Great job! Keep logging daily to maintain your streak!
            </Text>
          </Card>
        </Animated.View>

        {/* Menu Items */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Text style={styles.menuEmoji}>{item.icon}</Text>
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              {item.badge && (
                <Badge
                  label={item.badge}
                  variant={item.badge === 'NEW' ? 'new' : 'default'}
                  size="sm"
                />
              )}
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 18l6-6-6-6"
                  stroke={colors.neutral[400]}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Logout Button */}
        <Animated.View entering={FadeInDown.delay(500).springify()}>
          <Button
            title="Sign Out"
            variant="outline"
            size="lg"
            fullWidth
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </Animated.View>

        {/* Footer with mascot */}
        <Animated.View
          entering={FadeInDown.delay(600).springify()}
          style={styles.footer}
        >
          <Steppie mood="waving" size="sm" animated />
          <Text style={styles.footerText}>Made with ❤️ by LittleSteps</Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
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
  title: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['2xl'],
    color: colors.neutral[900],
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    marginBottom: spacing[4],
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing[4],
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['2xl'],
    color: colors.neutral.white,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.neutral.white,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.neutral[900],
  },
  userEmail: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    marginBottom: spacing[2],
  },
  childrenBadge: {
    backgroundColor: colors.primary[100],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  childrenText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.primary[700],
  },
  streakCard: {
    marginBottom: spacing[6],
  },
  streakContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  streakLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[700],
  },
  streakValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing[1],
  },
  streakNumber: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['3xl'],
    color: colors.secondary.orange,
  },
  streakDays: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.base,
    color: colors.neutral[700],
  },
  streakEmoji: {
    fontSize: 40,
  },
  streakMessage: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    marginBottom: spacing[2],
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  menuEmoji: {
    fontSize: 20,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.base,
    color: colors.neutral[900],
  },
  menuSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
  },
  logoutButton: {
    marginTop: spacing[4],
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing[8],
    paddingTop: spacing[4],
  },
  footerText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[400],
    marginTop: spacing[2],
  },
});
