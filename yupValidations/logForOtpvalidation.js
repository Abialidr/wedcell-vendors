import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

export const Loginval = yup.object({
  mobile: yup
    .string()
    // .trim('No Space Should Be Provided In Mobile Number')
    // .matches(/^\d+$/, 'Mobile No. Should Be in Numbers')
    // .length(10, 'Mobile No. Should be 10 Digits')
    .required('No Mobile No. Provided'),
  password: yup.string().required('No Password Provided'),
});
export const otpSendingMobileVal = yup
  .string()
  // .trim('No Space Should Be Provided In Mobile Number')
  // .matches(/^\d+$/, 'Mobile No. Should Be in Numbers')
  // .length(10, 'Mobile No. Should be 10 Digits')
  .required('No Mobile No. Provided');

export const forgetPasswordVal = yup.object({
  otp: yup
    .string()
    .trim('No Space Should Be Provided In otp')
    .matches(/^\d+$/, 'Otp Should Be in Numbers')
    .length(6, 'OTP Should be 6 Digits')
    .required('No OTP Provided'),
  password: yup.string().required('No Password Provided'),
});
export const OtpVal = yup
  .string()
  .trim('No Space Should Be Provided In otp')
  .matches(/^\d+$/, 'Otp Should Be in Numbers')
  .length(6, 'OTP Should be 6 Digits')
  .required('No OTP Provided');
