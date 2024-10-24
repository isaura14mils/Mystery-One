import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type User = {
    id: string;
    username: string;
    score: number;
    gamesPlayed: number;
    winRate: number;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        // TODO: Implement actual authentication
        setUser({
            id: "user-1",
            username,
            score: 0,
            gamesPlayed: 0,
            winRate: 0,
        });
    };

    const logout = () => {
        setUser(null);
    };

    const register = async (username: string, password: string) => {
        // TODO: Implement actual registration
        await login(username, password);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            logout,
            register,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}