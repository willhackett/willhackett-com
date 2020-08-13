import React, { ReactNode } from 'react';
import Head from 'next/head';

import Header from '../Header';
import Container from './SlimContainer';

type Props = {
  children?: ReactNode;
  title?: string;
  seoDescription?: string;
};

const PageLayout = ({
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
    <main>{children}</main>
    <Container>
      <footer>
        <hr />
        <span>© {new Date().getFullYear()} Will Hackett</span>
      </footer>
    </Container>
  </div>
);

export default PageLayout;
