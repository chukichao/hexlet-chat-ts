import { useState } from "react";

import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";

import { getModal, getToken } from "../store/selectors";

import { uiActions } from "../store/actions";
import { removeChannel } from "../store/asyncActions";

import { useAppDispatch } from "../hooks/useAppDispatch.js";
import { useAppSelector } from "../hooks/useAppSelector.js";

const ModalRemoveChannel: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const getNotificationStatusOperation = () =>
    toast.success(t("channels.removed"));

  const [disabledButton, setDisabledButton] = useState(false);

  const token = useAppSelector(getToken);
  const channelId = useAppSelector(getModal).extra;

  const handleCloseModal = () => {
    dispatch(uiActions.closeModal());
  };

  const handleSubmit = () => {
    setDisabledButton(true);

    if (token && channelId) {
      dispatch(removeChannel({ token, channelId }));
    }

    handleCloseModal();
    getNotificationStatusOperation();
  };

  return (
    <>
      <p className="lead">{t("modals.confirmation")}</p>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={handleCloseModal} className="me-2">
          {t("modals.cancel")}
        </Button>
        <Button
          variant="danger"
          onClick={handleSubmit}
          disabled={disabledButton}
        >
          {t("modals.confirm")}
        </Button>
      </div>
    </>
  );
};

export default ModalRemoveChannel;
