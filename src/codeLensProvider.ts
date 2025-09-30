import {
        type CancellationToken,
        CodeLens,
        type CodeLensProvider,
        Range,
        type TextDocument,
} from "vscode";
import { Selector } from "./selector";

/**
 * Provides code lenses for sending HTTP requests in .httpie files.
 */
export class HttpCodeLensProvider implements CodeLensProvider {
        public provideCodeLenses(
                document: TextDocument,
                _token: CancellationToken,
        ): Promise<CodeLens[]> {
                const lines = document.getText().split(/\r?\n/g);
                const delimitedLines = Selector.getDelimiterRows(lines);
                delimitedLines.push(lines.length);

                const blocks: CodeLens[] = [];
                let start = 0;
                for (const end of delimitedLines) {
                        const blockEnd = end - 1;
                        if (start > blockEnd) {
                                start = end + 1;
                                continue;
                        }

                        let blockStart = start;
                        while (
                                blockStart <= blockEnd &&
                                (Selector.isEmptyLine(lines[blockStart]) ||
                                        Selector.isCommentLine(
                                                lines[blockStart],
                                        ) ||
                                        Selector.isVariableDefinitionLine(
                                                lines[blockStart],
                                        ))
                        ) {
                                blockStart++;
                        }

                        if (
                                blockStart > blockEnd ||
                                Selector.isResponseStatusLine(lines[blockStart])
                        ) {
                                start = end + 1;
                                continue;
                        }

                        const range = new Range(blockStart, 0, blockEnd, 0);
                        blocks.push(
                                new CodeLens(range, {
                                        arguments: [document, range],
                                        title: "⚡ Send Request",
                                        command: "httpie-client.request",
                                }),
                        );
                        start = end + 1;
                }

                return Promise.resolve(blocks);
        }
}
