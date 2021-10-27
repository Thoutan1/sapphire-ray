import { ListenerOptions, PieceContext, Events } from '@sapphire/framework';
import { Listener, Store } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { blue, gray, green, magenta, magentaBright, white, yellow } from 'colorette';
const dev = process.env.NODE_ENV !== 'br';

@ApplyOptions<ListenerOptions>({
	once: true,
	event: Events.ClientReady
})
export class ReadyListener extends Listener {
	private readonly style = dev ? magenta : blue;

	public constructor(context: PieceContext, options?: ListenerOptions) {
		super(context, {
			...options,
			once: true
		});
	}

	public run() {
		this.container.client.user?.setActivity({
			name: 'Anjay Mabar',
			type: 'COMPETING'
		});
		this.createSlashCommands();
		this.printBanner();
		this.printStoreDebugInformation();
	}
	async createSlashCommands() {
		// this function will tell the SlashCommandStore to update the global and guild commands
		const slashCommandsStore = this.container.stores.get('slashCommands');

		if (slashCommandsStore) {
			try {
				this.container.logger.info('Started refreshing application (/) commands.');
				await slashCommandsStore.registerCommands();
				this.container.logger.info('Reloading (/) Command Application');
			} catch (err: any) {
				console.log(err);
			}
		}
	}
	private printBanner() {
		const success = green('+');
		const info = yellow('!');

		const llc = dev ? magentaBright : white;
		const blc = dev ? magenta : blue;

		const line01 = llc('');
		const line02 = llc('');
		const line03 = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line01} ${pad}[${info}]${blc('1.0.0')}
${line02} ${pad}[${success}] Gateway
${line03} ${pad} ${pad} ${pad} ${pad}   ${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${blc('DEVELOPMENT MODE')}` : ''}
		`.trim()
		);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: Store<any>, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}
