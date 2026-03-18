// Discord gateway types

import type { Message } from 'discord.js';

export interface QueuedMessage {
  message: Message;
  timestamp: number;
}

export interface MessageBatch {
  messages: Message[];
  channelId: string;
  userId: string;
  guildId: string | null;
  combinedContent: string;
  firstMessage: Message;
  lastMessage: Message;
  channelHistory?: string;
}

export interface PairingCode {
  code: string;
  userId: string;
  username?: string;
  channelId: string;
  createdAt: string;
  expiresAt: string;
}

export interface PreflightResult {
  allowed: boolean;
  reason: string;
  requiresPairing?: boolean;
  pairingCode?: string;
}
