import { ApplyOptions } from '@sapphire/decorators';
import { RayCommand } from '../../lib/structs/client/RayCommand';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message, TextChannel } from 'discord.js';
import type { Args } from '@sapphire/framework';
import { IMessageEmbed } from '../../lib/structs/client/IMessageEmbed';

@ApplyOptions<RayCommand.Options>({
	name: 'channelinfo',
	aliases: ['chinfo'],
	description: 'Show information channel info'
})
export class UserCommand extends RayCommand {
	public async messageRun(message: Message, args: Args) {
		const ch = args.finished ? (message.channel as TextChannel) : await args.pick('guildTextChannel');
		const isNfsw = ch.nsfw;
		return send(message, {
			embeds: [
				new IMessageEmbed()
					.setAuthor(message.guild?.name!, `${message.guild?.iconURL()}`)
					.setTitle(`Channel Name\n ${ch.name}`)
					.setThumbnail('https://cdn.koya.gg/utilities/hashtag.png')
					.addField('Channel ID', ch.id)
					.addField('Channel Mention', `<#${ch.id}>`)
					.addField('Channel CreateAt', `<t:${Math.floor(ch.createdTimestamp / 1000)}:F> [<t:${Math.floor(ch.createdTimestamp / 1000)}:R>]`)
					.addField('Channel Topic', ch.topic || 'No Topic In this channel')
					.addField('Channel Nfsw', isNfsw ? 'Yes' : 'No')
			]
		});
	}
}
