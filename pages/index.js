import React from 'react';
import Styles from '../styles/Auth/Auth.module.css';
import AuthForm from '../Components/Auth/AuthForm';
const VendorLogIn = () => {
  return (
    <div className={Styles.auth_container}>
      <AuthForm
        form='vendorLogin'
        loginPagename='vendor'
        role='Vendor'
      />
    </div>
  );
};

export default VendorLogIn;
