import React, { useReducer, useEffect } from "react";
import { TextField } from "@mui/material";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (obj) => {
    let text = obj.target.value;

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const decNumRegex = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
    const Regex = /^[A-Za-z0-9 _]*$/;
    const textNumUnderscoreRegex = /^[A-Za-z0-9_]*$/;
    const textNumRegex = /^[A-Za-z0-9()]*$/;
    const numRegex = /^[0-9]*$/;
    const mobile = /^[0-9+]*$/;
    // /^[\w\s]+$/;

    let isValid = true;

    if (props. && !Regex.test(text)) {
      isValid = false;
    }

    if (props.mobile && !mobile.test(text)) {
      isValid = false;
    }

    if (props.subAccountId && !textNumUnderscoreRegex.test(text)) {
      isValid = false;
    }

    if (props.textNum && !textNumRegex.test(text)) {
      isValid = false;
    }

    if (props.decNum && !decNumRegex.test(text)) {
      isValid = false;
    }

    if (props.num && !numRegex.test(text)) {
      isValid = false;
    }

    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    if (props.optional && text.length < 1) {
      isValid = true;
    }

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  let isError = !inputState.isValid && inputState.touched;

  return (
    <TextField
      {...props}
      value={inputState.value}
      onChange={textChangeHandler}
      onBlur={lostFocusHandler}
      helperText={isError ? props.errorText : null}
      error={isError ? true : false}
    />
  );
};

export default Input;
