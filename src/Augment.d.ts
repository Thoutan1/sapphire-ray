import type { SlashCommandStore } from './lib/structs/slashCmd/SlashCommandStore';

declare module '@sapphire/framework' {
	interface StoreRegistryEntries {
		slashCommands: SlashCommandStore;
	}
}
