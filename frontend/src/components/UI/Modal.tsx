import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-bootstrap/Modal';

import { getModal } from '../../store/selectors';
import { uiActions } from '../../store/actions';

const ModalUI = ({ title, children }) => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(getModal).isOpened;

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
