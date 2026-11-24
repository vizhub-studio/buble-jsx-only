import Node from '../Node.js';

const nonAsciiLsOrPs = /[\u2028-\u2029]/g;

export default class Literal extends Node {
	initialise() {
		if (typeof this.value === 'string') {
			this.program.indentExclusionElements.push(this);
		}
	}

	transpile(code) {

		if (!this.regex && typeof this.value === "string" && this.value.match(nonAsciiLsOrPs)) {
			code.overwrite(
				this.start,
				this.end,
				this.raw.replace(nonAsciiLsOrPs, m => m == '\u2028' ? '\\u2028' : '\\u2029'),
				{
					contentOnly: true
				}
			);
		}
	}
}
