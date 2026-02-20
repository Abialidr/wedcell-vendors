import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PROXY } from '../../config';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { user } from '../../redux/reducer/appEssentials';
import { TextField } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import Styles from '../../styles/Editlist.module.css';

const VenueRegLogin = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleFirstNextLogin = () => {
    if (!mobile) {
      alert('Fill Mobile');
    } else {
      axios
        .post(`${PROXY}/otp`, {
          mobile: mobile,
          type: 'Vendor',
        })
        .then((res) => {
          if (res.data.success) {
            setcurrState(1);
            startTimer();
          }
        })
        .catch((e) => alert(e.response.data.message));
    }
  };
  const [currState, setcurrState] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

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
  const handleResendOtpLogin = () => {
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
  const handleLogIn = async () => {
    if (!mobile || !password) {
      alert('Invalid mobile or password');
      return;
    } else {
      setIsLoading(true);

      axios
        .post(`${PROXY}/vendoruser/login`, {
          me: mobile,
          otp: password,
        })
        .then((res) => {
          if (res.data.success) {
            const role = 'Vendor';
            localStorage.setItem('wedcell', JSON.stringify(res.data));
            dispatch(user(res.data));
            localStorage.setItem('wedcellIsLoged', 'true');
            localStorage.setItem('role', JSON.stringify({ role: role }));
            setIsLoading(false);

            router.push('/dashboard');
          }
        })
        .catch((e) => {
          setIsLoading(false);
          // alert(e?.response?.data?.message);
          toast.error(`${e?.response?.data?.message}`, {
            position: 'top-right',
            autoClose: 2000,
          });
        });
    }
  };
  const [value, setValue] = useState('');
  const handleChangeNumber = (newValue, country) => {
    setValue(newValue);
    setcurrState(0);
    setMobile(newValue.replace(/[^\d]/g, ''));
  };
  return (
    <>
      <div className=' mt-3 '>
        <div className='input-field mb-3 d-flex flex-column'>
          {currState === 0 ? (
            <>
              <label
                style={{
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  fontWeight: '400',
                  marginBottom: '5px',
                }}
              >
                Mobile No.
              </label>
              <MuiPhoneNumber
                value={value}
                id='outlined-basic'
                variant='outlined'
                fullWidth
                defaultCountry={'in'}
                onChange={handleChangeNumber}
                onlyCountries={[
                  'ae',
                  'in',
                  'th',
                  'lk',
                  'id',
                  'ca',
                  'mv',
                  'vn',
                  'kh',
                  'ph',
                  'my',
                ]}
              />
            </>
          ) : (
            <span
              className='w-100'
              style={{ fontSize: '14px' }}
            >
              A Whatsapp Message with Otp is sent to <b>+{mobile}</b> <br />
              Wrong Number?{' '}
              <b
                style={{ cursor: 'pointer' }}
                onClick={() => setcurrState(0)}
              >
                Edit
              </b>
            </span>
          )}
        </div>
        {currState === 0 ? (
          <></>
        ) : (
          <div className='input-field mb-3'>
            <TextField
              fullWidth
              type='number'
              label='Enter Otp'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        <button
          style={{
            display: 'flex',
            width: '100%',
            fontSize: '15px',
            justifyContent: 'end',
            background: 'none',
            border: 'none',
          }}
          onClick={handleResendOtpLogin}
        >
          {currState === 0
            ? ''
            : isTimerRunning
            ? `Resend in ${timer} seconds`
            : otpSent
            ? 'Otp Resend Successfully'
            : 'Resend Otp'}
        </button>
        <button
          className={Styles.submitbtnforLogin}
          onClick={currState === 0 ? handleFirstNextLogin : handleLogIn}
        >
          {isLoading ? (
            <Spinner />
          ) : currState === 0 ? (
            'Send Otp'
          ) : (
            'Verify Otp'
          )}
        </button>
      </div>
    </>
  );
};

export default VenueRegLogin;
