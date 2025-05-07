export interface IChannel {
  id: string;
  name: string;
  removable: boolean;
}

export interface IAddChannel {
  token: string;
  newChannel: { name: string };
}

export interface IRemoveChannel {
  token: string;
  channelId: string;
}

export interface IEditChannel {
  token: string;
  channelId: string;
  editedChannel: { name: string };
}
