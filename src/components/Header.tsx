import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Root = styled.header`
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  nav {
    display: flex;
    justify-content: space-between;
    a {
      margin-left: 2rem;
      font-weight: 400;
    }
  }
  @media (min-width: 40rem) {
    max-width: 100rem;
  }
`;

const NameContainer = styled.div`
  height: 5rem;
  a {
    display: flex;
    align-items: center;
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 100%;
    }
    h1 {
      margin: 0;
      margin-top: 0.6rem;
      font-size: 3.5rem;
      line-height: 4rem;
      margin-left: 1.5rem;
    }
  }
`;

const NavLinks = styled.nav`
  height: 5rem;
  align-items: center;
  display: flex;
`;

const Hr = styled.hr`
  border-top: 0.2rem solid #f4f5f6;
`;

const Header = () => (
  <>
    <Root>
      <NameContainer>
        <Link href="/">
          <a>
            <img src="/img/will.jpg" alt="Will Hackett" />
            <h1>Will Hackett</h1>
          </a>
        </Link>
      </NameContainer>
      <NavLinks>
        <Link href="/insights">
          <a>Insights</a>
        </Link>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
        <Link href="/work">
          <a>Work</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </NavLinks>
    </Root>
    <Hr />
  </>
);

export default Header;
