import * as React from "react";
import { useState } from "react";
import { TextField } from "@nativescript/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type HostOptionsProps = {
    navigation: FrameNavigationProp<MainStackParamList, "HostOptions">,
};

export function HostOptions({ navigation }: HostOptionsProps) {
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [wordCount, setWordCount] = useState("1");
    const [isPrivate, setIsPrivate] = useState(false);

    const handleCreateGame = () => {
        // TODO: Implement game creation logic with backend
        const gameId = Math.random().toString(36).substring(7);
        navigation.navigate("Game", {
            mode: "host",
            gameId,
            settings: {
                topic,
                description,
                wordCount: parseInt(wordCount, 10),
                isPrivate,
            },
        });
    };

    return (
        <scrollView className="h-full bg-gray-100">
            <flexboxLayout className="flex-col p-4">
                <label className="text-2xl font-bold mb-8 text-center text-blue-600">
                    Host Game Settings
                </label>

                <label className="text-sm font-medium text-gray-700 mb-2">Topic</label>
                <textField
                    className="mb-4 p-4 bg-white rounded-lg border border-gray-300"
                    hint="Enter game topic"
                    text={topic}
                    onTextChange={(args) => setTopic(args.object.text)}
                />

                <label className="text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <textField
                    className="mb-4 p-4 bg-white rounded-lg border border-gray-300"
                    hint="Enter game description"
                    text={description}
                    onTextChange={(args) => setDescription(args.object.text)}
                />

                <label className="text-sm font-medium text-gray-700 mb-2">Word Count</label>
                <textField
                    className="mb-4 p-4 bg-white rounded-lg border border-gray-300"
                    hint="Number of words allowed"
                    text={wordCount}
                    keyboardType="number"
                    onTextChange={(args) => setWordCount(args.object.text)}
                />

                <flexboxLayout className="mb-4">
                    <switch
                        checked={isPrivate}
                        onCheckedChange={(args) => setIsPrivate(args.object.checked)}
                    />
                    <label className="ml-2">Private Game</label>
                </flexboxLayout>

                <button
                    className="bg-blue-500 text-white py-4 px-8 rounded-lg mb-4"
                    onTap={handleCreateGame}
                    isEnabled={topic.length > 0}
                >
                    Create Game
                </button>

                <button
                    className="bg-gray-500 text-white py-4 px-8 rounded-lg"
                    onTap={() => navigation.goBack()}
                >
                    Back
                </button>
            </flexboxLayout>
        </scrollView>
    );
}