import { ApplyOptions } from '@sapphire/decorators';
import { send } from '@sapphire/plugin-editable-commands';
import type { Args } from '@sapphire/framework';
import { RayCommand } from '../../lib/structs/client/RayCommand';
import type { Message } from 'discord.js';
import { IMessageEmbed } from '../../lib/structs/client/IMessageEmbed';

@ApplyOptions<RayCommand.Options>({
	name: 'avatar',
	aliases: ['av', 'pp'],
	description: 'Displat Author Avatar Or Member Avatar'
})
export class UserCommand extends RayCommand {
	public async messageRun(message: Message, args: Args) {
		const mention = await args.pick('user').catch(() => message.author);

		return await send(message, {
			embeds: [new IMessageEmbed().setTitle(`${mention.username}'s Avatar'`).setImage(mention.displayAvatarURL({ dynamic: true, size: 512 }))]
		});
	}
}
