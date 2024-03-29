import * as vscode from 'vscode';



export const BitwiseOperationHints: vscode.HoverProvider = {
    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
        const lineText = document.lineAt(position.line).text;

        const wordRange = document.getWordRangeAtPosition(position, /<<?|\||&|\^|>>/);
        if (!wordRange) {
            return;
        }
        const operator = document.getText(wordRange);

        const { firstNum, secondNum } = getNumbersAroundOperator(lineText, wordRange);

        if (!firstNum || !secondNum) {
            return;
        }

        const result = execute(operator, firstNum, secondNum);

        const mdStr = new vscode.MarkdownString();
        mdStr.appendCodeblock(`${firstNum} ${operator} ${secondNum}`);
        mdStr.appendMarkdown(`Result of bitwise operation: \`${result}\``);
        return new vscode.Hover(mdStr);
    },
};

function getNumbersAroundOperator(lineText: string, wordRange: vscode.Range): { firstNum: number | undefined, secondNum: number | undefined; } {
    const textBeforeOperator = lineText.substring(0, wordRange.start.character);
    const textAfterOperator = lineText.substring(wordRange.end.character);

    const firstNum = findFirstNum(textBeforeOperator);
    const secondNum = findSecondNum(textAfterOperator);

    return { firstNum, secondNum };
}

function findFirstNum(text: string): number | undefined {
    const matches = text.match(/\d+/g);
    if (matches && matches.length > 0) {
        return parseInt(matches[matches.length - 1]);
    }
    return undefined;
}

function findSecondNum(text: string): number | undefined {
    const matches = text.match(/\d+/);
    if (matches && matches.length > 0) {
        return parseInt(matches[0]);
    }
    return undefined;
}

function execute(operator: string, firstNum: number, secondNum: number): number {
    switch (operator) {
        case "&":
            return firstNum & secondNum;
        case "^":
            return firstNum ^ secondNum;
        case "|":
            return firstNum | secondNum;
        case ">>":
            return firstNum >> secondNum;
        case "<<":
            return firstNum << secondNum;
    }
    return 0;
}