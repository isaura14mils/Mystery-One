import * as React from "react";
import { useState, useEffect } from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type LeaderboardProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Leaderboard">,
};

type LeaderboardEntry = {
    rank: number;
    username: string;
    score: number;
    gamesPlayed: number;
    winRate: number;
};

export function Leaderboard({ navigation }: LeaderboardProps) {
    const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'allTime'>('daily');
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        // TODO: Fetch actual leaderboard data
        setLeaderboardData([
            { rank: 1, username: "Player1", score: 1200, gamesPlayed: 25, winRate: 0.8 },
            { rank: 2, username: "Player2", score: 1100, gamesPlayed: 20, winRate: 0.75 },
            { rank: 3, username: "Player3", score: 1000, gamesPlayed: 18, winRate: 0.7 },
        ]);
    }, [timeFrame]);

    return (
        <flexboxLayout className="h-full flex-col bg-gray-100">
            {/* Time Frame Selector */}
            <flexboxLayout className="p-4 bg-white justify-around">
                <button
                    className={`px-4 py-2 rounded-lg ${timeFrame === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onTap={() => setTimeFrame('daily')}
                >
                    Daily
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${timeFrame === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onTap={() => setTimeFrame('weekly')}
                >
                    Weekly
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${timeFrame === 'allTime' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onTap={() => setTimeFrame('allTime')}
                >
                    All Time
                </button>
            </flexboxLayout>

            {/* Leaderboard Header */}
            <gridLayout className="p-4 bg-gray-200" columns="auto, *, auto, auto, auto" rows="auto">
                <label col="0" className="font-bold">Rank</label>
                <label col="1" className="font-bold">Player</label>
                <label col="2" className="font-bold">Score</label>
                <label col="3" className="font-bold">Games</label>
                <label col="4" className="font-bold">Win %</label>
            </gridLayout>

            {/* Leaderboard Entries */}
            <scrollView className="flex-grow">
                <stackLayout>
                    {leaderboardData.map((entry) => (
                        <gridLayout
                            key={entry.rank}
                            className="p-4 border-b border-gray-200 bg-white"
                            columns="auto, *, auto, auto, auto"
                            rows="auto"
                        >
                            <label col="0" className={`font-bold ${entry.rank <= 3 ? 'text-gold' : ''}`}>
                                #{entry.rank}
                            </label>
                            <label col="1">{entry.username}</label>
                            <label col="2">{entry.score}</label>
                            <label col="3">{entry.gamesPlayed}</label>
                            <label col="4">{Math.round(entry.winRate * 100)}%</label>
                        </gridLayout>
                    ))}
                </stackLayout>
            </scrollView>

            {/* Back Button */}
            <button
                className="m-4 p-4 bg-gray-500 text-white rounded-lg"
                onTap={() => navigation.goBack()}
            >
                Back
            </button>
        </flexboxLayout>
    );
}