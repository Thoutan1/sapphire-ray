import { LogLevel, SapphireClient } from '@sapphire/framework';
import { botPrefix } from '../../../Config';

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
			intents: [
				'GUILDS',
				'GUILD_MEMBERS',
				'GUILD_BANS',
				'GUILD_EMOJIS_AND_STICKERS',
				'GUILD_VOICE_STATES',
				'GUILD_MESSAGES',
				'GUILD_MESSAGE_REACTIONS',
				'DIRECT_MESSAGES',
				'DIRECT_MESSAGE_REACTIONS'
			]
		});
	}
}
