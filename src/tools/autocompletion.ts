import * as vscode from 'vscode';


export const TypesAutocomplete: vscode.CompletionItemProvider = {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
        const compItems: vscode.CompletionItem[] = [];

        // there is no autocompletion for these data types in zig extension (idk why lol)
        const dataTypes = [
            "i8",
            "i16",
            "i32",
            "i64",
            "i28",
            // uint
            "u8",
            "u16",
            "u32",
            "u64",
            "u128",
            // float
            "f16",
            "f32",
            "f64",
            "f80",
            "f128",
        ];

        dataTypes.forEach(dataType => {
            const item = new vscode.CompletionItem(dataType, vscode.CompletionItemKind.TypeParameter);
            compItems.push(item);
        });
        return compItems;
    }
};