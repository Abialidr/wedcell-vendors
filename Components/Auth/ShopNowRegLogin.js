import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PROXY } from "../../config";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { user } from "../../redux/reducer/appEssentials";
import { MuiTelInput } from "mui-tel-input";
import Styles from "../../styles/Editlist.module.css";

const ShopNowRegLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleLogIn = async () => {
    try {
      setIsloading(true);
      axios
        .post(`${PROXY}/shopnowuser/login`, {
          me: mobile,
          otp: password,
        })
        .then((res) => {
          if (res.data.success) {
            const role = "ShopNow";
            localStorage.setItem("wedcell", JSON.stringify(res.data));
            dispatch(user(res.data));
            localStorage.setItem("wedcellIsLoged", "true");
            localStorage.setItem("role", JSON.stringify({ role: role }));
            setIsloading(false);

            router.push("/dashboard/sellersdashboard");
          }
        })
        .catch((e) => {
          console.log(`🚀 ~ handleLogIn ~ e:`, e);
          setIsloading(false);
          // alert(e?.response?.data?.message);
          alert(`${e?.response?.data?.message}`);
        });
      // location.reload(true);
    } catch (e) {
      console.log(`🚀 ~ handleLogIn ~ e:`, e);
      axios;
      alert(`${e}`);
    }
  };

  // useEffect(() => {
  //   const auth = localStorage.getItem('wedcell');
  //   const role = localStorage.getItem('role');

  //   if (auth) {
  //     if (!role) {
  //       router.push('/user-dashboard');
  //     } else {
  //       router.push('/dashboard');
  //     }
  //   }
  // }, []);
  const [currState, setcurrState] = useState(0);

  const handleFirstNextLogin = () => {
    // if (
    //   !studentData.name ||
    //   !studentData.company_name ||
    //   !studentData.email ||
    //   !studentData.mobile ||
    //   !coverPic.length ||
    //   !studentData.company_address ||
    //   !studentData.address1 ||
    //   !studentData.address2 ||
    //   !studentData.landmark ||
    //   !studentData.state ||
    //   !studentData.city ||
    //   !studentData.pincode ||
    //   !studentData.country ||
    //   !studentData.password
    // ) {
    //   alert("Fill All Fields");
    // } else {
    axios
      .post(`${PROXY}/otp`, {
        mobile: mobile,
        type: "ShopNow",
      })
      .then((res) => {
        if (res.data.success) {
          setcurrState(1);
          startTimer();
        }
      })
      .catch((e) => alert(e.response.data.message));
    // }
  };
  const handleResendOtpLogin = () => {
    axios
      .post(`${PROXY}/otp`, {
        mobile: mobile,
        type: "ShopNow",
      })
      .then((res) => {
        if (res.data.success) {
          setOtpSent(true);
        }
      });
  };
  const [timer, setTimer] = useState(30); // Initial timer value in seconds
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

  const [value, setValue] = useState("");
  const handleChangeNumber = (newValue, country) => {
    setValue(newValue);
    setcurrState(0);
    setMobile(newValue.replace(/[^\d]/g, ""));
  };

  return (
    <>
      <div className=" mt-3">
        <div className="input-field mb-3 d-flex flex-column">
          {currState === 0 ? (
            <>
              <label
                style={{
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: "400",
                  marginBottom: "5px",
                }}
              >
                Mobile No.
              </label>
              <MuiTelInput
                value={value}
                id="outlined-basic"
                variant="outlined"
                fullWidth
                defaultCountry={"IN"}
                onChange={handleChangeNumber}
                onlyCountries={[
                  "AE",
                  "IN",
                  "TH",
                  "LK",
                  "ID",
                  "CA",
                  "MV",
                  "VN",
                  "KH",
                  "PH",
                  "MY",
                ]}
              />
            </>
          ) : (
            <span className="w-100" style={{ fontSize: "14px" }}>
              A Whatsapp Message with Otp is sent to <b>+{mobile}</b> <br />
              Wrong Number?{" "}
              <b style={{ cursor: "pointer" }} onClick={() => setcurrState(0)}>
                Edit
              </b>
            </span>
          )}
        </div>
        {currState === 0 ? (
          <></>
        ) : (
          <div className="input-field mb-3">
            <input
              type="number"
              placeholder="Enter Otp"
              className="form-control py-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        <button
          style={{
            display: "flex",
            width: "100%",
            fontSize: "15px",
            justifyContent: "end",
            background: "none",
            border: "none",
          }}
          onClick={handleResendOtpLogin}
        >
          {currState === 0
            ? ""
            : isTimerRunning
              ? `Resend in ${timer} seconds`
              : otpSent
                ? "Otp Resend Successfully"
                : "Resend Otp"}
        </button>
        <button
          className={Styles.submitbtnforLogin}
          onClick={currState === 0 ? handleFirstNextLogin : handleLogIn}
        >
          {isLoading ? (
            <Spinner />
          ) : currState === 0 ? (
            "Send Otp"
          ) : (
            "Verify Otp"
          )}
        </button>
      </div>
    </>
  );
};

export default ShopNowRegLogin;
