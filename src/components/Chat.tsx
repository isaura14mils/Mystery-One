import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { ScrollView } from "@nativescript/core";
import { useAuth } from "../context/AuthContext";
import { webSocketService } from "../services/websocket";

type ChatProps = {
    gameId: string;
};

type ChatMessage = {
    id: string;
    sender: string;
    content: string;
    timestamp: number;
};

export function Chat({ gameId }: ChatProps) {
    const { user } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const scrollViewRef = useRef<ScrollView>();

    useEffect(() => {
        if (user) {
            webSocketService.connect(gameId, user.id);

            const subscription = webSocketService.onMessage().subscribe((message) => {
                if (message.type === 'chat') {
                    setMessages(prev => [...prev, {
                        id: `${message.timestamp}-${message.sender}`,
                        sender: message.sender || 'Unknown',
                        content: message.payload,
                        timestamp: message.timestamp
                    }]);
                }
            });

            return () => {
                subscription.unsubscribe();
                webSocketService.disconnect();
            };
        }
    }, [gameId, user]);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToVerticalOffset(
                scrollViewRef.current.scrollableHeight,
                true
            );
        }
    }, [messages]);

    const sendMessage = () => {
        if (!newMessage.trim() || !user) return;

        webSocketService.sendMessage({
            type: 'chat',
            payload: newMessage.trim(),
            sender: user.username
        });

        setNewMessage("");
    };

    return (
        <gridLayout rows="*, auto" className="h-64 bg-white border border-gray-200 rounded-lg">
            <scrollView
                row="0"
                ref={scrollViewRef}
                className="p-2"
            >
                <stackLayout>
                    {messages.map((message) => (
                        <gridLayout
                            key={message.id}
                            className={`p-2 rounded-lg mb-2 ${
                                message.sender === user?.username
                                    ? 'bg-blue-100 ml-12'
                                    : 'bg-gray-100 mr-12'
                            }`}
                        >
                            <stackLayout>
                                <label className="text-xs text-gray-600">
                                    {message.sender}
                                </label>
                                <label className="text-sm">
                                    {message.content}
                                </label>
                            </stackLayout>
                        </gridLayout>
                    ))}
                </stackLayout>
            </scrollView>

            <gridLayout
                row="1"
                columns="*, auto"
                className="p-2 border-t border-gray-200"
            >
                <textField
                    col="0"
                    className="p-2 bg-gray-100 rounded-lg"
                    hint="Type a message..."
                    text={newMessage}
                    onTextChange={(args) => setNewMessage(args.object.text)}
                    returnKeyType="send"
                    onReturnPress={sendMessage}
                />
                <button
                    col="1"
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onTap={sendMessage}
                >
                    Send
                </button>
            </gridLayout>
        </gridLayout>
    );
}