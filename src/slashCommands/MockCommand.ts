import type { PieceContext } from '@sapphire/framework';
import type { CommandInteraction, Message } from 'discord.js';
import { generateMock } from '../lib/utils/MockFunction';
import { SlashCommand } from '../lib/structs/slashCmd/SlashCommandPiece';

export class Ping extends SlashCommand {
	constructor(context: PieceContext) {
		super(context, {
			name: 'mock',
			description: 'Converted your text to Mock',
			options: [
				{
					name: 'text',
					type: 'STRING',
					description: 'Text to converter'
				}
			],
			guildOnly: true
		});
	}

	async run(interaction: CommandInteraction) {
		await interaction.deferReply();
		const text = interaction.options.getString('text');
		await interaction.editReply(generateMock(text!));
	}
}
