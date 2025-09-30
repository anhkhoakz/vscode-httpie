import { commands, type Terminal, window } from "vscode";

// Map to keep track of created terminals by name
const terminals = new Map<string, Terminal>();

/**
 * Runs a command in a named VS Code terminal, creating it if necessary.
 * @param command The command to run.
 * @param terminal The terminal name (default: "HTTPie").
 */
export function runInTerminal(command: string, terminal = "HTTPie"): void {
        const term = terminals.get(terminal) ?? window.createTerminal(terminal);
        if (!terminals.has(terminal)) {
                terminals.set(terminal, term);
        }
        term.show();
        term.sendText(command, true);
}

/**
 * Handles terminal close events by cleaning up the terminal map and focusing the editor.
 * @param closedTerminal The closed terminal instance.
 */
export function onDidCloseTerminal(closedTerminal: Terminal): void {
        terminals.delete(closedTerminal.name);
        commands.executeCommand("workbench.action.closeActiveEditor");
        commands.executeCommand("workbench.action.focusActiveEditorGroup");
}
