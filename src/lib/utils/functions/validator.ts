// @ts-nocheck

import isNumber from 'lodash/isNumber';
import z from 'zod';
import { validateEmail } from './validateEmail';
import { t } from '$lib/translations';

const authValidationSchema = z.object({
  email: z.string().email({
    message: `${t.get('validations.auth.email.invalid_email')}`,
    invalid_type_error: `${t.get('validations.invalid_type_error')}`,
  }),
  password: z.string().min(6, {
    message: `${t.get('validations.auth.password.min_char')}`,
    invalid_type_error: `${t.get('validations.invalid_type_error')}`,
  }),
});

export const processErrors = (error, mapToId) => {
  const errors = {};

  if (Array.isArray(error?.issues)) {
    for (const issue of error.issues) {
      const { message, path } = issue;

      if (!path.length) {
        continue;
      }

      if (mapToId) {
        let value = '';
        path.forEach((p, i) => {
          const isLast = !path[i + 1];
          const formatP = isNumber(p) ? `[${p}]` : p;

          value += !value ? formatP : `.${formatP}`;
        });
        const key = value.replace('label', 'id');
        errors[key] = value;
      } else {
        errors[path[0]] = message;
      }
    }
  }

  return errors;
};

// ---------------------------------------------------------------------

export const authValidation = (fields = {}) => {
  const { error } = authValidationSchema.safeParse(fields);
  return processErrors(error);
};

export const getConfirmPasswordError = ({ password, confirmPassword }) => {
  return password > 6 && confirmPassword > 6 && password !== confirmPassword
    ? `${t.get('validations.confirm_password.not_match')}`
    : undefined;
};

export const getDisableSubmit = ({ password, confirmPassword }) => {
  return !!(password && confirmPassword && password !== confirmPassword);
};
