import * as React from "react";
import { useEffect, useState } from "react";
import { Image } from "@nativescript/core";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { useGame } from "../context/GameContext";
import { Chat } from "./Chat";
import { webSocketService } from "../services/websocket";
import { useAuth } from "../context/AuthContext";

type GameScreenProps = {
    route: RouteProp<MainStackParamList, "Game">;
    navigation: FrameNavigationProp<MainStackParamList, "Game">;
};

export function GameScreen({ route, navigation }: GameScreenProps) {
    const { state, dispatch } = useGame();
    const { user } = useAuth();
    const [guess, setGuess] = useState("");
    const [feedback, setFeedback] = useState("");
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (!user) return;

        if (route.params.mode === "random") {
            // TODO: Fetch random game from backend
            dispatch({
                type: "START_GAME",
                payload: {
                    gameId: "random-123",
                    imageUrl: "placeholder-url",
                    topic: "Random Topic",
                },
            });
        }

        // Subscribe to game-related WebSocket messages
        const subscription = webSocketService.onMessage().subscribe((message) => {
            switch (message.type) {
                case 'game_state':
                    // Update game state based on server message
                    break;
                case 'player_join':
                case 'player_leave':
                    // Update players list
                    break;
                case 'guess':
                    // Handle other players' guesses
                    break;
            }
        });

        const timer = setInterval(() => {
            if (state.timeRemaining > 0 && state.isGameActive) {
                dispatch({ type: "UPDATE_TIME", payload: state.timeRemaining - 1 });
            } else if (state.timeRemaining === 0) {
                dispatch({ type: "END_GAME" });
            }
        }, 1000);

        return () => {
            clearInterval(timer);
            subscription.unsubscribe();
            webSocketService.disconnect();
        };
    }, [route.params.mode, state.timeRemaining, state.isGameActive, user]);

    const handleGuess = () => {
        if (!guess.trim()) return;

        webSocketService.sendMessage({
            type: 'guess',
            payload: guess.trim(),
            sender: user?.username
        });

        dispatch({ type: "MAKE_GUESS", payload: guess.trim() });
        // TODO: Implement guess validation logic
        setGuess("");
        setFeedback("Keep trying!");
    };

    const handleRevealMore = () => {
        dispatch({ type: "INCREASE_REVEAL", payload: 10 });
    };

    return (
        <gridLayout rows="*, auto">
            <scrollView row="0">
                <flexboxLayout className="flex-col bg-gray-100">
                    {/* Game Header */}
                    <flexboxLayout className="p-4 bg-blue-500 justify-between items-center">
                        <label className="text-white font-bold">Topic: {state.currentTopic}</label>
                        <label className="text-white">Time: {state.timeRemaining}s</label>
                        <label className="text-white">Score: {state.score}</label>
                    </flexboxLayout>

                    {/* Image Area */}
                    <flexboxLayout className="p-4 justify-center items-center">
                        {state.imageUrl && (
                            <image
                                src={state.imageUrl}
                                className="w-full h-64 rounded-lg"
                                style={{ opacity: state.revealPercentage / 100 }}
                            />
                        )}
                    </flexboxLayout>

                    {/* Guess Input Area */}
                    <flexboxLayout className="p-4 bg-white">
                        <textField
                            className="flex-grow p-4 bg-gray-100 rounded-lg mr-2"
                            hint="Enter your guess"
                            text={guess}
                            onTextChange={(args) => setGuess(args.object.text)}
                            returnKeyType="done"
                            onReturnPress={handleGuess}
                        />
                        <button
                            className="bg-blue-500 text-white p-4 rounded-lg"
                            onTap={handleGuess}
                        >
                            Guess
                        </button>
                    </flexboxLayout>

                    {/* Feedback Area */}
                    <flexboxLayout className="p-4">
                        <label className="text-center text-gray-700">{feedback}</label>
                    </flexboxLayout>

                    {/* Chat Toggle */}
                    <button
                        className="m-4 p-4 bg-purple-500 text-white rounded-lg"
                        onTap={() => setShowChat(!showChat)}
                    >
                        {showChat ? 'Hide Chat' : 'Show Chat'}
                    </button>

                    {/* Chat Component */}
                    {showChat && state.gameId && (
                        <Chat gameId={state.gameId} />
                    )}

                    {/* Controls */}
                    <flexboxLayout className="p-4 justify-between">
                        <button
                            className="bg-gray-500 text-white p-4 rounded-lg"
                            onTap={() => navigation.goBack()}
                        >
                            Quit
                        </button>
                        <button
                            className="bg-blue-500 text-white p-4 rounded-lg"
                            onTap={handleRevealMore}
                            isEnabled={state.revealPercentage < 100}
                        >
                            Reveal More (-10 points)
                        </button>
                    </flexboxLayout>
                </flexboxLayout>
            </scrollView>
        </gridLayout>
    );
}