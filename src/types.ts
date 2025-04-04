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

export interface RegData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image?: File;
}