import { ApplyOptions } from '@sapphire/decorators';
import { RayCommand } from '../../lib/structs/client/RayCommand';
import type { Message } from 'discord.js';
import { ISelectMenuDefault } from '../../lib/structs/client/ISelectMenuDefaultManager';
import { IMessageEmbed } from '../../lib/structs/client/IMessageEmbed';

@ApplyOptions<RayCommand.Options>({
	name: 'testmenu',
	description: 'A basic command'
})
export class UserCommand extends RayCommand {
	public async messageRun(message: Message) {
		await message.delete();

		const SelectMenuManager = new ISelectMenuDefault(this.container.client);

		const geoRole = SelectMenuManager.createRole({
			label: 'GEO',
			description: 'memek',
			emoji: '<:Element_Hydro:763984820342095882> '
		});
		const hydroRole = SelectMenuManager.createRole({
			label: 'HYDRO',
			description: 'kontol',
			emoji: '<:Element_Geo:763984820052819978>'
		});

		return SelectMenuManager.createMenus({
			role: [geoRole, hydroRole],
			content: new IMessageEmbed().setDescription('Test Embed for Select Menus!'),
			channelId: message.channel.id,
			type: 'SINGLE'
		});
	}
}
