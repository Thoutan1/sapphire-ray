import { ApplyOptions } from '@sapphire/decorators';
import { send } from '@sapphire/plugin-editable-commands';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	name: 'pyramid',
	description: 'Generate Pyramid Star'
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		function pyramid(size: number): string {
			const a = new Array(size).fill('*').map((r: string, i: number) => r.repeat(i + 1).padStart(size));
			return a.map((r: string, i: number) => r + a.map((r) => r.split('').reverse().join('').substring(1))[i]).join('\n');
		}

		const size = await args.pick('number').catch(() => 5);
		const generation = pyramid(size);

		return send(message, `\`\`\`\n${generation}\n\`\`\``);
	}
}
