import { useState, useRef, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

import * as yup from 'yup';
import { setLocale } from 'yup';

import { toast } from 'react-toastify';

import { Formik, Form as FormFormik, Field } from 'formik';
import type { FormikErrors } from 'formik';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { getChannels, getToken, getModal } from '../store/selectors';

import { uiActions } from '../store/actions';
import { editChannel } from '../store/asyncActions';

import { useAppDispatch } from '../hooks/useAppDispatch.js';
import { useAppSelector } from '../hooks/useAppSelector.js';

const ModalRenameChannel: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const getNotificationStatusOperation = () =>
    toast.success(t('channels.renamed'));

  const [disabledButton, setDisabledButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const token = useAppSelector(getToken);
  const channelNames = Object.values(useAppSelector(getChannels)).map(
    (channel) => channel.name,
  );

  const channelId = useAppSelector(getModal).extra;
  const channels = useAppSelector(getChannels);

  const currentChannelName = channelId && channels[channelId].name;

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
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
    name: string | null;
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

      if (values.name) {
        const filteredChannelName = filter.clean(values.name);
        const editedChannel = {
          name: filteredChannelName,
        };

        if (token && channelId) {
          dispatch(editChannel({ token, channelId, editedChannel }));
        }
      }

      handleCloseModal();
      getNotificationStatusOperation();
    };

  return (
    <Formik
      initialValues={{ name: currentChannelName }}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ errors, values }) => (
        <FormFormik onSubmit={handleSubmit(errors, values)} noValidate>
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
              {t('modals.editChannelName')}
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

export default ModalRenameChannel;
