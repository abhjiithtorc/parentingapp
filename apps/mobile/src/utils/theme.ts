/**
 * LittleSteps Design System
 *
 * Duolingo-inspired friendly, character-driven design with purple brand identity
 */

export const colors = {
  // Primary Purple Palette (Brand Colors)
  primary: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',  // Main brand purple
    600: '#7C3AED',  // Primary CTA
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },

  // Secondary Colors (Friendly accents like Duolingo)
  secondary: {
    green: '#10B981',    // Success, achievements
    greenLight: '#D1FAE5',
    yellow: '#FBBF24',   // Streaks, stars
    yellowLight: '#FEF3C7',
    orange: '#F97316',   // Warnings, fire streaks
    orangeLight: '#FFEDD5',
    pink: '#EC4899',     // Hearts, love
    pinkLight: '#FCE7F3',
    blue: '#3B82F6',     // Info, links
    blueLight: '#DBEAFE',
    red: '#EF4444',      // Errors
    redLight: '#FEE2E2',
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    black: '#000000',
  },

  // Character Colors (for mascot and illustrations)
  character: {
    body: '#8B5CF6',
    bodyDark: '#7C3AED',
    cheeks: '#F9A8D4',
    eyes: '#1F2937',
    highlight: '#C4B5FD',
  },

  // Semantic Colors
  success: '#10B981',
  warning: '#FBBF24',
  error: '#EF4444',
  info: '#3B82F6',

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F3FF',
    tertiary: '#EDE9FE',
    card: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
};

export const typography = {
  fontFamily: {
    regular: 'Nunito-Regular',
    medium: 'Nunito-Medium',
    semiBold: 'Nunito-SemiBold',
    bold: 'Nunito-Bold',
    extraBold: 'Nunito-ExtraBold',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  // Duolingo-style bottom border shadow for buttons
  button: {
    shadowColor: colors.primary[800],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
};

export const animations = {
  // Duolingo-style bouncy animations
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  bounce: {
    damping: 8,
    stiffness: 200,
    mass: 0.5,
  },
  gentle: {
    damping: 20,
    stiffness: 100,
    mass: 1,
  },
};

// Common styles
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  screenPadding: {
    paddingHorizontal: spacing[4],
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    ...shadows.md,
  },
  heading1: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize['3xl'],
    color: colors.neutral[900],
  },
  heading2: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['2xl'],
    color: colors.neutral[900],
  },
  heading3: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    color: colors.neutral[900],
  },
  bodyText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base,
    color: colors.neutral[700],
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  commonStyles,
};
