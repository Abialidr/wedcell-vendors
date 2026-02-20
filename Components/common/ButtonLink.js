// react
import * as React from 'react';
// next
import Link from 'next/link';
// @mui
import { Button, styled } from '@mui/material';
// custom component
const CustomButtonRoot = styled(Button)(({ theme, variant }) => ({
  textTransform: 'capitalize',
  boxShadow: 'none',
  '&: hover': {
    boxShadow: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'currentcolor',
  },
  '&: active': {
    opacity: 0.5,
    transition: '0.3s ease-in-out',
  },
  ':focus-visible': {
    boxShadow: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'currentcolor',
  },
}));
const ButtonLink = (props) => {
  const { children, href = '#', ref, ...otherProps } = props;

  return (
    <Link
      href={href}
      passHref
    >
      <CustomButtonRoot
        disableRipple
        {...otherProps}
      >
        {children}
      </CustomButtonRoot>
    </Link>
  );
};

export default ButtonLink;
