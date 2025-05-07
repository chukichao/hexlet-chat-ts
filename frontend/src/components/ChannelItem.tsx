import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import { uiActions } from '../store/actions';

import useChannel from '../hooks/useChannel.js';
import { useAppDispatch } from '../hooks/useAppDispatch.js';

import type { IChannel } from '../types/channel.js';

interface ChannelItemProps {
  channel: IChannel;
}

const ChannelItem: React.FC<ChannelItemProps> = ({ channel }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentChannel = useChannel();
  const active = currentChannel?.id === channel.id;

  const handleRemove = (id: string) => {
    dispatch(uiActions.openModal({ type: 'removeChannel', extra: id }));
  };

  const handleRename = (id: string) => {
    dispatch(uiActions.openModal({ type: 'renameChannel', extra: id }));
  };

  const handleSwitchChannel = (id: string) => {
    dispatch(uiActions.setCurrentChannel({ id }));
  };

  if (channel.removable) {
    return (
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant=""
          className={`w-100 rounded-0 text-start text-truncate ${
            active ? 'btn-secondary' : ''
          }`}
          onClick={() => handleSwitchChannel(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>

        <Dropdown.Toggle
          split
          variant=""
          className={`flex-grow-0 ${active ? 'btn-secondary' : ''}`}
          id="react-aria4798576829-:r0:"
        >
          <span className="visually-hidden">{t('channels.menu')}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleRemove(channel.id)}>
            {t('channels.remove')}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleRename(channel.id)}>
            {t('channels.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <button
      type="button"
      className={`w-100 rounded-0 text-start btn ${
        active ? 'btn-secondary' : ''
      }`}
      onClick={() => handleSwitchChannel(channel.id)}
    >
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );
};

export default ChannelItem;
