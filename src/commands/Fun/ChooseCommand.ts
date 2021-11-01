import { ApplyOptions } from '@sapphire/decorators';
import { send } from '@sapphire/plugin-editable-commands';
import { RayCommand } from '../../lib/structs/client/RayCommand';
import type { Args } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { random } from '../../lib/utils/Random';

@ApplyOptions<RayCommand.Options>({
	name: 'choose',
	description: 'Randomly chooses <amount> options from a list.'
})
export class UserCommand extends RayCommand {
	public async messageRun(message: Message, args: Args) {
		const amount = await args.pick('number').catch(() => 1);
		const options = await args.repeat('string');

		if (options.length == 0) return await send(message, 'none');

		const chosen = [];

		for (let i = 0; i < amount; i++) {
			const chosenIndex = random(0, options.length - 1);
			chosen.push(options.splice(chosenIndex, 1));
		}

		return await send(message, chosen.join(', '));
	}
}
