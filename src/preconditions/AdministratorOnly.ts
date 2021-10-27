import { ApplyOptions } from '@sapphire/decorators';
import { Precondition, PreconditionOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<PreconditionOptions>({
	name: 'Administrator'
})
export class Administrator extends Precondition {
	run(message: Message) {
		if (!message.guild) {
			return this.error({ message: 'This cannot be run in dms' });
		}
		return message.member!.permissions.has('ADMINISTRATOR') ? this.ok() : this.error({ message: 'This command can only run by Administrators!' });
	}
}

declare module '@sapphire/framework' {
	export interface Preconditions {
		Administrator: never;
	}
}
