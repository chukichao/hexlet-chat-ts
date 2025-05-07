export interface IMessage {
  body: string;
  channelId: string;
  username: string;
  removable: boolean;
  id: string;
}

export interface IAddMessage {
  token: string;
  newMessage: { body: string; channelId: string; username: string };
}
