import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions, Args } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	name: 'say',
	description: 'say',
	preconditions: ['Administrator']
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		const tosay = await args.pick('string').catch(() => 'ya');

		return send(message, tosay.toUpperCase());
	}
}
