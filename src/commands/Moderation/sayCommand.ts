import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { RayCommand } from '../../lib/structs/client/RayCommand';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';

@ApplyOptions<RayCommand.Options>({
	name: 'say',
	description: 'say',
	preconditions: ['Administrator']
})
export class UserCommand extends RayCommand {
	public async messageRun(message: Message, args: Args) {
		const tosay = await args.pick('string').catch(() => 'ya');

		return send(message, tosay.toUpperCase());
	}
}
