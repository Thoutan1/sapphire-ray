import { ApplyOptions } from '@sapphire/decorators';
import { RayCommand } from '../../lib/structs/client/RayCommand';
import { send } from '@sapphire/plugin-editable-commands';
import type { Args } from '@sapphire/framework';
import type { Message } from 'discord.js';
import child from 'child_process';
import { codeBlock } from '@sapphire/utilities';

@ApplyOptions<RayCommand.Options>({
	name: 'shell',
	aliases: ['$'],
	quotes: [],
	preconditions: ['BotOwner'],
	flags: ['async', 'hidden', 'showHidden', 'silent', 's'],
	options: ['depth'],
	description: 'Execute Shell'
})
export class UserCommand extends RayCommand {
	public async messageRun(message: Message, args: Args) {
		const code = await args.rest('string');
		child.exec(code, (err, res) => {
			if (err) {
				const error = codeBlock('bash', err);
				return send(message, `Failed CMD ${code}\n${error.toString().slice(0, 1000) || 'Unknown Error'}`);
			}

			const respond = codeBlock('js', res);
			return send(message, `$❯_ ${code}\n${respond.slice(0, 1000)}`);
		});
	}
}
