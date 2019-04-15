import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Message, MessageTypes, UUID } from '../messages';
import { Block, Transaction } from './blockchain-node.service';
import { CryptoService } from './crypto.service';

interface PromiseExecutor<T> {
  resolve: (value?: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private websocket: Promise<WebSocket>;
  private readonly messagesAwaitingReply = new Map<UUID, PromiseExecutor<Message>>();
  private readonly _messageReceived = new Subject<Message>();

  get messageReceived(): Observable<Message> {
    return this._messageReceived.asObservable();
  }

  // In Chapter 10 WebsocketController was instantiated with `new` keyword manually.
  // In Angular all services instantiated for us by Injector automatically.
  constructor(private readonly crypto: CryptoService) {
    this.websocket = this.connect();
  }

  private get url(): string {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const hostname = environment.wsHostname;
    return `${protocol}://${hostname}`;
  }

  private connect(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(this.url);
      ws.addEventListener('open', () => resolve(ws));
      ws.addEventListener('error', err => reject(err));
      ws.addEventListener('message', this.onMessageReceived);
    });
  }

  private readonly onMessageReceived = (event: MessageEvent) => {
    const message = JSON.parse(event.data) as Message;

    if (this.messagesAwaitingReply.has(message.correlationId)) {
      this.messagesAwaitingReply.get(message.correlationId).resolve(message);
      this.messagesAwaitingReply.delete(message.correlationId);
    } else {
      // Unlike Chapter 10 version, the services are created for us by Angular DI,
      // so we cannot pass a messagesCallback as an argument. The conventional way
      // to notify about events in Angular is using Observables.
      this._messageReceived.next(message);
    }
  }

  async send(message: Partial<Message>, awaitForReply: boolean = false): Promise<Message> {
    return new Promise<Message>(async (resolve, reject) => {
      if (awaitForReply) {
        this.messagesAwaitingReply.set(message.correlationId, { resolve, reject });
      }
      this.websocket.then(
        ws => ws.send(JSON.stringify(message)),
        () => this.messagesAwaitingReply.delete(message.correlationId)
      );
    });
  }

  async requestLongestChain(): Promise<Block[]> {
    const reply = await this.send({
      type: MessageTypes.GetLongestChainRequest,
      correlationId: this.crypto.uuid()
    }, true);
    return reply.payload;
  }

  requestNewBlock(transactions: Transaction[]): void {
    this.send({
      type: MessageTypes.NewBlockRequest,
      correlationId: this.crypto.uuid(),
      payload: transactions
    });
  }

  announceNewBlock(block: Block): void {
    this.send({
      type: MessageTypes.NewBlockAnnouncement,
      correlationId: this.crypto.uuid(),
      payload: block
    });
  }
}
