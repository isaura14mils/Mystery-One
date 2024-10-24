import * as React from "react";
import { useState } from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { useAuth } from "../context/AuthContext";

type StoreProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Store">,
};

type StoreItem = {
    id: string;
    title: string;
    description: string;
    price: number;
    icon: string;
    type: "hint" | "powerup" | "theme" | "subscription";
};

export function Store({ navigation }: StoreProps) {
    const { user } = useAuth();
    const [storeItems] = useState<StoreItem[]>([
        {
            id: "hint-pack",
            title: "Hint Pack",
            description: "Get 5 hints to use in any game",
            price: 99,
            icon: "💡",
            type: "hint"
        },
        {
            id: "time-boost",
            title: "Time Boost",
            description: "Get 30 extra seconds in your next game",
            price: 149,
            icon: "⏰",
            type: "powerup"
        },
        {
            id: "premium",
            title: "Premium Subscription",
            description: "Ad-free experience + exclusive themes",
            price: 499,
            icon: "👑",
            type: "subscription"
        }
    ]);

    const handlePurchase = (item: StoreItem) => {
        // TODO: Implement actual purchase logic
        console.log(`Purchasing ${item.title}`);
    };

    return (
        <scrollView className="h-full bg-gray-100">
            {/* Store Header */}
            <flexboxLayout className="p-6 bg-yellow-500 items-center">
                <label className="text-2xl font-bold text-white mb-2">Store</label>
                {user && (
                    <label className="text-white">
                        Available Credits: {user.score}
                    </label>
                )}
            </flexboxLayout>

            {/* Store Items */}
            <stackLayout className="p-4">
                {storeItems.map((item) => (
                    <gridLayout
                        key={item.id}
                        className="p-4 bg-white rounded-lg mb-3 shadow-sm"
                        columns="auto,*,auto"
                        rows="auto,auto"
                    >
                        <label col="0" row="0" rowSpan="2" className="text-2xl mr-3">
                            {item.icon}
                        </label>
                        <stackLayout col="1" row="0" rowSpan="2">
                            <label className="font-bold">{item.title}</label>
                            <label className="text-sm text-gray-600">{item.description}</label>
                        </stackLayout>
                        <button
                            col="2" row="0" rowSpan="2"
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                            onTap={() => handlePurchase(item)}
                        >
                            {item.price} Credits
                        </button>
                    </gridLayout>
                ))}
            </stackLayout>

            {/* Back Button */}
            <button
                className="m-4 p-4 bg-gray-500 text-white rounded-lg"
                onTap={() => navigation.goBack()}
            >
                Back
            </button>
        </scrollView>
    );
}