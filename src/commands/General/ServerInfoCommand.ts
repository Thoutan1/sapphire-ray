import { ApplyOptions } from '@sapphire/decorators';
import { RayCommand } from '../../lib/structs/client/RayCommand';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';
import { IMessageEmbed } from '../../lib/structs/client/IMessageEmbed';

@ApplyOptions<RayCommand.Options>({
	name: 'serverinfo',
	cooldownDelay: 5000,
	description: 'Show Information of the server'
})
export class UserCommand extends RayCommand {
	public async messageRun(message: Message) {
		return send(message, {
			embeds: [
				new IMessageEmbed()
					.setTitle(`${message.guild?.name} Information`)
					.setThumbnail(message.guild?.iconURL({ dynamic: true })!)
					.addField('Guild ID', `${message.guild?.id}`)
					.addField('Guild Owner', `<@${message.guild?.ownerId}> (${message.guild?.ownerId})`)
					.addField(
						'Guild CreationDate',
						`<t:${Math.floor(message.guild?.createdTimestamp! / 1000)}:F> [<t:${Math.floor(message.guild?.createdTimestamp! / 1000)}:R>]`
					)
					.addField(
						'Guild MemberCount',
						`${message.guild?.memberCount} **Total**, ${message.guild?.members.cache.filter((m) => !m.user.bot).size} **Humans**, ${
							message.guild?.members.cache.filter((m) => m.user.bot).size
						} **Bots.**`
					)
					.addField(
						'Guild Channels',
						`${message.guild?.channels.cache.filter((ch) => ch.type === 'GUILD_VOICE').size} **Text Channnels** ${
							message.guild?.channels.cache.filter((ch) => ch.type === 'GUILD_TEXT').size
						} **Voice Channels**`
					)
					.addField('Guild Emoji', `${message.guild?.emojis.cache.size} **Emoji(s)**`)
					.addField('Guild Role', `${message.guild?.roles.cache.size} **Role(s)**`)
			]
		});
	}
}
