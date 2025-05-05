import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import io from 'socket.io-client';

import {
  getToken,
  getDefaultChannelId,
  getCurrentChannelId,
} from '../store/selectors';
import { uiActions } from '../store/actions';
import { getChannels, getMessages } from '../store/asyncActions';

import ChannelsList from './СhannelsList.jsx';
import MessagesList from './MessagesList.jsx';

const Chat = () => {
  const dispatch = useDispatch();

  const token = useSelector(getToken);

  const currentChannelId = useSelector(getCurrentChannelId);
  const defaultChannelId = useSelector(getDefaultChannelId);

  useEffect(() => {
    const socket = io();

    socket.on('newMessage', () => {
      dispatch(getMessages(token));
    });

    socket.on('newChannel', () => {
      dispatch(getChannels(token));
    });

    socket.on('renameChannel', () => {
      dispatch(getChannels(token));
    });

    socket.on('removeChannel', ({ id }) => {
      if (currentChannelId === id) {
        dispatch(uiActions.setCurrentChannel({ id: defaultChannelId }));
      }

      dispatch(getChannels(token));
      dispatch(getMessages(token));
    });

    dispatch(getChannels(token));
    dispatch(getMessages(token));

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsList />
        <MessagesList />
      </div>
    </div>
  );
};

export default Chat;
