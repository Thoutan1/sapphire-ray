import type { SlashCommandStore } from '../structs/slashCmd/SlashCommandStore';

declare module '@sapphire/framework' {
	interface StoreRegistryEntries {
		slashCommands: SlashCommandStore;
	}
}
