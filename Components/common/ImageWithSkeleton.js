// react
import * as React from "react";
// next
import Image from "next/image";
import { Skeleton, useTheme } from "@mui/material";

const ImageWithSkeleton = (props) => {
  const { children, onLoad, alt = "", ...otherProps } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);
  const {
    palette: { primary },
  } = useTheme();

  return (
    <>
      <Image alt={alt} onLoad={() => setIsLoaded(true)} {...otherProps} />
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          sx={{
            backgroundColor: primary.light,
            borderRadius: "4px",
            height: "100%",
          }}
        />
      )}
    </>
  );
};

export default ImageWithSkeleton;
