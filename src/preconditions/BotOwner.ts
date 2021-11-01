import { ApplyOptions } from '@sapphire/decorators';
import { Precondition, PreconditionOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { botOwners } from '../Config';

@ApplyOptions<PreconditionOptions>({
	name: 'BotOwner'
})
export class BotOwner extends Precondition {
	run(message: Message) {
		return botOwners.includes(message.author.id) ? this.ok() : this.error({ message: 'Only bot owner can do this' });
	}
}

declare module '@sapphire/framework' {
	export interface Preconditions {
		BotOwner: never;
	}
}
