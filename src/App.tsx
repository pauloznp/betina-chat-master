import { useState } from "react";
import {
  CometChatMessageComposer,
  CometChatMessageHeader,
  CometChatMessageList,
} from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatSelector } from "./CometChatSelector/CometChatSelector";
import "@cometchat/chat-uikit-react/css-variables.css";
import "./App.css";

function App() {
  // State to track the currently selected user
  const [selectedUser, setSelectedUser] = useState<CometChat.User | undefined>(
    undefined
  );

  // State to track the currently selected group
  const [selectedGroup, setSelectedGroup] = useState<
    CometChat.Group | undefined
  >(undefined);

  return (
    <div className="conversations-with-messages">
      {/* Sidebar for selecting conversations */}
      <div className="conversations-wrapper">
        <CometChatSelector
          onSelectorItemClicked={(activeItem) => {
            let item = activeItem;

            // If the selected item is a conversation, extract the user/group from it
            if (activeItem instanceof CometChat.Conversation) {
              item = activeItem.getConversationWith();
            }

            // Determine if the selected item is a User or a Group and update the state accordingly
            if (item instanceof CometChat.User) {
              setSelectedUser(item as CometChat.User);
              setSelectedGroup(undefined); // Ensure no group is selected
            } else if (item instanceof CometChat.Group) {
              setSelectedUser(undefined); // Ensure no user is selected
              setSelectedGroup(item as CometChat.Group);
            } else {
              setSelectedUser(undefined);
              setSelectedGroup(undefined); // Reset if selection is invalid
            }
          }}
        />
      </div>

      {/* If a user or group is selected, display the chat interface */}
      {selectedUser || selectedGroup ? (
        <div className="messages-wrapper">
          {/* Header displaying user/group details */}
          <CometChatMessageHeader user={selectedUser} group={selectedGroup} />

          {/* List of messages for the selected user/group */}
          <CometChatMessageList user={selectedUser} group={selectedGroup} />

          {/* Message input composer */}
          <CometChatMessageComposer user={selectedUser} group={selectedGroup} />
        </div>
      ) : (
        // Default message when no conversation is selected
        <div className="empty-conversation">Select Conversation to start</div>
      )}
    </div>
  );
}

export default App;
