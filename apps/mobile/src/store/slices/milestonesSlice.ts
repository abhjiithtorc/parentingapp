import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { milestonesApi } from '@/services/api';

interface Milestone {
  id: string;
  childId: string;
  category: string;
  title: string;
  description?: string;
  achievedAt?: string;
  notes?: string;
  photoUrl?: string;
}

interface MilestoneProgress {
  achieved: number;
  total: number;
  percentage: number;
  ageMonths: number;
}

interface MilestonesState {
  milestones: Milestone[];
  upcoming: Milestone[];
  progress: MilestoneProgress | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MilestonesState = {
  milestones: [],
  upcoming: [],
  progress: null,
  isLoading: false,
  error: null,
};

export const fetchMilestones = createAsyncThunk(
  'milestones/fetchAll',
  async (childId: string, { rejectWithValue }) => {
    try {
      const [milestones, upcoming, progress] = await Promise.all([
        milestonesApi.getByChild(childId),
        milestonesApi.getUpcoming(childId),
        milestonesApi.getProgress(childId),
      ]);
      return { milestones, upcoming, progress };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const achieveMilestone = createAsyncThunk(
  'milestones/achieve',
  async (
    { id, data }: { id: string; data: { achievedAt?: string; notes?: string; photoUrl?: string } },
    { rejectWithValue }
  ) => {
    try {
      return await milestonesApi.markAchieved(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const milestonesSlice = createSlice({
  name: 'milestones',
  initialState,
  reducers: {
    clearMilestonesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMilestones.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMilestones.fulfilled, (state, action) => {
        state.isLoading = false;
        state.milestones = action.payload.milestones;
        state.upcoming = action.payload.upcoming;
        state.progress = action.payload.progress;
      })
      .addCase(fetchMilestones.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(achieveMilestone.fulfilled, (state, action) => {
        const index = state.milestones.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) {
          state.milestones[index] = action.payload;
        }
        // Remove from upcoming
        state.upcoming = state.upcoming.filter((m) => m.id !== action.payload.id);
        // Update progress
        if (state.progress) {
          state.progress.achieved += 1;
          state.progress.percentage = Math.round(
            (state.progress.achieved / state.progress.total) * 100
          );
        }
      });
  },
});

export const { clearMilestonesError } = milestonesSlice.actions;
export default milestonesSlice.reducer;
