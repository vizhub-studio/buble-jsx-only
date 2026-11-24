import Node from '../Node.js';
import isReference from '../../utils/isReference.js';

export default class Identifier extends Node {
	findScope(functionScope) {
		if (this.parent.params && ~this.parent.params.indexOf(this)) {
			return this.parent.body.scope;
		}

		if (this.parent.type === 'FunctionExpression' && this === this.parent.id) {
			return this.parent.body.scope;
		}

		return this.parent.findScope(functionScope);
	}

	initialise() {
		if (this.isLabel()) {
			return;
		}

		if (isReference(this, this.parent)) {
			this.findScope(false).addReference(this);
		}
	}

	isLabel() {
		switch (this.parent.type) {
			case 'BreakStatement': return true;
			case 'ContinueStatement': return true;
			case 'LabeledStatement': return true;
			default: return false;
		}
	}

	transpile(code) {
		if (this.alias) {
			code.overwrite(this.start, this.end, this.alias, {
				storeName: true,
				contentOnly: true
			});
		}
	}
}
