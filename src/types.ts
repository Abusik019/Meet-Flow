import { StoreSnapshot, TLRecord } from "tldraw";

export interface LoginData {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface AuthState {
    userInfo: AuthMyInfo | object;
    token: string | null;
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

export interface ISnapshotState{
    snapshotID: string;
    loading: boolean;
    error: string | null;
}

export type SnapshotPayload = {
	snapshot: StoreSnapshot<TLRecord>;
	authorId: string;
}

export type SnapshotResponse = {
    message: string;
    snapshotId: string; 
    createdAt: Date; 
};

export type AuthMyInfo = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    createdAt: string;
}