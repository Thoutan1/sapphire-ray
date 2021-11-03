import { ApplyOptions } from '@sapphire/decorators';
import { RayCommand } from '../../lib/structs/client/RayCommand';
import { IMessageEmbed } from '../../lib/structs/client/IMessageEmbed';
import { Command, CommandOptions } from '@sapphire/framework';
import { Message, version } from 'discord.js';
import { formatMS } from '../../lib/utils/Formatter';

@ApplyOptions<RayCommand.Options>({
	name: 'stats',
	description: 'Show my stats'
})
export class UserCommand extends RayCommand {
	public async messageRun(message: Message) {
		let embed = new IMessageEmbed()
			.setAuthor(this.container.client.user?.username as string, undefined, 'https://overtunes.netlify.app/docs/get-started/inviting-the-bot/')
			.setColor(message.guild?.me?.displayHexColor!)
			.setThumbnail(this.container.client.user?.displayAvatarURL({ dynamic: true })!)
			.setImage(
				'https://cdn.discordapp.com/attachments/891679692611018773/902945602424414208/10_Photos_That_Will_Make_You_Look_Up_At_The_Sky_More_Often.jpeg'
			)
			.setTimestamp(this.container.client.readyTimestamp)
			.setFooter(`PID: ${process.pid} | ShardID: ${message.guild?.shardId}`).setDescription(`\`\`\`fix\n
Uptime          : ${formatMS(this.container.client.uptime!)}
Total Members   : ${this.container.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members
Total Guilds    : ${this.container.client.guilds.cache.size} Guilds
Total Channels  : ${this.container.client.channels.cache.size} Channels
NodeJs     		: ${process.version} on ${process.platform} ${process.arch}
Discord.js      : ${version}
Memory Usage    : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mb\`\`\`
`);
		return message.channel.send({ embeds: [embed] });
	}
}
