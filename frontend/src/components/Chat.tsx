import { useEffect } from "react";

import io from "socket.io-client";

import {
  getToken,
  getDefaultChannelId,
  getCurrentChannelId,
} from "../store/selectors";
import { uiActions } from "../store/actions";
import { getChannels, getMessages } from "../store/asyncActions";

import { useAppDispatch } from "../hooks/useAppDispatch.js";
import { useAppSelector } from "../hooks/useAppSelector.js";

import ChannelsList from "./СhannelsList.jsx";
import MessagesList from "./MessagesList.jsx";

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector(getToken);

  const currentChannelId = useAppSelector(getCurrentChannelId);
  const defaultChannelId = useAppSelector(getDefaultChannelId);

  useEffect(() => {
    const socket = io();

    if (token) {
      socket.on("newMessage", () => {
        dispatch(getMessages(token));
      });

      socket.on("newChannel", () => {
        dispatch(getChannels(token));
      });

      socket.on("renameChannel", () => {
        dispatch(getChannels(token));
      });

      socket.on("removeChannel", ({ id }) => {
        if (currentChannelId === id) {
          dispatch(uiActions.setCurrentChannel({ id: defaultChannelId }));
        }

        dispatch(getChannels(token));
        dispatch(getMessages(token));
      });

      dispatch(getChannels(token));
      dispatch(getMessages(token));
    }

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
