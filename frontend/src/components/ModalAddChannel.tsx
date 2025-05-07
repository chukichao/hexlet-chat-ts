import React, { useState, useRef, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

import * as yup from 'yup';
import { setLocale } from 'yup';

import { toast } from 'react-toastify';

import { Formik, Form as FormFormik, Field } from 'formik';
import type { FormikErrors } from 'formik';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { getChannels, getToken } from '../store/selectors';

import { uiActions } from '../store/actions';
import { addChannel } from '../store/asyncActions';

import { useAppDispatch } from '../hooks/useAppDispatch.js';
import { useAppSelector } from '../hooks/useAppSelector.js';

const ModalAddChannel: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const getNotificationStatusOperation = () =>
    toast.success(t('channels.created'));

  const [disabledButton, setDisabledButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const token = useAppSelector(getToken);
  const channelNames = Object.values(useAppSelector(getChannels)).map(
    (channel) => channel.name,
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  setLocale({
    string: {
      min: t('modals.min'),
      max: t('modals.max'),
    },
    mixed: {
      notOneOf: t('modals.uniq'),
      required: t('modals.required'),
    },
  });

  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3).max(20).notOneOf(channelNames),
  });

  const handleCloseModal = () => {
    dispatch(uiActions.closeModal());
  };

  interface Values {
    name: string;
  }

  const handleSubmit =
    (
      errors: FormikErrors<Values>,
      values: Values,
    ): React.FormEventHandler<HTMLFormElement> =>
    (event) => {
      event.preventDefault();

      if (errors.name) {
        setErrorMessage(errors.name);
        return;
      }

      setDisabledButton(true);

      const filteredChannelName = filter.clean(values.name);
      const newChannel = {
        name: filteredChannelName,
      };

      if (token) dispatch(addChannel({ token, newChannel }));

      handleCloseModal();
      getNotificationStatusOperation();
    };

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ errors, values }) => (
        <FormFormik noValidate onSubmit={handleSubmit(errors, values)}>
          <div>
            <Field
              name="name"
              id="name"
              className={`form-control mb-2 ${
                errorMessage ? 'is-invalid' : ''
              }`}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                  return handleSubmit(errors, values);
                }
              }}
              innerRef={inputRef}
            />
            <label className="visually-hidden" htmlFor="name">
              {' '}
              {t('modals.channelName')}
            </label>
            <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="me-2"
              >
                {t('modals.cancel')}
              </Button>
              <Button type="submit" variant="primary" disabled={disabledButton}>
                {t('modals.submit')}
              </Button>
            </div>
          </div>
        </FormFormik>
      )}
    </Formik>
  );
};

export default ModalAddChannel;
