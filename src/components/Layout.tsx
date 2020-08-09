import React, { ReactNode } from 'react';
import Head from 'next/head';

import Header from './Header';
import Container from './Container';

type Props = {
  children?: ReactNode;
  title?: string;
  seoDescription?: string;
};

const Layout = ({
  children,
  title = 'This is the default title',
  seoDescription,
}: Props) => (
  <div className="wrapper">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={seoDescription} />
    </Head>
    <Header />
    <Container>
      <main>{children}</main>
      <footer>
        <hr />
        <span>© {new Date().getFullYear()} Will Hackett</span>
      </footer>
    </Container>
  </div>
);

export default Layout;
