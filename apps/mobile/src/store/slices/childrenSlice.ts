import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { childrenApi } from '@/services/api';

interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  avatarUrl?: string;
  color: string;
}

interface ChildrenState {
  children: Child[];
  selectedChild: Child | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChildrenState = {
  children: [],
  selectedChild: null,
  isLoading: false,
  error: null,
};

export const fetchChildren = createAsyncThunk(
  'children/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await childrenApi.getAll();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addChild = createAsyncThunk(
  'children/add',
  async (childData: Omit<Child, 'id'>, { rejectWithValue }) => {
    try {
      return await childrenApi.create(childData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateChild = createAsyncThunk(
  'children/update',
  async ({ id, data }: { id: string; data: Partial<Child> }, { rejectWithValue }) => {
    try {
      return await childrenApi.update(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const childrenSlice = createSlice({
  name: 'children',
  initialState,
  reducers: {
    selectChild: (state, action) => {
      state.selectedChild = action.payload;
    },
    clearChildrenError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChildren.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChildren.fulfilled, (state, action) => {
        state.isLoading = false;
        state.children = action.payload;
        if (!state.selectedChild && action.payload.length > 0) {
          state.selectedChild = action.payload[0];
        }
      })
      .addCase(fetchChildren.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addChild.fulfilled, (state, action) => {
        state.children.push(action.payload);
        state.selectedChild = action.payload;
      })
      .addCase(updateChild.fulfilled, (state, action) => {
        const index = state.children.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.children[index] = action.payload;
        }
        if (state.selectedChild?.id === action.payload.id) {
          state.selectedChild = action.payload;
        }
      });
  },
});

export const { selectChild, clearChildrenError } = childrenSlice.actions;
export default childrenSlice.reducer;
