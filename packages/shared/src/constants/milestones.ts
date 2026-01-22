import { MilestoneCategory } from '../types';

export const MILESTONE_CATEGORIES: Record<MilestoneCategory, { name: string; emoji: string; color: string }> = {
  PHYSICAL: {
    name: 'Physical',
    emoji: '🏃',
    color: '#10B981',
  },
  COGNITIVE: {
    name: 'Cognitive',
    emoji: '🧠',
    color: '#3B82F6',
  },
  SOCIAL: {
    name: 'Social',
    emoji: '👋',
    color: '#FBBF24',
  },
  LANGUAGE: {
    name: 'Language',
    emoji: '🗣️',
    color: '#EC4899',
  },
  EMOTIONAL: {
    name: 'Emotional',
    emoji: '❤️',
    color: '#EF4444',
  },
  SELF_CARE: {
    name: 'Self Care',
    emoji: '🧹',
    color: '#8B5CF6',
  },
};

// Default milestone templates for seeding
export const DEFAULT_MILESTONE_TEMPLATES = [
  // 0-3 months
  { category: 'PHYSICAL', title: 'Lifts head during tummy time', ageMonthsMin: 0, ageMonthsMax: 3 },
  { category: 'PHYSICAL', title: 'Opens and closes hands', ageMonthsMin: 1, ageMonthsMax: 3 },
  { category: 'SOCIAL', title: 'First social smile', ageMonthsMin: 1, ageMonthsMax: 3 },
  { category: 'COGNITIVE', title: 'Follows objects with eyes', ageMonthsMin: 1, ageMonthsMax: 3 },
  { category: 'LANGUAGE', title: 'Coos and gurgles', ageMonthsMin: 2, ageMonthsMax: 4 },

  // 3-6 months
  { category: 'PHYSICAL', title: 'Rolls from tummy to back', ageMonthsMin: 3, ageMonthsMax: 6 },
  { category: 'PHYSICAL', title: 'Holds head steady', ageMonthsMin: 3, ageMonthsMax: 5 },
  { category: 'PHYSICAL', title: 'Brings hands to mouth', ageMonthsMin: 3, ageMonthsMax: 5 },
  { category: 'SOCIAL', title: 'Laughs out loud', ageMonthsMin: 3, ageMonthsMax: 5 },
  { category: 'COGNITIVE', title: 'Reaches for toys', ageMonthsMin: 3, ageMonthsMax: 5 },

  // 6-9 months
  { category: 'PHYSICAL', title: 'Sits without support', ageMonthsMin: 5, ageMonthsMax: 8 },
  { category: 'PHYSICAL', title: 'Rolls both ways', ageMonthsMin: 5, ageMonthsMax: 7 },
  { category: 'LANGUAGE', title: 'Babbles consonants', ageMonthsMin: 5, ageMonthsMax: 8 },
  { category: 'SOCIAL', title: 'Responds to own name', ageMonthsMin: 5, ageMonthsMax: 8 },
  { category: 'COGNITIVE', title: 'Transfers objects between hands', ageMonthsMin: 6, ageMonthsMax: 9 },

  // 9-12 months
  { category: 'PHYSICAL', title: 'Crawls on hands and knees', ageMonthsMin: 7, ageMonthsMax: 10 },
  { category: 'PHYSICAL', title: 'Pulls to standing', ageMonthsMin: 8, ageMonthsMax: 11 },
  { category: 'PHYSICAL', title: 'First steps', ageMonthsMin: 9, ageMonthsMax: 14 },
  { category: 'LANGUAGE', title: 'Says "mama" or "dada"', ageMonthsMin: 8, ageMonthsMax: 12 },
  { category: 'COGNITIVE', title: 'Uses pincer grasp', ageMonthsMin: 8, ageMonthsMax: 11 },
  { category: 'SOCIAL', title: 'Waves bye-bye', ageMonthsMin: 9, ageMonthsMax: 12 },
  { category: 'EMOTIONAL', title: 'Shows stranger anxiety', ageMonthsMin: 7, ageMonthsMax: 12 },

  // 12-18 months
  { category: 'PHYSICAL', title: 'Walks independently', ageMonthsMin: 11, ageMonthsMax: 15 },
  { category: 'LANGUAGE', title: 'Says several words', ageMonthsMin: 12, ageMonthsMax: 18 },
  { category: 'COGNITIVE', title: 'Points to show interest', ageMonthsMin: 12, ageMonthsMax: 16 },
  { category: 'SELF_CARE', title: 'Drinks from cup', ageMonthsMin: 12, ageMonthsMax: 18 },
  { category: 'SOCIAL', title: 'Plays simple pretend games', ageMonthsMin: 14, ageMonthsMax: 18 },

  // 18-24 months
  { category: 'PHYSICAL', title: 'Runs', ageMonthsMin: 16, ageMonthsMax: 22 },
  { category: 'PHYSICAL', title: 'Kicks a ball', ageMonthsMin: 18, ageMonthsMax: 24 },
  { category: 'LANGUAGE', title: 'Uses two-word phrases', ageMonthsMin: 18, ageMonthsMax: 24 },
  { category: 'COGNITIVE', title: 'Follows simple instructions', ageMonthsMin: 18, ageMonthsMax: 24 },
  { category: 'SELF_CARE', title: 'Uses spoon', ageMonthsMin: 15, ageMonthsMax: 21 },
  { category: 'EMOTIONAL', title: 'Shows defiant behavior', ageMonthsMin: 18, ageMonthsMax: 24 },
];
