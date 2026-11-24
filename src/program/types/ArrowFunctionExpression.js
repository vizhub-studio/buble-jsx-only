import Node from '../Node.js';

export default class ArrowFunctionExpression extends Node {
	initialise(transforms) {
		this.body.createScope();
		super.initialise(transforms);
	}

	transpile(code, transforms) {
		super.transpile(code, transforms);
	}

	// Returns whether any transforms that will happen use `arguments`
	needsArguments() {
		return false;
	}
}
