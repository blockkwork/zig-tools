import * as vscode from 'vscode';



export const TypeHints: vscode.HoverProvider = {
    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
        const range = document.getWordRangeAtPosition(position);
        const datatype = document.getText(range);
        const curLine = document.lineAt(position.line).text;

        if (['i8', 'i16', 'i32', 'i64', 'i128', 'u8', 'u16', 'u32', 'u64', 'u128', 'isize', 'usize', 'comptime_int', 'comptime_float'].includes(datatype)) {
            const mdStr = new vscode.MarkdownString();
            mdStr.appendCodeblock(curLine.trimStart(), 'zig');

            switch (datatype) {
                // int
                case "i8":
                    mdStr.appendText(`${datatype} is the set of all signed 8-bit integers.\nRange: -128 through 127.`);
                    return new vscode.Hover(mdStr);
                case "i16":
                    mdStr.appendText(`${datatype} is the set of all signed 16 - bit integers.\nRange: -32,768 through 32,767.`);
                    return new vscode.Hover(mdStr);
                case "i32":
                    mdStr.appendText(`${datatype} is the set of all signed 32-bit integers.\nRange: -2,147,483,648 through 2,147,483,647.`);
                    return new vscode.Hover(mdStr);
                case "i64":
                    mdStr.appendText(`${datatype} is the set of all signed 64-bit integers.\nRange: -9,223,372,036,854,775,808 through 9,223,372,036,854,775,807.`);
                    return new vscode.Hover(mdStr);
                case "i128":
                    mdStr.appendText(`${datatype} is the set of all signed 128-bit integers.\nRange: -170,141,183,460,469,231,731,687,303,715,884,105,728 through 170,141,183,460,469,231,731,687,303,715,884,105,727.`);
                    return new vscode.Hover(mdStr);
                // uint
                case 'u8':
                    mdStr.appendText(`${datatype} is the set of all unsigned 8-bit integers.\nRange: 0 through 255.`);
                    return new vscode.Hover(mdStr);
                case 'u16':
                    mdStr.appendText(`${datatype} is the set of all unsigned 16-bit integers.\nRange: 0 through 65,535.`);
                    return new vscode.Hover(mdStr);
                case 'u32':
                    mdStr.appendText(`${datatype} is the set of all unsigned 32-bit integers.\nRange: 0 through 4,294,967,295.`);
                    return new vscode.Hover(mdStr);
                case 'u64':
                    mdStr.appendText(`${datatype} is the set of all unsigned 64-bit integers.\nRange: 0 through 18,446,744,073,709,551,615.`);
                    return new vscode.Hover(mdStr);
                case 'u64':
                    mdStr.appendText(`${datatype} is the set of all unsigned 64-bit integers.\nRange: 0 through 18,446,744,073,709,551,615.`);
                    return new vscode.Hover(mdStr);
                case 'u128':
                    mdStr.appendText(`${datatype} is the set of all unsigned 128-bit integers.\nRange: 0 through 340,282,366,920,938,463,463,374,607,431,768,211,455.`);
                    return new vscode.Hover(mdStr);
                // other
                case 'isize':
                    mdStr.appendText(`${datatype} is the signed pointer sized integer.\nC Equivalent: intptr_t.`);
                    return new vscode.Hover(mdStr);
                case 'usize':
                    mdStr.appendMarkdown(`${datatype} is the unsigned pointer sized integer. Also see [#5185](https://github.com/ziglang/zig/issues/5185).\n\nC Equivalent: uintptr_t, size_t.`);
                    return new vscode.Hover(mdStr);
                case "comptime_int":
                    mdStr.appendMarkdown(`${datatype} only allowed for [comptime](https://ziglang.org/documentation/master/#comptime)-known values.\n\nThe type of integer literals.`);
                    return new vscode.Hover(mdStr);
                case "comptime_float":
                    mdStr.appendMarkdown(`${datatype} only allowed for [comptime](https://ziglang.org/documentation/master/#comptime)-known values.\n\nThe type of float literals.`);
                    return new vscode.Hover(mdStr);
            }
        }
        return null;
    }
};