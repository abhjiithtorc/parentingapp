import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Path, Circle } from 'react-native-svg';
import { MainTabParamList } from './types';
import { colors, typography } from '@/utils/theme';

// Screens
import HomeScreen from '@/screens/main/HomeScreen';
import TrackScreen from '@/screens/main/TrackScreen';
import DiscoverScreen from '@/screens/main/DiscoverScreen';
import MemoriesScreen from '@/screens/main/MemoriesScreen';
import ProfileScreen from '@/screens/main/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Custom icons as SVG components
const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 22V12h6v10"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TrackIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 12h-4l-3 9L9 3l-3 9H2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DiscoverIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MemoriesIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={2} />
  </Svg>
);

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.neutral[400],
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Track"
        component={TrackScreen}
        options={{
          tabBarIcon: ({ color }) => <TrackIcon color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color }) => <DiscoverIcon color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Memories"
        component={MemoriesScreen}
        options={{
          tabBarIcon: ({ color }) => <MemoriesIcon color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.neutral.white,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    height: 85,
    paddingBottom: 25,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 11,
    marginTop: 4,
  },
});
