import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { RayCommand } from '../../lib/structs/client/RayCommand';
import { reply } from '@sapphire/plugin-editable-commands';
import { PermissionLevels } from '../../lib/types/enum/PermissionLevels';

@ApplyOptions<RayCommand.Options>({
	name: 'math',
	cooldownDelay: 6000,
	aliases: ['calc'],
	subCommands: ['add', 'subtract', 'multiply', 'divide'],
	description: 'Simple math operations'
})
export class Math extends RayCommand {
	public async add(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		await reply(message, { content: `The sum is **${x + y}**` });
	}

	public async subtract(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		await reply(message, { content: `The difference is **${x - y}**` });
	}

	public async multiply(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		await reply(message, { content: `The product is **${x * y}**` });
	}

	public async divide(message: Message, args: Args) {
		const x = await args.pick('number');
		const y = await args.pick('number');
		await reply(message, {
			content: `The quotient is **${x / y}** and remainder is **${x % y}**`
		});
	}
}
