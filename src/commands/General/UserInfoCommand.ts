import { ApplyOptions } from '@sapphire/decorators';
import { RayCommand } from '../../lib/structs/client/RayCommand';
import type { Args } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { send } from '@sapphire/plugin-editable-commands';
import { IMessageEmbed } from '../../lib/structs/client/IMessageEmbed';

@ApplyOptions<RayCommand.Options>({
	name: 'userinfo',
	description: 'Know userinfo the user'
})
export class UserCommand extends RayCommand {
	public async messageRun(message: Message, args: Args) {
		const member = args.finished ? message.member : await args.pick('member');
		const isBot = member?.user.bot;
		const roles = member?.roles.cache
			.sort((a, b) => b.position - a.position)
			.map((role) => role.toString())
			.slice(0, -1);
		const unixTimestamp = Math.floor(member?.user.createdTimestamp! / 1000);
		const unixTimestamp2 = Math.floor(member?.joinedTimestamp! / 1000);
		return send(message, {
			embeds: [
				new IMessageEmbed()
					.setTitle(`${member?.user.username}'s Userinfo`)
					.setThumbnail(member?.user.displayAvatarURL({})!)
					.setColor(member?.displayHexColor!)
					.addField('User ID', member?.user.id!)
					.addField('User CreateAt', `<t:${unixTimestamp}:F> [<t:${unixTimestamp}:R>]`)
					.addField('User JoinedAt', `<t:${unixTimestamp2}:F> [<t:${unixTimestamp2}:R>]`)
					.addField('User Color', member?.displayHexColor!)
					.addField('User IsBot?', isBot ? 'Yes' : 'No')
					.addField('Highest role', `${roles!.length > 0 ? member?.roles.highest.toString() : 'None'}`)
					.addField('Roles', `${!roles?.length ? 'None' : roles.length > 10 ? trimArray(roles).join(', ') : roles.join(', ')}`)
					.setFooter(`requested By ${message.author.tag}`)
					.setTimestamp()
			]
		});
	}
}

function trimArray(array: any, maxLen = 10) {
	if (array.length > maxLen) {
		const len = array.length - maxLen;
		array = array.slice(0, maxLen);
		array.push(` and ${len} more...`);
	}
	return array;
}
