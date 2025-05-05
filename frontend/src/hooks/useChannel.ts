import { useSelector } from 'react-redux';
import { getChannels, getCurrentChannelId } from '../store/selectors';

const useChannel = () => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const channels = useSelector(getChannels);

  const currentChannel = channels[currentChannelId];

  return currentChannel;
};

export default useChannel;
