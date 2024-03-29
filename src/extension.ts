// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TypesAutocomplete } from './tools/autocompletion';
import { BitwiseOperationHints } from './tools/bitwiseOpHint';
import { HexHints } from './tools/hexHints';
import { TypeHints } from './tools/typeHints';

const enum Config {
	TypeHints = "zig-tools.type hints",
	TypeAutocompletion = "zig-tools.type autocompletion",
	BitwiseOPHints = "zig-tools.bitwise operation hints",
	HexHints = "zig-tools.hex hints",
}

let hoverProviders: vscode.Disposable[] = [];
let disposable: vscode.Disposable | undefined;


export function activate(context: vscode.ExtensionContext) {
	initExtensions();
	vscode.workspace.onDidChangeConfiguration(initExtensions);


	if (disposable) {
		context.subscriptions.push(disposable);
	}

}

function initExtensions() {
	const isThEnabled = <boolean>vscode.workspace.getConfiguration().get(Config.TypeHints);
	const isDtAutocompletionEnabled = <boolean>vscode.workspace.getConfiguration().get(Config.TypeAutocompletion);
	const isBitwiseOPHintsEnabled = <boolean>vscode.workspace.getConfiguration().get(Config.BitwiseOPHints);
	const isHexHintsEnabeld = <boolean>vscode.workspace.getConfiguration().get(Config.HexHints);


	hoverProviders.forEach(provider => provider.dispose());
	hoverProviders = [];


	if (isHexHintsEnabeld) {
		hoverProviders.push(
			vscode.languages.registerHoverProvider({ language: "zig" }, HexHints)
		);
	}

	if (isBitwiseOPHintsEnabled) {
		hoverProviders.push(
			vscode.languages.registerHoverProvider({ language: "zig" }, BitwiseOperationHints)
		);
	}

	if (isThEnabled) {
		hoverProviders.push(
			vscode.languages.registerHoverProvider({ language: "zig" }, TypeHints)
		);
	}

	if (isDtAutocompletionEnabled) {
		hoverProviders.push(
			vscode.languages.registerCompletionItemProvider({ language: "zig" }, TypesAutocomplete)
		);
	}

	disposable = vscode.Disposable.from(...hoverProviders);
}