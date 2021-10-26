import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { formatMS } from '../../lib/utils/Formatter';

@ApplyOptions<CommandOptions>({
	name: 'stats',
	description: 'Show my stats'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		let embed = new MessageEmbed()
			.setAuthor(this.container.client.user?.username as string, undefined, 'https://overtunes.netlify.app/docs/get-started/inviting-the-bot/')
			.setColor(message.guild?.me?.displayHexColor!)
			.setTimestamp(this.container.client.readyTimestamp)
			.setFooter(`PID: ${process.pid} | ShardID: ${message.guild?.shardId}`).setDescription(`\`\`\`fix\n
Uptime          : ${formatMS(this.container.client.uptime!)}
Total Members   : ${this.container.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members
Total Guilds    : ${this.container.client.guilds.cache.size} Guilds
Total Channels  : ${this.container.client.channels.cache.size} Channels
Memory Usage    : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mb\`\`\`
`);
		return message.channel.send({ embeds: [embed] });
	}
}
