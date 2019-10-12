import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand(
    "extension.commaEnter",
    () => {
      commaEnter();
    }
  );
  context.subscriptions.push(command);
}

export function deactivate() {}

function commaEnter() {
  const textEditor: any = vscode.window.activeTextEditor;
  const cursorPosition = textEditor.selection.active;
  const line = textEditor.document.lineAt(cursorPosition);
  const text = line.text;
  const beforeSpace = text.substring(0, text.indexOf(text.trim()));
  textEditor
    .edit((builder: any) => {
      if (line.text[line.text.length - 1] !== ",") {
        builder.insert(line.range.end, `,\n${beforeSpace}`);
      } else {
        builder.insert(line.range.end, `\n${beforeSpace}`);
      }
    })
    .then(
      () => {
        textEditor.selection = new vscode.Selection(
          line.lineNumber + 1,
          beforeSpace.length,
          line.lineNumber + 1,
          beforeSpace.length
        );
      },
      err => {
        throw err;
      }
    );
}
