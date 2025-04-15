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

export interface IconProps {
    className?: string;
    strokeWidth?: string;
    fillColor?: string
}

export type NavItem = {
    name: string;
    href: string;
    icon: React.ComponentType<IconProps>;
};
