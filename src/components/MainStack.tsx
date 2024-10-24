import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { MainMenu } from "./MainMenu";
import { GameModes } from "./GameModes";
import { HostOptions } from "./HostOptions";
import { GameScreen } from "./GameScreen";
import { Leaderboard } from "./Leaderboard";
import { Profile } from "./Profile";
import { Store } from "./Store";
import { GameProvider } from "../context/GameContext";
import { AuthProvider } from "../context/AuthContext";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <AuthProvider>
        <GameProvider>
            <BaseNavigationContainer>
                <StackNavigator.Navigator
                    initialRouteName="MainMenu"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: "#4F46E5",
                        },
                        headerTintColor: "#ffffff",
                        headerShown: true,
                    }}
                >
                    <StackNavigator.Screen
                        name="MainMenu"
                        component={MainMenu}
                        options={{ title: "Mystery One" }}
                    />
                    <StackNavigator.Screen
                        name="GameModes"
                        component={GameModes}
                        options={{ title: "Game Modes" }}
                    />
                    <StackNavigator.Screen
                        name="HostOptions"
                        component={HostOptions}
                        options={{ title: "Host Game" }}
                    />
                    <StackNavigator.Screen
                        name="Game"
                        component={GameScreen}
                        options={{ title: "Mystery One Game" }}
                    />
                    <StackNavigator.Screen
                        name="Leaderboard"
                        component={Leaderboard}
                        options={{ title: "Leaderboard" }}
                    />
                    <StackNavigator.Screen
                        name="Profile"
                        component={Profile}
                        options={{ title: "Profile" }}
                    />
                    <StackNavigator.Screen
                        name="Store"
                        component={Store}
                        options={{ title: "Store" }}
                    />
                </StackNavigator.Navigator>
            </BaseNavigationContainer>
        </GameProvider>
    </AuthProvider>
);