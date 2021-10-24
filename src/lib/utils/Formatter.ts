import prettyMilliseconds from 'pretty-ms';

export function bytesToSize(bytes: number): string {
	if (isNaN(bytes) && bytes !== 0) throw new Error(`[bytesToSize] (bytes) Error: bytes is not a Number/Integer, received: ${typeof bytes}`);
	const sizes: string[] = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
	if (bytes < 2 && bytes > 0) return `${bytes} Byte`;
	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
	if (i === 0) return `${bytes} ${sizes[i]}`;
	if (!sizes[i]) return `${bytes} ${sizes[sizes.length - 1]}`;
	return `${Number(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

export function formatMS(ms: number): string {
	if (isNaN(ms)) throw new Error('value is not a number.');
	return prettyMilliseconds(ms, {
		verbose: true,
		compact: false,
		secondsDecimalDigits: 0
	});
}
