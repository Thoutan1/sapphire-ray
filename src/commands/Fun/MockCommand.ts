import { ApplyOptions } from '@sapphire/decorators';
import { RayCommand } from '../../lib/structs/client/RayCommand';
import type { Message } from 'discord.js';
import type { Args } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import { generateMock } from '../../lib/utils/MockFunction';

@ApplyOptions<RayCommand.Options>({
	name: 'mock',
	aliases: ['mck'],
	description: 'Generate Mock Text.'
})
export class MockCommand extends RayCommand {
	public async messageRun(message: Message, args: Args) {
		const code = await args.rest('string').catch(() => 'apah iyah');
		return send(message, generateMock(code));
	}
}
