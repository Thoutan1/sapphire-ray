import type { PieceContext } from '@sapphire/framework';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommand } from '../lib/structs/slashCmd/SlashCommandPiece';

export class Ping extends SlashCommand {
	constructor(context: PieceContext) {
		super(context, {
			name: 'avatar',
			description: 'Showing Member Avatar.',
			options: [
				{
					name: 'user',
					type: 'USER',
					description: 'The user to show avatar'
				}
			],
			guildOnly: true
		});
	}

	async run(interaction: CommandInteraction) {
		await interaction.deferReply();
		const user = interaction.user;

		const user2 = interaction.options.getUser('user');

		if (!user2) {
			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setTitle(`${user.username}'s Avatar`)
				.setImage(user.avatarURL({ size: 2048, dynamic: true, format: 'png' })!)

				.setFooter(`${user.tag}`, user.displayAvatarURL({ dynamic: true }));
			interaction.editReply({ embeds: [embed] });
		} else {
			const embed2 = new MessageEmbed()

				.setColor('BLUE')
				.setTitle(`${user2.username}'s avatar`)
				.setImage(user2.avatarURL({ size: 2048, dynamic: true, format: 'png' })!)

				.setFooter(`${user.tag}`, user.displayAvatarURL({ dynamic: true }));

			interaction.editReply({ embeds: [embed2] });
		}
	}
}
