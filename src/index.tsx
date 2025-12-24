import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

import {
  CometChatUIKit,
  UIKitSettingsBuilder,
} from "@cometchat/chat-uikit-react";

////////////////////////////////////////////////////////////////////
/**
 * CometChat Constants - Replace with your actual credentials
 */
const COMETCHAT_CONSTANTS = {
  APP_ID: "1673504f4f6b26a10", // Replace with your actual App ID from CometChat
  REGION: "us", // Replace with your App's Region
  AUTH_KEY: "776660e16f288b01b1019c09f2d3eec65a31484e", // Replace with your Auth Key (leave blank if using Auth Token)
};

const UID = "01"; // Replace with your actual UID
////////////////////////////////////////////////////////////////////

function initializeCometChat() {
  /**
   * Configure the CometChat UI Kit using the UIKitSettingsBuilder.
   */
  const UIKitSettings = new UIKitSettingsBuilder()
    .setAppId(COMETCHAT_CONSTANTS.APP_ID)
    .setRegion(COMETCHAT_CONSTANTS.REGION)
    .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
    .subscribePresenceForAllUsers()
    .build();

  /**
   * Initialize CometChat UI Kit
   */
  CometChatUIKit.init(UIKitSettings)
    .then(() => {
      console.log("CometChat UI Kit initialized successfully.");

      CometChatUIKit.getLoggedinUser().then((user: CometChat.User | null) => {
        if (!user) {
          // If no user is logged in, proceed with login
          CometChatUIKit.login(UID)
            .then((user: CometChat.User) => {
              console.log("Login Successful:", { user });

              root.render(
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              );
            })
            .catch(console.log);
        } else {
          // If user is already logged in, mount the app
          root.render(
            <React.StrictMode>
              <App />
            </React.StrictMode>
          );
        }
      });
    })
    .catch((error) => {
      console.error("CometChat UI Kit initialization failed:", error);
    });
}

/**
 * NOTE: Below code is specific to codesandbox and not necessary to be include in your app.
 * However, you need to initializeCometChat()
 */

/**
 * Check if credentials are set to default values
 */
const isDefaultCredentials =
  COMETCHAT_CONSTANTS.APP_ID === "APP_ID" ||
  COMETCHAT_CONSTANTS.REGION === "REGION" ||
  COMETCHAT_CONSTANTS.AUTH_KEY === "AUTH_KEY";

/**
 * ErrorMessage Component - Displays a warning message if credentials are not set
 */
const ErrorMessage = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      fontSize: "18px",
      color: "#000",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      backgroundColor: "#fff",
    }}
  >
    <div style={{ maxWidth: "600px" }}>
      <h2 style={{ color: "black", marginBottom: "10px" }}>Try Live Demo</h2>
      <p style={{ marginBottom: "20px", color: "#333" }}>
        Follow these steps to test the <strong>CometChat UI Kit</strong> in a
        live sandbox environment:
      </p>

      <ol style={{ textAlign: "left", margin: "0 auto", paddingLeft: "20px" }}>
        <li style={{ marginBottom: "10px" }}>Fork the Sandbox.</li>

        <li style={{ marginBottom: "10px" }}>
          Navigate to the file <code>index.tsx</code> inside the project.
        </li>

        <li style={{ marginBottom: "10px" }}>
          Add your <strong>App ID, Region, Auth Key</strong>, etc., inside{" "}
          <code>index.tsx</code>.
        </li>

        <li>
          Save your changes and see how the UI and messages respond instantly.
        </li>
      </ol>
    </div>
  </div>
);

if (isDefaultCredentials) {
  // Render the error message instead of initializing CometChat
  root.render(<ErrorMessage />);
} else {
  initializeCometChat();
}
