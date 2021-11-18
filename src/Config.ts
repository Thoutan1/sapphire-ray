import type { ColorResolvable } from 'discord.js';

export const botOwners: string[] = JSON.parse(process.env.OWNERS!);
export const Github_Token = process.env.GITHUB_TOKEN;
export const botPrefix = process.env.PREFIX || 'b!';
export const BotColor = '3CAAFF' as ColorResolvable;
export const BotFooter = 'Thanks For Using Ray';
