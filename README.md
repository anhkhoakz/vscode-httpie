<div style="text-align: center">

<p><img src="assets/icon.png" width="200" alt="Project Icon"></p>

# vscode-httpie-client

## HTTPie for Visual Studio Code

[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/anhkhoakz/vscode-httpie-client?label=Open%20VSX%20Downloads&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSI0LjYgNSA5Ni4yIDEyMi43IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik0zMCA0NC4yTDUyLjYgNUg3LjN6TTQuNiA4OC41aDQ1LjNMMjcuMiA0OS40em01MSAwbDIyLjYgMzkuMiAyMi42LTM5LjJ6IiBmaWxsPSIjYzE2MGVmIi8+CiAgPHBhdGggZD0iTTUyLjYgNUwzMCA0NC4yaDQ1LjJ6TTI3LjIgNDkuNGwyMi43IDM5LjEgMjIuNi0zOS4xem01MSAwTDU1LjYgODguNWg0NS4yeiIgZmlsbD0iI2E2MGVlNSIvPgo8L3N2Zz4=&labelColor=374151&color=60a5fa&style=for-the-badge)](http://open-vsx.org/extension/anhkhoakz/vscode-httpie-client)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/anhkhoakz.vscode-httpie-client?style=for-the-badge)](https://marketplace.visualstudio.com/items/?itemName=anhkhoakz.vscode-httpie-client)
</div>

## Installation

1. Install [HTTPie](https://httpie.org) client
2. Install extension [VS Code HTTPie](https://marketplace.visualstudio.com/items?itemName=anhkhoakz.vscode-httpie-client) from the marketplace

## Usage

1. Create a file anywhere ending in `.httpie`, such as `Request.httpie`
2. Add HTTPie commands to it:

   ```javascript
   http -v PUT httpbin.org/put API-Key:foo hello=world

   // Separate commands with commented lines (//)
   http DELETE example.org/todos/7

   // Request a Google search
   http www.google.com search=='HTTPie logo' tbm==isch

   // Use multiple lines for a single command
   http www.google.com
       search=='HTTPie logo'
       tbm==isch
   ```

3. Click the `Send request` button that appears above each command in the file, and the command will execute in the Terminal.

## Features

- Syntax highlighting for `.httpie` files
- CodeLens "Send request" button above each HTTPie command block
- Completion for HTTP methods and HTTPie options
- Multi-line and multi-request support in a single file
- Runs HTTPie commands directly in the VS Code terminal

## Requirements

- [HTTPie](https://httpie.org) must be installed and available in your system PATH

## Extension Settings

This extension does not contribute any settings at this time.

## Known Issues

- Only supports `.httpie` files
- Requests are executed in the integrated terminal; output is not captured in the editor

## Release Notes

Please see the [CHANGELOG](CHANGELOG.md) for details on the most recent changes.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
