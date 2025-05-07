import { getChannels, getCurrentChannelId } from '../store/selectors';
import { useAppSelector } from './useAppSelector';

const useChannel = () => {
  const currentChannelId = useAppSelector(getCurrentChannelId);
  const channels = useAppSelector(getChannels);

  const currentChannel = channels[currentChannelId];

  return currentChannel;
};

export default useChannel;
