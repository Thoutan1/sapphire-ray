import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions, Args } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { send } from '@sapphire/plugin-editable-commands';
import { IMessageEmbed } from '../../lib/structs/client/IMessageEmbed';

@ApplyOptions<CommandOptions>({
	name: 'userinfo',
	description: 'Know userinfo the user'
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		const mention = await args.pick('user').catch(() => message.author);
		this, this.container.logger.info(mention.createdTimestamp);
		return send(message, {
			embeds: [new IMessageEmbed().setTitle(`${mention.username}'s Userinfo'`).addField('User ID', mention.id)]
		});
	}
}
