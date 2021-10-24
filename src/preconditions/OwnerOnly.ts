import { ApplyOptions } from '@sapphire/decorators';
import { Precondition, PreconditionOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { botOwners } from '../Config';

@ApplyOptions<PreconditionOptions>({
	name: 'ownerOnly'
})
export class ownerOnly extends Precondition {
	run(message: Message) {
		return botOwners.includes(message.author.id) ? this.ok() : this.error({ message: 'Only bot owner can do this' });
	}
}

declare module '@sapphire/framework' {
	export interface Preconditions {
		ownerOnly: never;
	}
}
