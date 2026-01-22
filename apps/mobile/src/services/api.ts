import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

class ApiClient {
  private async getHeaders(): Promise<HeadersInit> {
    const token = await SecureStore.getItemAsync('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = await this.getHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options.headers },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

const api = new ApiClient();

// Auth API
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post<{ user: any; token: string }>('/auth/login', credentials),

  register: (data: { email: string; password: string; name: string }) =>
    api.post<{ user: any; token: string }>('/auth/register', data),

  getCurrentUser: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to get user');
    return response.json();
  },
};

// Children API
export const childrenApi = {
  getAll: () => api.get<any[]>('/children'),
  getOne: (id: string) => api.get<any>(`/children/${id}`),
  create: (data: any) => api.post<any>('/children', data),
  update: (id: string, data: any) => api.patch<any>(`/children/${id}`, data),
  delete: (id: string) => api.delete(`/children/${id}`),
};

// Milestones API
export const milestonesApi = {
  getByChild: (childId: string) => api.get<any[]>(`/milestones/child/${childId}`),
  getUpcoming: (childId: string) => api.get<any[]>(`/milestones/child/${childId}/upcoming`),
  getProgress: (childId: string) => api.get<any>(`/milestones/child/${childId}/progress`),
  create: (childId: string, data: any) => api.post<any>(`/milestones/child/${childId}`, data),
  markAchieved: (id: string, data: any) => api.patch<any>(`/milestones/${id}/achieve`, data),
  getTemplates: (category?: string) =>
    api.get<any[]>(`/milestones/templates${category ? `?category=${category}` : ''}`),
};

// Tracking API
export const trackingApi = {
  // Growth
  getGrowthRecords: (childId: string) => api.get<any[]>(`/tracking/growth/${childId}`),
  getLatestGrowth: (childId: string) => api.get<any>(`/tracking/growth/${childId}/latest`),
  addGrowthRecord: (childId: string, data: any) =>
    api.post<any>(`/tracking/growth/${childId}`, data),

  // Daily logs
  getDailyLogs: (childId: string, date?: string) =>
    api.get<any[]>(`/tracking/logs/${childId}${date ? `?date=${date}` : ''}`),
  getDailySummary: (childId: string, date?: string) =>
    api.get<any>(`/tracking/logs/${childId}/summary${date ? `?date=${date}` : ''}`),
  addDailyLog: (childId: string, data: any) => api.post<any>(`/tracking/logs/${childId}`, data),
};

// Content API
export const contentApi = {
  getTipOfTheDay: (ageMonths: number) =>
    api.get<any>(`/content/tip-of-the-day?ageMonths=${ageMonths}`),
  getTips: (ageMonths: number, limit?: number) =>
    api.get<any[]>(`/content/tips?ageMonths=${ageMonths}${limit ? `&limit=${limit}` : ''}`),
  getArticles: (params?: { category?: string; ageMonths?: number; page?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.ageMonths) searchParams.set('ageMonths', params.ageMonths.toString());
    if (params?.page) searchParams.set('page', params.page.toString());
    return api.get<any>(`/content/articles?${searchParams}`);
  },
};

export default api;
