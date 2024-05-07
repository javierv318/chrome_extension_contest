manifest_version: Specifies the version of the manifest file format (in this case, version ).
name and version: Provide basic metadata about the extension.
description: Short description of the extension.
icons: Specifies the icons for the extension in different sizes (16x16, 48x48, and 128x128 pixels).
browser_action: Specifies the browser action (i.e., the button that appears in the toolbar). In this case, it points to a popup HTML file (popup.html) and uses the 48x48 icon.
permissions: Specifies the permissions required by the extension. In this case, it only needs access to the active tab.
content_scripts: Specifies a content script that will be injected into web pages. In this case, it injects a JavaScript file (contentScript.js).