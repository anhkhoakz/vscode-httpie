import {
        commands,
        type DocumentSelector,
        type ExtensionContext,
        languages,
} from "vscode";
import { HttpCodeLensProvider } from "./codeLensProvider";
import { HttpieCompletion } from "./completionProvider";
import { RequestController } from "./requestController";

const requestController = new RequestController();

export function activate(context: ExtensionContext) {
        const selector: DocumentSelector = [{ pattern: "**/*.httpie" }];

        context.subscriptions.push(
                languages.registerCodeLensProvider(
                        selector,
                        new HttpCodeLensProvider(),
                ),
                languages.registerCompletionItemProvider(
                        selector,
                        new HttpieCompletion(),
                        "",
                ),
                commands.registerCommand(
                        "httpie-client.request",
                        (_document, range) => requestController.run(range),
                ),
        );
}

export function deactivate() {}
