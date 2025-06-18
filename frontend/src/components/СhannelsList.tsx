import { useTranslation } from "react-i18next";

import { PlusSquare } from "react-bootstrap-icons";

import { getChannels } from "../store/selectors";
import { uiActions } from "../store/actions";

import { useAppDispatch } from "../hooks/useAppDispatch.js";
import { useAppSelector } from "../hooks/useAppSelector.js";

import ChannelItem from "./ChannelItem.jsx";

const ChannelsList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const channels = Object.values(useAppSelector(getChannels));

  const handleAddChannel = () => {
    dispatch(uiActions.openModal({ type: "addChannel" }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t("channels.channels")}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleAddChannel}
        >
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <ChannelItem channel={channel} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsList;
