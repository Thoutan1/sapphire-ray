import type { PieceContext } from '@sapphire/framework';
import type { CommandInteraction, Message } from 'discord.js';
import { SlashCommand } from '../lib/structs/slashCmd/SlashCommandPiece';

export class Ping extends SlashCommand {
	constructor(context: PieceContext) {
		super(context, {
			name: 'ping',
			description: 'Pongs when pinged.',
			options: [],
			guildOnly: false
		});
	}

	async run(interaction: CommandInteraction) {
		await interaction.deferReply();
		const reply = await interaction.editReply('Ping?');
		await interaction.editReply(
			`Pong! Latency is ${(reply as Message).createdTimestamp - interaction.createdTimestamp}ms. API Latency is ${Math.round(
				this.container.client.ws.ping
			)}ms.`
		);
	}
}
