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
		if (!editor?.document) {
			return;
		}

		const selectedText = this.selector.getSelectedText(editor, range);
		if (!selectedText) {
			return;
		}

		const trimmed = selectedText.trim();
		const methodUrlRegex =
			/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\s+https?:\/\/.+/i;
		let commandString = trimmed.replace(/\r?\n/g, " ");
		if (methodUrlRegex.test(commandString)) {
			commandString = `http ${commandString}`;
		}
		runInTerminal(commandString);
	}
}
