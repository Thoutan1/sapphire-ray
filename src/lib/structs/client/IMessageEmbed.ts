import { MessageEmbed } from 'discord.js';
import { BotColor, BotFooter } from '../../../Config';

export class IMessageEmbed extends MessageEmbed {
	constructor() {
		super();
		this.setFooter(BotFooter);
		this.setTimestamp();
		this.setColor(BotColor);
	}
}
