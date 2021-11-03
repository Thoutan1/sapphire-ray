import { ApplyOptions } from '@sapphire/decorators';
import { RayCommand } from '../../lib/structs/client/RayCommand';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';
import { formatMS } from '../../lib/utils/Formatter';

@ApplyOptions<RayCommand.Options>({
	name: 'ping',
	description: 'ping pong'
})
export class UserCommand extends RayCommand {
	public async messageRun(message: Message) {
		try {
			const msg = await send(message, 'Ping?');

			const content = `Pong! Uptime ${formatMS(this.container.client.uptime!)} Bot Latency ${Math.round(
				this.container.client.ws.ping
			)}ms. API Latency ${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}ms.`;

			return send(message, content);
		} catch (e) {
			this.container.logger.error(e);
			return send(message, 'I Have Error dude');
		}
	}
}
