import React from 'react';
import { AppProps } from 'next/app';
import styled, { createGlobalStyle } from 'styled-components';
import 'milligram';

import { LATO_FONT, GARAMOND_FONT } from '../fonts';

const Root = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500;600;700&family=Lato:wght@300;400&display=swap');
`;

const GlobalStyle = createGlobalStyle`
body{
  color: #001D33;
  font-family: ${LATO_FONT};
  font-weight: 300;
}
a {
  color: #001D33;
}
h1, h2, h3 {
  font-family: ${GARAMOND_FONT};
  font-weight: 400;
  letter-spacing: 0.09rem;
}
h4, h5, h6 {
  font-family: ${LATO_FONT};
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
}
h3 {

}
`;

const App = ({ Component, pageProps }: AppProps) => (
  <Root>
    <GlobalStyle />
    <Component {...pageProps} />
  </Root>
);

export default App;
