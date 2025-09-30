import { EOL } from "node:os";
import type { Range, TextEditor } from "vscode";

const CommentIdentifiersRegex: RegExp = /^\s*(#|\/\/)/;
const VariableDefinitionRegex: RegExp = /^\s*@([^\s=]+)\s*=\s*(.+)\s*$/;

/**
 * Selector class for extracting HTTP request blocks from text.
 *
 * @export
 * @class Selector
 * @typedef {Selector}
 */
export class Selector {
        private static readonly responseStatusLineRegex = /^\s*HTTP\/[\d.]+/;

        /**
         * Gets the selected text or the current HTTP request block from the editor.
         */
        public getSelectedText(
                editor: TextEditor,
                range?: Range,
        ): string | null {
                if (!editor?.document) {
                        return null;
                }

                if (!editor.selection.isEmpty) {
                        return editor.document.getText(editor.selection);
                }

                const activeLine =
                        range?.start.line ?? editor.selection.active.line;
                return this.getDelimitedText(
                        editor.document.getText(),
                        activeLine,
                );
        }

        /**
         * Returns the line numbers that are considered delimiters (e.g., lines with only //).
         */
        public static getDelimiterRows(lines: string[]): number[] {
                return lines.reduce((rows: number[], line, idx) => {
                        if (/^\/{2,}/.test(line)) {
                                rows.push(idx);
                        }
                        return rows;
                }, []);
        }

        public static isCommentLine(line: string): boolean {
                return CommentIdentifiersRegex.test(line);
        }

        public static isEmptyLine(line: string): boolean {
                return line.trim() === "";
        }

        public static isVariableDefinitionLine(line: string): boolean {
                return VariableDefinitionRegex.test(line);
        }

        public static isResponseStatusLine(line: string): boolean {
                return Selector.responseStatusLineRegex.test(line);
        }

        /**
         * Extracts the HTTP request block delimited by // from the full text, based on the current line.
         */
        private getDelimitedText(
                fullText: string,
                currentLine: number,
        ): string | null {
                const lines = fullText.split(/\r?\n/g);
                const delimiterLineNumbers = Selector.getDelimiterRows(lines);
                if (!delimiterLineNumbers.length) {
                        return fullText;
                }
                if (delimiterLineNumbers.includes(currentLine)) {
                        return null;
                }

                if (currentLine < delimiterLineNumbers[0]) {
                        return lines
                                .slice(0, delimiterLineNumbers[0])
                                .join(EOL);
                }

                if (currentLine > (delimiterLineNumbers.at(-1) ?? -1)) {
                        const lastDelimiter = delimiterLineNumbers.at(-1) ?? -1;
                        return lines.slice(lastDelimiter + 1).join(EOL);
                }

                for (let i = 0; i < delimiterLineNumbers.length - 1; i++) {
                        const start = delimiterLineNumbers[i];
                        const end = delimiterLineNumbers[i + 1];
                        if (start < currentLine && currentLine < end) {
                                return lines.slice(start + 1, end).join(EOL);
                        }
                }
                return null;
        }
}
