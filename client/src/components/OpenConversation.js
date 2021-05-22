import React, { useCallback, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState();
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const { sendMessage, selectedConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((recipient) => recipient.id),
      text
    );
    setText("");
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div
          style={{ maxWidth: "fit-content", minWidth: "100%" }}
          className="d-flex flex-column align-items-start justify-content-end px-3"
        >
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = index === selectedConversation.messages.length - 1;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                style={{ maxWidth: "80%" }}
                className={`my-1 d-flex flex-column ${
                  message.fromMe ? "align-self-end align-items-end" : "align-items-start"
                }`}
              >
                <div
                  className={`text-wrap text-break rounded px-2 py-1 ${message.fromMe ? "bg-primary text-white" : "border"}`}
                >
                  {message.text}
                </div>
                <div className={`text-muted small ${message.fromMe ? "text-end" : ""}`}>
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <InputGroup.Append>
              <Button className="h-100" type="submit">
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
