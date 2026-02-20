// react
import * as React from "react";
// @mui
import { Box, styled } from "@mui/material";
// prism-react-renderer
import Highlight, { defaultProps } from "prism-react-renderer";
import vsDark from "prism-react-renderer/themes/vsDark";

const PreContainer = styled(Box, { name: "PreContainer" })(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: "1rem",
}));

const Pre = styled("pre")({
  overflowX: "auto",
});

const HighlightSyntax = (props) => {
  const {
    code = `const sayHello = (name:string) => console.log(\`Hello\${name}\`);`,
    language = "tsx",
  } = props;

  return (
    <Highlight {...defaultProps} theme={vsDark} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <PreContainer className={className} style={style}>
          <Pre>
            {tokens?.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line?.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Pre>
        </PreContainer>
      )}
    </Highlight>
  );
};

export default HighlightSyntax;
