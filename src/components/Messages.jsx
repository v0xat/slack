import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import MessageForm from './MessageForm.jsx';

const Messages = () => {
  const { messages } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);

  const renderMessages = () => messages
    .filter(({ channelId }) => channelId === currentChannelId)
    .map(({ id, text, username }) => (
      <div className="text-break mb-2" key={id}>
        <b>{username}</b>
        {`: ${text}`}
      </div>
    ));

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelId}`}</b>
          </p>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {renderMessages()}
        </div>
        <MessageForm />
      </div>
    </Col>
  );
};

export default Messages;
