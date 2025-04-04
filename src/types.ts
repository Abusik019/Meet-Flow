export interface LoginData {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface AuthState {
    userInfo: Record<string, unknown>;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
}