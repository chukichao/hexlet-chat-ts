import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import { ArrowRightSquare } from 'react-bootstrap-icons';

import useChannel from '../hooks/useChannel.js';

import { addMessage } from '../store/asyncActions';
import { getToken, getUsername } from '../store/selectors';

const FormAddMessage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);

  const inputRef = useRef();

  const currentUsername = useSelector(getUsername);
  const currentChannel = useChannel();

  const token = useSelector(getToken);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannel]);

  const handleChange = ({ target: { value } }) => {
    setMessage(value);

    if (value.trim().length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    setDisabledButton(true);

    const filteredMessage = filter.clean(message);

    const newMessage = {
      body: filteredMessage,
      channelId: currentChannel.id,
      username: currentUsername,
    };

    dispatch(addMessage({ token, newMessage }));

    setMessage('');
    inputRef.current.focus();
  };

  return (
    <Form
      className="py-1 border rounded-2"
      noValidate
      onSubmit={handleSubmitMessage}
    >
      <InputGroup hasValidation>
        <Form.Control
          name="body"
          aria-label={t('chat.newMessage')}
          placeholder={t('chat.message')}
          className="border-0 p-0 ps-2"
          value={message}
          onChange={handleChange}
          ref={inputRef}
        />
        <Button
          type="submit"
          className="btn-group-vertical"
          disabled={disabledButton}
          variant=""
        >
          <ArrowRightSquare />
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default FormAddMessage;
