/**
 *
 * @param txt paramter of text to convert mock
 * @returns
 */
export function generateMock(txt: string) {
	var makeUpper = true;
	var chars = txt.toLowerCase().split('');
	var punc = [' ', "'", ',', '.'];
	for (var i = 0; i < chars.length; i++) {
		if (punc.includes(chars[i])) {
			continue;
		} else if (makeUpper) {
			chars[i] = chars[i].toUpperCase();
		}

		makeUpper = !makeUpper;
	}
	return chars.join('');
}
