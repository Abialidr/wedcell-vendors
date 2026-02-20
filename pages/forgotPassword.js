import {
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import styles from '../styles/LoginAndSignup/Signup.module.css';
import { Password } from '@mui/icons-material';
import { selectLoginRoute, user } from '../redux/reducer/appEssentials';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PROXY } from '../config';
import { useRouter } from 'next/router';
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import dayjs from 'dayjs';
import {
  forgetPasswordVal,
  otpSendingMobileVal,
} from '../yupValidations/logForOtpvalidation';
const ForgetPassword = ({ setActive, type }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [emailPhone, setEmailPhone] = useState('');

  const [otp, setOtp] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const [iam, setiam] = useState('groom');
  const [pam, setpam] = useState('bride');
  const [hours, sethour] = useState('');
  const [min, setmin] = useState('');
  const [hours1, sethour1] = useState('');
  const [min1, setmin1] = useState('');
  const [currState, setcurrState] = useState(0);
  let [fileListmain, setFileListmain] = useState([]);
  let [fileListmain1, setFileListmain1] = useState([]);
  const handleChange2 = ({ fileList: newFileList }) => {
    setFileListmain(newFileList);
    if (iam === 'groom') {
      setSignupForm({ ...signUpForm, groomImage: fileListmain });
    } else {
      setSignupForm({ ...signUpForm, brideImage: fileListmain });
    }
  };
  const handleChange3 = ({ fileList: newFileList }) => {
    setFileListmain1(newFileList);
    if (pam === 'groom') {
      setSignupForm({ ...signUpForm, groomImage: fileListmain1 });
    } else {
      setSignupForm({ ...signUpForm, brideImage: fileListmain1 });
    }
  };
  const steps1 = ['Enter Mobile No', 'Change Passworde'];
  const handlefirstNext = async () => {
    try {
      await otpSendingMobileVal.validate(mobile);

      axios
        .post(`${PROXY}/otp`, {
          mobile: mobile,
        })
        .then((res) => {
          if (res.data.success) {
            setcurrState(currState + 1);
          }
        });
    } catch (e) {
      toast.error(`${e}`, {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };
  const [enterOtp, setEnterOtp] = useState(false);

  const handleSecondNext = async () => {
    try {
      await forgetPasswordVal.validate({
        otp,
        password,
      });

      if (type === 'Venue') {
        axios
          .put(`${PROXY}/venueuser/forgotpassword`, {
            mobile,
            password,
            otp,
          })
          .then((res) => {
            setActive('login');
            if (res.data.success) {
            }
          })
          .catch((e) => {
            toast.error(`${e?.message}`, {
              position: 'top-right',
              autoClose: 2000,
            });
            // alert(e?.message);
          });
      } else if (type === 'Vendor') {
        axios
          .put(`${PROXY}/vendoruser/forgotpassword`, {
            mobile,
            password,
            otp,
          })
          .then((res) => {
            setActive('login');
            if (res.data.success) {
            }
          })
          .catch((e) => {
            toast.error(`${e?.message}`, {
              position: 'top-right',
              autoClose: 2000,
            });
            // alert(e?.message);?
          });
      } else {
        axios
          .put(`${PROXY}/shopnowuser/forgotpassword`, {
            mobile,
            password,
            otp,
          })
          .then((res) => {
            setActive('login');
            if (res.data.success) {
            }
          })
          .catch((e) => {
            // alert(e?.message);
            toast.error(`${e?.message}`, {
              position: 'top-right',
              autoClose: 2000,
            });
          });
      }
    } catch (e) {
      toast.error(`${e}`, {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };
  const [otpSent, setOtpSent] = useState(false);
  const handleResendOtp = () => {
    axios
      .post(`${PROXY}/otp`, {
        mobile: mobile,
      })
      .then((res) => {
        if (res.data.success) {
          setOtpSent(true);
        }
      });
  };
  const [timer, setTimer] = useState(30); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(30);
  };

  useEffect(() => {
    let interval;

    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, timer]);
  return (
    <div
      className={styles.OneAboveAll}
      style={{ display: 'flex', justifyContent: 'center', marginTop: '120px' }}
    >
      <ToastContainer />
      <div
        className={styles.mainDiv}
        style={{ justifyContent: 'center' }}
      >
        <div
          className={styles.loginFormmaindiv}
          style={{ width: '75%' }}
        >
          <div className={styles.loginFormdiv}>
            <div className={styles.upperDiv}>
              <span className={styles.WelcomeBackspan}>
                {currState === 0
                  ? 'Forget Password'
                  : currState === 1
                  ? 'Forget Password'
                  : ''}
              </span>
            </div>
            <Stepper
              activeStep={currState}
              alternativeLabel
              style={{ width: '100%', fontSize: '18px', marginBottom: '30px' }}
            >
              {steps1?.map((label) => (
                <Step key={label}>
                  <StepLabel>
                    {' '}
                    <span
                      style={{
                        fontSize: '13px',
                        fontFamily: 'Ledger',
                      }}
                    >
                      {label}
                    </span>{' '}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className={styles.Mainform}>
              {currState === 0 ? (
                <>
                  <article style={{ marginBottom: '20px' }}>
                    <TextField
                      fullWidth
                      value={mobile}
                      id='outlined-basic'
                      label='Mobile'
                      variant='outlined'
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </article>
                </>
              ) : currState === 1 ? (
                <div
                  style={{
                    marginBottom: '20px',
                    display: 'flex',
                    gap: '20px',
                    flexDirection: 'column',
                  }}
                >
                  <article>
                    <TextField
                      fullWidth
                      value={otp}
                      id='outlined-basic'
                      label='Otp'
                      variant='outlined'
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </article>
                  {enterOtp ? (
                    <span
                      style={{
                        fontSize: '15px',
                        color: 'red',
                        marginTop: '10px',
                      }}
                    >
                      Enter Proper OTP!
                    </span>
                  ) : (
                    <></>
                  )}
                  <article>
                    <TextField
                      fullWidth
                      value={password}
                      id='outlined-basic'
                      label='New Password'
                      variant='outlined'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </article>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              {currState === 1 ? (
                <>
                  <button
                    className='primary-btn'
                    disabled={isTimerRunning}
                    onClick={() => handleResendOtp()}
                    style={{ marginBottom: '15px', marginTop: '15px' }}
                  >
                    {isTimerRunning
                      ? `Resend in ${timer} seconds`
                      : otpSent
                      ? 'Otp Resend Successfully'
                      : 'Resend OTP'}
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                gap: '20px',
                justifyContent: 'center',
              }}
            >
              {currState !== 0 ? (
                <button
                  className='primary-btn'
                  onClick={() => setcurrState(currState - 1)}
                >
                  Previous
                </button>
              ) : (
                <></>
              )}
              {currState === 0 ? (
                <button
                  className='primary-btn'
                  // className={styles.loginBtn}
                  onClick={() => {
                    handlefirstNext();
                    startTimer();
                  }}
                >
                  Send Otp
                </button>
              ) : currState === 1 ? (
                <>
                  <button
                    className='primary-btn'
                    onClick={() => handleSecondNext()}
                  >
                    Change Password
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <span
            className={`${styles.CreateAnAccount} cursor-pointer`}
            onClick={() => setActive('login')}
          >
            Already Have An Account?
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
