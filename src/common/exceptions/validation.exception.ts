import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
} from '@nestjs/common';
import { isNumberString } from 'class-validator';
import { snakeCase } from 'lodash';

function format(errors: ValidationError[], results = [], parentPath = '') {
  for (const error of errors) {
    const property = isNumberString(error.property)
      ? `[${error.property}]`
      : `.${error.property}`;
    const formatted = parentPath ? `${parentPath}${property}` : `${property}`;
    for (const constraintsKey in error?.constraints) {
      if (error?.constraints[constraintsKey]) {
        results.push({
          code: snakeCase(constraintsKey).toUpperCase(),
          field: formatted.replace('.', ''),
          details: error?.constraints[constraintsKey],
        });
      }
    }
    if (error?.children.length) {
      format(error.children, results, formatted);
    }
  }
  return results;
}

export class ValidationException extends UnprocessableEntityException {
  constructor(errors: ValidationError[], message = 'Validation failed') {
    super({
      code: 'VALIDATION_ERROR',
      message,
      errors: format(errors),
    });
  }
}
