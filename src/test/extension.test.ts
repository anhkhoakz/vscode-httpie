import * as assert from "node:assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";

// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
        vscode.window.showInformationMessage("Start all tests.");

        test("Sample test", () => {
                assert.strictEqual(-1, [1, 2, 3].indexOf(5));
                assert.strictEqual(-1, [1, 2, 3].indexOf(0));
        });

        test("Extension should be present and activate", async () => {
                const ext = vscode.extensions.getExtension("httpie-client");
                assert.ok(ext, "Extension not found");
                await ext?.activate();
                assert.ok(ext.isActive, "Extension did not activate");
        });

        test("Command 'httpie-client.request' should be registered", async () => {
                const commands = await vscode.commands.getCommands(true);
                assert.ok(
                        commands.includes("httpie-client.request"),
                        "Command not registered",
                );
        });
});
