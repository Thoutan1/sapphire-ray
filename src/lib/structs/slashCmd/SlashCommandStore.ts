import { SlashCommand } from './SlashCommandPiece';
import { Store } from '@sapphire/framework';

export class SlashCommandStore extends Store<SlashCommand> {
	constructor() {
		// This is the name of the directory we want to look in for our slash
		// commands.
		super(SlashCommand as any, { name: 'slashCommands' });
	}

	async registerCommands() {
		const client = this.container.client;
		if (!client) return;

		// This will split the slash commands between global and guild only.
		const slashCommands = this.container.stores.get('slashCommands');
		const [guildCmds, globalCmds] = slashCommands?.partition((c: any) => c.guildOnly);

		// iterate to all connected guilds and apply the commands.
		const guilds = await client?.guilds?.fetch(); // retrieves Snowflake & Oauth2Guilds
		for (let [id] of guilds) {
			const guild = await client?.guilds?.fetch(id); // gets the guild instances from the cache (fetched before)
			await guild?.commands.set(guildCmds.map((c: any) => c.commandData));
		}
		if (process.env.NODE_ENV === 'development') {
			this.container.logger.info("Skipped global commands because we're in development mode");
			return;
		}

		// This will register global commands.
		await client?.application?.commands.set(globalCmds.map((c: SlashCommand) => c.commandData));
	}
}
