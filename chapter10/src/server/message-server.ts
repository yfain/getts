import * as WebSocket from 'ws';

export abstract class MessageServer<T> {
  constructor(private readonly wsServer: WebSocket.Server) {
    this.wsServer.on('connection', this.subscribeToMessages);
    this.wsServer.on('error', this.cleanupDeadClients);
  }

  protected abstract handleMessage(sender: WebSocket, message: T): void;

  protected readonly subscribeToMessages = (ws: WebSocket): void => {
    ws.on('message', (data: WebSocket.Data) => {
      if (typeof data === 'string') {
        this.handleMessage(ws, JSON.parse(data));
      } else {
        console.error('Received data of unsupported type.');
      }
    });
  };

  private readonly cleanupDeadClients = (): void => {
    this.clients.forEach((client: WebSocket) => {
      if (MessageServer.isDead(client)) {
        this.clients.delete(client);
      }
    });
  };

  protected broadcastExcept(currentClient: WebSocket, message: Readonly<T>): void {
    this.clients.forEach((client: WebSocket) => {
      if (MessageServer.isAlive(client) && client !== currentClient) {
        MessageServer.replyTo(client, message);
      }
    });
  }

  protected static replyTo<T>(client: WebSocket, message: Readonly<T>): void {
    client.send(JSON.stringify(message));
  }

  protected get clients(): Set<WebSocket> {
    return this.wsServer.clients;
  }

  private static isAlive(client: WebSocket): boolean {
    return !MessageServer.isDead(client);
  }

  private static isDead(client: WebSocket): boolean {
    return (
      client.readyState === WebSocket.CLOSING ||
      client.readyState === WebSocket.CLOSED
    );
  }
}
