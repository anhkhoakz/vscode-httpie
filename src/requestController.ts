import { type Range, window } from "vscode";
import { Selector } from "./selector";
import { runInTerminal } from "./terminalExecutor";

/**
 * Controls the execution of HTTP requests from the editor.
 */
export class RequestController {
	private readonly selector = new Selector();

	/**
	 * Runs the HTTP request found in the given range or selection.
	 * @param range The range to extract the request from.
	 */
	public async run(range: Range) {
		const editor = window.activeTextEditor;
		if (!editor?.document) return;

		const selectedText = this.selector.getSelectedText(editor, range);
		if (!selectedText) return;

		const commandString = selectedText.replace(/\r?\n/g, " ");
		runInTerminal(commandString);
	}
}
