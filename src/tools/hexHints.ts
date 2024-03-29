import * as vscode from 'vscode';



export const HexHints: vscode.HoverProvider = {
    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
        const range = document.getWordRangeAtPosition(position);
        const hexStr = document.getText(range);

        if (hexStr.startsWith("0x")) { // hex string
            if (Number.isNaN(Number(hexStr))) {
                return;
            }
            return new vscode.Hover(`${Number(hexStr)}`);
        }
    }
};