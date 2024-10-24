import * as React from "react";
import { useState, useEffect } from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { useAuth } from "../context/AuthContext";

type ProfileProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Profile">,
};

type Achievement = {
    id: string;
    title: string;
    description: string;
    progress: number;
    maxProgress: number;
    completed: boolean;
    icon: string;
};

export function Profile({ navigation }: ProfileProps) {
    const { user, logout } = useAuth();
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
        // TODO: Fetch actual achievements from backend
        setAchievements([
            {
                id: "first-win",
                title: "First Victory",
                description: "Win your first game",
                progress: 1,
                maxProgress: 1,
                completed: true,
                icon: "🏆"
            },
            {
                id: "quick-guesser",
                title: "Quick Guesser",
                description: "Guess correctly within 10 seconds",
                progress: 3,
                maxProgress: 5,
                completed: false,
                icon: "⚡"
            },
            {
                id: "streak-master",
                title: "Streak Master",
                description: "Win 5 games in a row",
                progress: 2,
                maxProgress: 5,
                completed: false,
                icon: "🔥"
            }
        ]);
    }, []);

    return (
        <scrollView className="h-full bg-gray-100">
            {/* Profile Header */}
            <flexboxLayout className="p-6 bg-blue-500">
                <flexboxLayout className="flex-col items-center w-full">
                    <label className="text-3xl font-bold text-white mb-2">
                        {user?.username}
                    </label>
                    <label className="text-white mb-4">
                        Total Score: {user?.score}
                    </label>
                    <gridLayout columns="auto,auto,auto" className="w-full justify-center">
                        <stackLayout col="0" className="mx-4 items-center">
                            <label className="text-white font-bold">{user?.gamesPlayed}</label>
                            <label className="text-white">Games</label>
                        </stackLayout>
                        <stackLayout col="1" className="mx-4 items-center">
                            <label className="text-white font-bold">{Math.round((user?.winRate || 0) * 100)}%</label>
                            <label className="text-white">Win Rate</label>
                        </stackLayout>
                        <stackLayout col="2" className="mx-4 items-center">
                            <label className="text-white font-bold">{achievements.filter(a => a.completed).length}</label>
                            <label className="text-white">Achievements</label>
                        </stackLayout>
                    </gridLayout>
                </flexboxLayout>
            </flexboxLayout>

            {/* Achievements Section */}
            <stackLayout className="p-4">
                <label className="text-xl font-bold mb-4">Achievements</label>
                {achievements.map((achievement) => (
                    <gridLayout
                        key={achievement.id}
                        className="p-4 bg-white rounded-lg mb-3 shadow-sm"
                        columns="auto,*,auto"
                        rows="auto,auto"
                    >
                        <label col="0" row="0" rowSpan="2" className="text-2xl mr-3">
                            {achievement.icon}
                        </label>
                        <label col="1" row="0" className="font-bold">
                            {achievement.title}
                        </label>
                        <label col="1" row="1" className="text-sm text-gray-600">
                            {achievement.description}
                        </label>
                        <stackLayout col="2" row="0" rowSpan="2" className="justify-center">
                            <label className="text-sm text-gray-600">
                                {achievement.progress}/{achievement.maxProgress}
                            </label>
                        </stackLayout>
                    </gridLayout>
                ))}
            </stackLayout>

            {/* Logout Button */}
            <button
                className="m-4 p-4 bg-red-500 text-white rounded-lg"
                onTap={() => {
                    logout();
                    navigation.goBack();
                }}
            >
                Logout
            </button>
        </scrollView>
    );
}