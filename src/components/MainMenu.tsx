import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { useAuth } from "../context/AuthContext";

type MainMenuProps = {
    navigation: FrameNavigationProp<MainStackParamList, "MainMenu">,
};

export function MainMenu({ navigation }: MainMenuProps) {
    const { user, isAuthenticated } = useAuth();

    return (
        <flexboxLayout className="h-full flex-col justify-center items-center bg-gray-100">
            <label className="text-3xl font-bold mb-8 text-blue-600">
                Mystery One
            </label>
            
            <button
                className="bg-blue-500 text-white py-4 px-8 rounded-lg mb-4 w-64 text-center"
                onTap={() => navigation.navigate("GameModes")}
            >
                Play Game
            </button>
            
            <button
                className="bg-green-500 text-white py-4 px-8 rounded-lg mb-4 w-64 text-center"
                onTap={() => navigation.navigate("HostOptions")}
            >
                Host Game
            </button>
            
            <button
                className="bg-purple-500 text-white py-4 px-8 rounded-lg mb-4 w-64 text-center"
                onTap={() => navigation.navigate("Leaderboard")}
            >
                Leaderboard
            </button>

            <button
                className="bg-indigo-500 text-white py-4 px-8 rounded-lg mb-4 w-64 text-center"
                onTap={() => navigation.navigate("Profile")}
            >
                Profile
            </button>

            <button
                className="bg-yellow-500 text-white py-4 px-8 rounded-lg mb-4 w-64 text-center"
                onTap={() => navigation.navigate("Store")}
            >
                Store
            </button>

            {isAuthenticated && (
                <label className="text-sm text-gray-600">
                    Welcome back, {user?.username}!
                </label>
            )}
        </flexboxLayout>
    );
}