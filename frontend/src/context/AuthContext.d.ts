import * as React from 'react';
interface AuthContextType {
    user: {
        id: string;
        email: string;
        username: string;
    } | null;
    token: string | null;
    login: (token: string, userData: {
        id: string;
        email: string;
        username: string;
    }) => void;
    logout: () => void;
}
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useAuth: () => AuthContextType;
export {};
