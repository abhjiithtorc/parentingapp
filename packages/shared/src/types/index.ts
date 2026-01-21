// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  measurementUnit: 'metric' | 'imperial';
}

// Child Types
export interface Child {
  id: string;
  userId: string;
  name: string;
  dateOfBirth: string;
  gender?: Gender;
  avatarUrl?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

// Milestone Types
export interface Milestone {
  id: string;
  childId: string;
  templateId?: string;
  category: MilestoneCategory;
  title: string;
  description?: string;
  ageMonthsMin?: number;
  ageMonthsMax?: number;
  achievedAt?: string;
  notes?: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type MilestoneCategory =
  | 'PHYSICAL'
  | 'COGNITIVE'
  | 'SOCIAL'
  | 'LANGUAGE'
  | 'EMOTIONAL'
  | 'SELF_CARE';

export interface MilestoneTemplate {
  id: string;
  category: MilestoneCategory;
  title: string;
  description: string;
  ageMonthsMin: number;
  ageMonthsMax: number;
  iconName?: string;
  order: number;
}

export interface MilestoneProgress {
  achieved: number;
  total: number;
  percentage: number;
  ageMonths: number;
}

// Tracking Types
export interface GrowthRecord {
  id: string;
  childId: string;
  heightCm?: number;
  weightKg?: number;
  headCircumferenceCm?: number;
  recordedAt: string;
  notes?: string;
  createdAt: string;
}

export interface DailyLog {
  id: string;
  childId: string;
  type: LogType;
  data: Record<string, any>;
  startedAt?: string;
  endedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type LogType =
  | 'SLEEP'
  | 'FEED_BREAST'
  | 'FEED_BOTTLE'
  | 'FEED_SOLID'
  | 'DIAPER_WET'
  | 'DIAPER_DIRTY'
  | 'DIAPER_MIXED'
  | 'MEDICATION'
  | 'SYMPTOM'
  | 'ACTIVITY';

export interface DailySummary {
  date: string;
  sleep: {
    count: number;
    totalMinutes: number;
    totalHours: number;
  };
  feeding: {
    count: number;
    breast: number;
    bottle: number;
    solid: number;
  };
  diaper: {
    count: number;
    wet: number;
    dirty: number;
    mixed: number;
  };
}

// Content Types
export interface Tip {
  id: string;
  title: string;
  content: string;
  ageMonthsMin: number;
  ageMonthsMax: number;
  category: string;
  iconName?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  readTimeMin: number;
  ageMonthsMin?: number;
  ageMonthsMax?: number;
  publishedAt?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}
