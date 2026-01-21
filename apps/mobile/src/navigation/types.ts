import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  AddChild: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Track: undefined;
  Discover: undefined;
  Memories: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  MilestoneDetail: { milestoneId: string };
  TipDetail: { tipId: string };
};

export type TrackStackParamList = {
  TrackScreen: undefined;
  GrowthChart: undefined;
  AddGrowth: undefined;
  SleepLog: undefined;
  FeedLog: undefined;
  DiaperLog: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
