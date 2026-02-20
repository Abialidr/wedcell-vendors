/* eslint react/no-children-prop: 0 */
// react
import * as React from "react";
// next
import Image from "next/image";
// markdown-to-jsx
import MTJMarkdown from "markdown-to-jsx";
// @mui
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
// custom component
// import TextLink from 'components/common/TextLink';
import TextLink from "./TextLink";
// import Blockquote from 'components/common/Blockquote';
import Blockquote from "./Blockquote";
// import HighlightSyntax from 'components/common/HighlightSyntax';
import HighlightSyntax from "./HighlightSyntax";

const InlineCode = styled(Box)(({ theme }) => ({
  display: "inline-block",
  padding: "4px 8px",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: theme.shape.borderRadius,
}));

const PreBlock = ({ children }) => {
  if (children && children.props && children.props.component === "code") {
    const lang = children.props.className
      ? children.props.className.replace("lang-", "")
      : "tsx";

    return <HighlightSyntax code={children.props.children} language={lang} />;
  }
  return (
    <Box component="pre" sx={{ whiteSpace: "pre-wrap" }}>
      {children}
    </Box>
  );
};

const Markdown = (props) => {
  const { content = "**No Content**", sx } = props;

  return (
    <Box sx={sx}>
      <MTJMarkdown
        children={content}
        options={{
          overrides: {
            a: {
              component: TextLink,
            },
            blockquote: {
              component: Blockquote,
            },
            code: {
              component: InlineCode,
              props: {
                component: "code",
              },
            },
            h1: {
              component: Typography,
              props: {
                component: "h2",
                sx: {
                  marginBottom: "0.75rem",
                  marginTop: "1.5rem",
                },
                variant: "h2",
              },
            },
            h2: {
              component: Typography,
              props: {
                component: "h2",
                sx: {
                  marginBottom: "0.5rem",
                  marginTop: "1.2rem",
                },
                variant: "h3",
              },
            },
            h3: {
              component: Typography,
              props: {
                component: "h3",
                sx: {
                  marginBottom: "0.5rem",
                  marginTop: "1.2rem",
                },
                variant: "h4",
              },
            },
            h4: {
              component: Typography,
              props: {
                component: "h4",
                sx: {
                  marginBottom: "0.5rem",
                  marginTop: "1.2rem",
                },
                variant: "h5",
              },
            },
            h5: {
              component: Typography,
              props: {
                component: "h5",
                sx: {
                  marginBottom: "0.5rem",
                  marginTop: "1.2rem",
                },
                variant: "h6",
              },
            },
            h6: {
              component: Typography,
              props: {
                component: "h6",
                sx: {
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                  marginTop: "1.2rem",
                },
                variant: "h6",
              },
            },
            hr: {
              component: Divider,
            },
            image: {
              component: Image,
              props: {
                height: 50,
                layout: "fill",
                objectFit: "contain",
                width: "100%",
              },
            },
            img: {
              component: Image,
              props: {
                height: 50,
                layout: "responsive",
                objectFit: "contain",
                width: "100%",
              },
            },
            p: {
              component: Typography,
              props: {
                component: "p",
                sx: {
                  marginBottom: "0.25rem",
                },
                variant: "body1",
              },
            },
            pre: {
              component: PreBlock,
            },
            table: {
              component: Table,
            },
            tbody: {
              component: TableBody,
            },
            thead: {
              component: TableHead,
            },
            tr: {
              component: TableRow,
            },
            th: {
              component: TableCell,
            },
            td: {
              component: TableCell,
            },
          },
        }}
      />
    </Box>
  );
};

export default Markdown;
