/**
 * Alias string with UUID type for readability purpose. It hint that the message correlation ID
 * is not an arbitrary string, but represents a particular data format.
 */
export type UUID = string;

export interface Message {
  correlationId: UUID;
  type: string;
  payload?: any;
}

export enum MessageTypes {
  GetLongestChainRequest  = 'GET_LONGEST_CHAIN_REQUEST',
  GetLongestChainResponse = 'GET_LONGEST_CHAIN_RESPONSE',
  NewBlockRequest         = 'NEW_BLOCK_REQUEST',
  NewBlockAnnouncement    = 'NEW_BLOCK_ANNOUNCEMENT'
}
