import { body, oneOf } from 'express-validator';

export const signupValidator = oneOf([
  body('id', 'Invalid email. Id should be either email or US phone number')
    .not()
    .isEmpty()
    .isEmail(),
  body(
    'id',
    'Invalid phone number. Id should be either email or US phone number',
  )
    .not()
    .isEmpty()
    .isMobilePhone('en-US'),
]);

export default signupValidator;
