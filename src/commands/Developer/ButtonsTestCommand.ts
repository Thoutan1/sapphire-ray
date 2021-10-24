import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { IButton } from '../../lib/structs/client/IButtonManager';
import { IMessageEmbed } from '../../lib/structs/client/IMessageEmbed';
import { formatMS } from '../../lib/utils/Formatter';

@ApplyOptions<CommandOptions>({
	name: 'buttontest',
	description: 'A basic command'
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		await message.delete();

		const ButtonsManager = new IButton(this.container.client);

		const geoRole = ButtonsManager.createCompo({
			color: 'SECONDARY',
			label: 'GEO',
			role: '839758471594246154',
			emoji: '<:Element_Hydro:763984820342095882> '
		});
		const hydroRole = ButtonsManager.createCompo({
			color: 'SECONDARY',
			label: 'HYDRO',
			role: '839758453500280832',
			emoji: '<:Element_Geo:763984820052819978>'
		});

		return ButtonsManager.createButtonsComponent({
			role: [geoRole, hydroRole],
			content: new IMessageEmbed().setDescription(`Test Embed for Buttons! ${formatMS(this.container.client.uptime!)}`),
			channelId: message.channel.id
		});
	}
}
