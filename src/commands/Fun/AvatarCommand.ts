import { ApplyOptions } from '@sapphire/decorators';
import { send } from '@sapphire/plugin-editable-commands';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { IMessageEmbed } from '../../lib/structs/client/IMessageEmbed';

@ApplyOptions<CommandOptions>({
	name: 'avatar',
	aliases: ['av', 'pp'],
	description: 'Displat Author Avatar Or Member Avatar'
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		const mention = await args.pick('user').catch(() => message.author);

		return await send(message, { embeds: [new IMessageEmbed().setImage(mention.displayAvatarURL({ dynamic: true, size: 512 }))] });
	}
}
