import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getMessages } from '../store/selectors';

import useChannel from '../hooks/useChannel';

import FormAddMessage from './FormAddMessage.jsx';

const MessagesList = () => {
  const { t } = useTranslation();

  const currentChannel = useChannel();
  const messagesChannel = Object.values(useSelector(getMessages)).filter(
    (message) => message.channelId === currentChannel?.id,
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel?.name}`}</b>
          </p>
          <span className="text-muted">
            {t('chat.messageCount', { count: messagesChannel.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesChannel.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>
              {': '}
              {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <FormAddMessage />
        </div>
      </div>
    </div>
  );
};

export default MessagesList;
