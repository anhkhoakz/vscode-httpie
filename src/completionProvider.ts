import type {
        CancellationToken,
        CompletionContext,
        CompletionItem,
        CompletionItemProvider,
        CompletionList,
        Position,
        ProviderResult,
        TextDocument,
} from "vscode";
import { CompletionItemKind } from "vscode";

const keywords = ["GET", "POST", "DELETE", "PUT", "http"] as const;

const options = [
        "--json",
        "--form",
        "--pretty",
        "--style",
        "--print",
        "--headers",
        "--body",
        "--verbose",
        "--all",
        "--history-print",
        "--stream",
        "--output",
        "--download",
        "--session",
        "--session-read-only",
        "--auth",
        "--auth-type",
        "--proxy",
        "--follow",
        "--max-redirects",
        "--timeout",
        "--check-status",
        "--ssl",
        "--cert-key",
        "--ignore-stdin",
        "--help",
        "--version",
        "--traceback",
        "--default-scheme",
        "--debug",
] as const;

/**
 * Provides completion items for HTTPie commands and options.
 */
export class HttpieCompletion implements CompletionItemProvider {
        public provideCompletionItems(
                _document: TextDocument,
                _position: Position,
                _token: CancellationToken,
                _context: CompletionContext,
        ): ProviderResult<CompletionItem[] | CompletionList> {
                return [
                        ...options.map((label) => ({
                                label,
                                insertText: label,
                                kind: CompletionItemKind.Property,
                        })),
                        ...keywords.map((label) => ({
                                label,
                                insertText: label,
                                kind: CompletionItemKind.Keyword,
                        })),
                ];
        }

        public resolveCompletionItem?(
                item: CompletionItem,
                _token: CancellationToken,
        ): ProviderResult<CompletionItem> {
                if (
                        typeof item.insertText === "string" &&
                        item.insertText.startsWith("--")
                ) {
                        return {
                                ...item,
                                insertText: item.insertText.slice(2),
                        };
                }
                return item;
        }
}
