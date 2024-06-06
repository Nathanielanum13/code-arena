import { WebView } from "@nativescript/core";

export class CustomWebChromeClient extends android.webkit.WebChromeClient {
    constructor(private webView: WebView) {
        super();
        return global.__native(this);
    }

    onPermissionRequest(request: android.webkit.PermissionRequest): void {
        // You can use this.webView.nativeView to access the native Android WebView
        const nativeWebView = this.webView.nativeView;

        console.log("===================================================")
        console.log("I am here at last")
        console.log("===================================================")

        // Your permission handling logic here

        // For example, granting the permission:
        request.grant(request.getResources());
    }
}

// Workaround for the 'global' issue in TypeScript
declare var global: any;
global.CustomWebChromeClient = CustomWebChromeClient;