// react
import * as React from "react";
// next
import Link from "next/link";
// custom component
// import CustomAnchor from 'components/common/CustomAnchor';
import CustomAnchor from "./CustomAnchor";

const CustomAnchorWithRef = (
  { children, href, onClick, ...otherProps },
  ref
) => {
  return (
    <CustomAnchor href={href} onClick={onClick} {...otherProps}>
      {children}
    </CustomAnchor>
  );
};

CustomAnchorWithRef.displayName = "CustomAnchorWithRef";

const TextLink = (props) => {
  const { children, href = "/", ...otherProps } = props;

  return (
    <Link href={href} passHref>
      <CustomAnchorWithRef>{children}</CustomAnchorWithRef>
    </Link>
  );
};

export default TextLink;
