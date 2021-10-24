import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions, Args } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { send } from '@sapphire/plugin-editable-commands';
import { IMessageEmbed } from '../../lib/structs/client/IMessageEmbed';
import { Timestamp } from '@sapphire/time-utilities';

@ApplyOptions<CommandOptions>({
	name: 'userinfo',
	description: 'Know userinfo the user'
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		const member = args.finished ? message.member : await args.pick('member');
		const timestamp = new Timestamp('dddd, MMMM DD YYYY, h:mm:ss a');
		const isBot = member?.user.bot;
		return send(message, {
			embeds: [
				new IMessageEmbed()
					.setTitle(`${member?.user.username}'s Userinfo`)
					.setThumbnail(member?.user.displayAvatarURL({})!)
					.addField('User ID', member?.user.id!)
					.addField('User CreateAt', `${timestamp.display(member?.user.createdAt)}`)
					.addField('User JoinedAt', `${timestamp.display(member?.joinedAt!)}`)
					.addField('User IsBot?', isBot ? 'Yes' : 'No')
			]
		});
	}
}
