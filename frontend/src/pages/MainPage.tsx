import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ToastContainer, Bounce } from 'react-toastify';

import Header from '../components/Header.jsx';
import ModalUI from '../components/UI/Modal.jsx';

import ModalAddChannel from '../components/ModalAddChannel.jsx';
import ModalRemoveChannel from '../components/ModalRemoveChannel.jsx';
import ModalRenameChannel from '../components/ModalRenameChannel.jsx';

import { getModal } from '../store/selectors';

import { useAppSelector } from '../hooks/useAppSelector.js';

import type { JSX } from 'react';

const MainPage: React.FC = () => {
  const { t } = useTranslation();

  const modal = useAppSelector(getModal);

  interface ITitleModal {
    [title: string]: string;
  }

  const titleModal: ITitleModal = {
    addChannel: t('modals.add'),
    removeChannel: t('modals.remove'),
    renameChannel: t('modals.rename'),
  };

  interface IBodyModal {
    [title: string]: JSX.Element;
  }

  const bodyModal: IBodyModal = {
    addChannel: <ModalAddChannel />,
    removeChannel: <ModalRemoveChannel />,
    renameChannel: <ModalRenameChannel />,
  };

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />
        <Outlet />
        {modal.isOpened && modal.type !== null && (
          <ModalUI title={titleModal[modal.type]}>
            {bodyModal[modal.type]}
          </ModalUI>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default MainPage;
