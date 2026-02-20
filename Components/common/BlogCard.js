// react
import * as React from "react";
// @mui
import { Box, Card, CardActions, Typography, styled } from "@mui/material";
import ImageWithSkeleton from "./ImageWithSkeleton";
import ButtonLink from "./ButtonLink";
import Link from "next/link";

const CustomCard = styled(Card)(({ theme }) => ({
  padding: "1rem 1rem 0.5rem",
}));

const CustomCardContent = styled(Box)(({ theme }) => ({
  borderRadius: "4px",
  height: "21rem",
  marginBottom: "0.5rem",
  overflow: "hidden",
  position: "relative",
  width: "100%",
  img: {
    transform: "scale(1)",
    transition: "transform 0.5s ease-in-out",
  },
  "&: hover": {
    img: {
      transform: "scale(1.2)",
      transition: "transform 0.5s ease-in-out",
    },
  },
}));

const CardTitleWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  borderRadius: theme.shape.borderRadius,
  bottom: 0,
  height: "40%",
  overflow: "hidden",
  padding: "0.5rem",
  position: "absolute",
  width: "100%",
}));

const CustomCardActions = styled(CardActions)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0",
}));

const BlogCard = (props) => {
  const {
    children,
    href = "#",
    readTime = 12,
    imageAlt = "",
    imageSrc = "/",
    title = "No Title ",
    ...otherProps
  } = props;

  return (
    <Link href={href} passHref>
      <CustomCard {...otherProps}>
        <CustomCardContent>
          <ImageWithSkeleton
            alt={imageAlt}
            src={imageSrc}
            layout="fill"
            objectFit="cover"
          />
          <CardTitleWrapper>
            <Typography component="h2" variant="h5" color="text.secondary">
              {title}
            </Typography>
          </CardTitleWrapper>
        </CustomCardContent>
        <CustomCardActions>
          <Typography
            color="text.secondary"
            component="p"
            fontSize="small"
            variant="body1"
          >
            {readTime} min read
          </Typography>
          <Box>
            <ButtonLink href={href}>read more</ButtonLink>
          </Box>
        </CustomCardActions>
      </CustomCard>
    </Link>
  );
};

export default BlogCard;
