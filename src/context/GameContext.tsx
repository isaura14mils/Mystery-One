import * as React from "react";
import { createContext, useContext, useReducer } from "react";

type GameState = {
    imageUrl: string | null;
    revealPercentage: number;
    score: number;
    guesses: string[];
    timeRemaining: number;
    isGameActive: boolean;
    currentTopic: string;
    gameId: string | null;
};

type GameAction = 
    | { type: "START_GAME"; payload: { gameId: string; imageUrl: string; topic: string } }
    | { type: "MAKE_GUESS"; payload: string }
    | { type: "INCREASE_REVEAL"; payload: number }
    | { type: "UPDATE_SCORE"; payload: number }
    | { type: "END_GAME" }
    | { type: "UPDATE_TIME"; payload: number };

const initialState: GameState = {
    imageUrl: null,
    revealPercentage: 0,
    score: 100,
    guesses: [],
    timeRemaining: 60,
    isGameActive: false,
    currentTopic: "",
    gameId: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case "START_GAME":
            return {
                ...state,
                gameId: action.payload.gameId,
                imageUrl: action.payload.imageUrl,
                currentTopic: action.payload.topic,
                isGameActive: true,
                revealPercentage: 0,
                score: 100,
                guesses: [],
                timeRemaining: 60,
            };
        case "MAKE_GUESS":
            return {
                ...state,
                guesses: [...state.guesses, action.payload],
            };
        case "INCREASE_REVEAL":
            return {
                ...state,
                revealPercentage: Math.min(100, state.revealPercentage + action.payload),
                score: Math.max(10, state.score - 10),
            };
        case "UPDATE_SCORE":
            return {
                ...state,
                score: action.payload,
            };
        case "END_GAME":
            return {
                ...state,
                isGameActive: false,
            };
        case "UPDATE_TIME":
            return {
                ...state,
                timeRemaining: action.payload,
            };
        default:
            return state;
    }
}

const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}