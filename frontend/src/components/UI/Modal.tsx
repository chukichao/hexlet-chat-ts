import Modal from 'react-bootstrap/Modal';

import { getModal } from '../../store/selectors';
import { uiActions } from '../../store/actions';

import { useAppDispatch } from '../../hooks/useAppDispatch.js';
import { useAppSelector } from '../../hooks/useAppSelector.js';

interface ModalUIProps {
  title: string;
  children: React.ReactNode;
}

const ModalUI: React.FC<ModalUIProps> = ({ title, children }) => {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(getModal).isOpened;

  const handleCloseModal = () => {
    dispatch(uiActions.closeModal());
  };

  return (
    <Modal show={isModalOpen} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalUI;
