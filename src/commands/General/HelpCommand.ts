import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandContext, CommandOptions } from '@sapphire/framework';
import { botPrefix } from '../../Config';
import { Collection, Message, MessageEmbed } from 'discord.js';

function sortCommandsAlphabetically(_: Command[], __: Command[], firstCategory: string, secondCategory: string): 1 | -1 | 0 {
	if (firstCategory > secondCategory) return 1;
	if (secondCategory > firstCategory) return -1;
	return 0;
}

@ApplyOptions<CommandOptions>({
	name: 'help',
	description: 'Show all my Commands',
	detailedDescription: `
    🧩Showing all my **Command**

    You can use Command help for this example:
    ${botPrefix}help
    ${botPrefix}help **<CommandName>**

    Ex:
    ${botPrefix}help ping
    `
})
export class UserCommand extends Command {
	public async messageRun(message: Message, args: Args, context: CommandContext) {
		const command = args.nextMaybe();
		return command.exists && !args.getFlags('all') ? this.specific(message, command.value) : this.all(message, context);
	}

	private async specific(message: Message, commandName: string) {
		const command = this.container.stores.get('commands').get(commandName);
		return message.reply({
			embeds: [
				new MessageEmbed()
					.setTitle(`${command?.description}`)
					.setColor('#0099ff')
					.setDescription(`${command?.detailedDescription}`)
					.setFooter(`Command help for ${command?.name}`)
					.setTimestamp(Date.now())
			]
		});
	}

	private async all(message: Message, context: CommandContext) {
		const content = await this.buildHelp(message, context.commandPrefix);
		return message.reply({
			embeds: [
				new MessageEmbed()
					.setTitle(`${this.container.client.user?.username} - Help`)
					.setThumbnail(this.container.client.user?.displayAvatarURL({})!)
					.setDescription(content)
					.setColor('#0099ff')
					.setTimestamp(Date.now())
			]
		});
	}

	private async buildHelp(message: Message, prefix: string) {
		const commands = await this.fetchCommands(message);

		const helpMessage: string[] = [];
		for (const [category, list] of commands) {
			helpMessage.push(`**${category} Commands**:\n`, list.map(this.formatCommand.bind(this, prefix)).join('\n'), '');
		}

		return helpMessage.join('\n');
	}

	private formatCommand(prefix: string, command: Command) {
		const { description } = command;
		return `• **${prefix}${command.name}** → ${description}`;
	}

	private async fetchCommands(message: Message) {
		const commands = this.container.stores.get('commands');
		const filtered = new Collection<string, Command[]>();
		await Promise.all(
			commands.map(async (cmd: Command<Args>) => {
				const command = cmd as Command;

				const result = await cmd.preconditions.run(message, command, {
					command: null
				});
				if (!result.success) return;

				const category = filtered.get(command.fullCategory.join(' → '));
				if (category) category.push(command);
				else filtered.set(command.fullCategory.join(' → '), [command as Command]);
			})
		);

		return filtered.sort(sortCommandsAlphabetically);
	}
}
