import { Logger, LogLevel, SapphireClient } from '@sapphire/framework';
import { Intents } from 'discord.js';
import { botPrefix } from '../../../Config';
import { SlashCommandStore } from '../slashCmd/SlashCommandStore';

export class BotClient extends SapphireClient {
	public constructor() {
		super({
			allowedMentions: {
				repliedUser: true
			},
			defaultPrefix: botPrefix,
			regexPrefix: /^(hey +)?bot[,! ]/i,
			caseInsensitiveCommands: true,
			logger: {
				level: LogLevel.Debug
			},
			ws: {
				properties: {
					$browser: 'Discord iOS'
				}
			},
			shards: 'auto',
			partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
			intents: [
				Intents.FLAGS.DIRECT_MESSAGES,
				Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
				Intents.FLAGS.DIRECT_MESSAGE_TYPING,
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_BANS,
				Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
				Intents.FLAGS.GUILD_INTEGRATIONS,
				Intents.FLAGS.GUILD_INVITES,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_MESSAGE_TYPING,
				Intents.FLAGS.GUILD_PRESENCES,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.GUILD_WEBHOOKS
			]
		});

		this.stores.register(new SlashCommandStore());
	}
}
