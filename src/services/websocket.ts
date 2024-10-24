import { Subject } from 'rxjs';

export type WebSocketMessage = {
    type: 'chat' | 'game_state' | 'player_join' | 'player_leave' | 'guess';
    payload: any;
    timestamp: number;
    sender?: string;
};

class WebSocketService {
    private ws: WebSocket | null = null;
    private messageSubject = new Subject<WebSocketMessage>();
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;

    connect(gameId: string, userId: string) {
        // TODO: Replace with actual WebSocket server URL
        this.ws = new WebSocket(`wss://your-websocket-server/game/${gameId}?userId=${userId}`);

        this.ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                this.messageSubject.next(message);
            } catch (error) {
                console.error('Failed to parse WebSocket message:', error);
            }
        };

        this.ws.onclose = () => {
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
                setTimeout(() => {
                    this.reconnectAttempts++;
                    this.connect(gameId, userId);
                }, 1000 * Math.pow(2, this.reconnectAttempts));
            }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.reconnectAttempts = 0;
    }

    sendMessage(message: Omit<WebSocketMessage, 'timestamp'>) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                ...message,
                timestamp: Date.now()
            }));
        }
    }

    onMessage() {
        return this.messageSubject.asObservable();
    }
}

export const webSocketService = new WebSocketService();