import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type GameModesProps = {
    navigation: FrameNavigationProp<MainStackParamList, "GameModes">,
};

export function GameModes({ navigation }: GameModesProps) {
    return (
        <flexboxLayout className="h-full flex-col justify-center items-center bg-gray-100">
            <label className="text-2xl font-bold mb-8 text-blue-600">
                Select Game Mode
            </label>
            
            <button
                className="bg-blue-500 text-white py-4 px-8 rounded-lg mb-4 w-64 text-center"
                onTap={() => navigation.navigate("Game", { mode: "random" })}
            >
                Random Game
            </button>
            
            <button
                className="bg-green-500 text-white py-4 px-8 rounded-lg mb-4 w-64 text-center"
                onTap={() => navigation.navigate("Game", { mode: "private" })}
            >
                Join Private Game
            </button>
            
            <button
                className="bg-gray-500 text-white py-4 px-8 rounded-lg mb-4 w-64 text-center"
                onTap={() => navigation.goBack()}
            >
                Back
            </button>
        </flexboxLayout>
    );
}