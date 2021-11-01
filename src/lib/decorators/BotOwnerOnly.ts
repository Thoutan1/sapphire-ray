import { botOwners } from '../../Config';
import { createFunctionPrecondition } from '@sapphire/decorators';
import type { Message } from 'discord.js';

export function BotOwnerOnly(): MethodDecorator {
	return createFunctionPrecondition((message: Message) => {
		if (!botOwners.includes(message.author.id)) {
			message.reply('This command can only be used by bot owner!');
		}
		return botOwners.includes(message.author.id);
	});
}
