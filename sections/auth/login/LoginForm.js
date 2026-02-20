import * as Yup from "yup";
import { useState, useEffect } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/Iconify";
// import {
//   FormProvider,
//   RHFTextField,
//   RHFCheckbox,
// } from "../../../components/hook-form";

import { useDispatch, useSelector } from "react-redux";

import { login } from "../../../redux/actions/authActions";

import { useRouter } from "next/router";
import axios from "axios";
import { PROXY } from "../../../config";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const router = useRouter();
  const [active, setActive] = useState("register");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();
  const loginPagename = "vendor";

  const [otp, setOtp] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  const [name, setName] = useState("");
  const [confirmOTP, setConfirmOTP] = useState("");

  const handleLogIn = () => {
    if (!mobile || !password) {
      alert("Invalid mobile or password");
      return;
    }
    axios
      .post(`${PROXY}/users/login`, {
        mobile,
        password,
        role: "Admin",
      })
      .then((res) => {
        console.log("stuff", res.data);
        if (res.data.success) {
          const role = res.data.data.role;

          localStorage.setItem("wedcell", JSON.stringify(res.data));
          localStorage.setItem("role", JSON.stringify({ role: role }));

          if (res.data.data.role !== "Admin") {
            localStorage.removeItem("wedcell");
            router.push("/Login");
            alert("Not Admin");
          } else {
            router.push("/");
          }
          // location.reload(true);
        } else {
          alert(res.data.message);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    const auth = localStorage.getItem("wedcell");
    const role = localStorage.getItem("role");

    if (auth) {
      if (!role) {
        router.push("/Login");
      } else {
        router.push("/");
      }
    }
  }, []);
  ///////////////////////////

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const auth = useSelector((state) => state.authReducer);

  useEffect(() => {}, [auth]);

  const onSubmit = async (data) => {
    await dispatch(login(data.email, data.password));
  };

  useEffect(() => {
    const auth = localStorage.getItem("wedcell");
    if (auth) router.push("/");
  }, [auth]);
  const handleMobile = (event) => {
    setMobile(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <>
      <Stack spacing={3}>
        <TextField
          name="mobile"
          label="Mobile Number"
          fullWidth
          value={mobile}
          // error={!!error}
          // helperText={error?.message}
          onChange={handleMobile}
        />

        <TextField
          name="password"
          label="Password"
          onChange={handlePassword}
          type={showPassword ? "text" : "password"}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={handleLogIn}
      >
        Login
      </LoadingButton>
    </>
    // </FormProvider>
  );
}
