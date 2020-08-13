import m from 'moment';
import styled from 'styled-components';

import { gql } from '../../modules/api';

import { ExperienceProps } from './types';

const DATE_FORMAT = 'MMM YYYY';

const Root = styled.div`
  border-offset-bottom: 2rem;
  display: flex;
  flex-direction: flex-start;
  padding: 4rem auto;
  width: 100%;
  flex-direction: column;
  & > div {
    margin: 0;
    min-width: 20rem;
  }
  @media (min-width: 40rem) {
    width: auto;
    flex-direction: row;
    & > div {
      margin: 0.5rem 0;
    }
  }
`;

const ExperienceDateRange = styled.div`
  text-transform: uppercase;
  font-size: 1.4rem;
  text-color: #2b2b2b;
`;

const ExperienceLogo = styled.div`
  a {
    display: flex;
    height: 4rem;
    align-items: left;
  }
  img {
    height: 3.5rem;
    max-width: 15rem;
  }
`;

const Experience = ({
  title,
  current = false,
  startDate = new Date(),
  endDate = new Date(),
  logo,
  workedOn,
}: ExperienceProps) => (
  <Root>
    <ExperienceDateRange className="column">
      <time dateTime={m(startDate).toISOString()}>
        {m(startDate).format(DATE_FORMAT)}
      </time>{' '}
      {!current && (
        <>
          &mdash;{' '}
          <time dateTime={m(endDate).toISOString()}>
            {m(endDate).format(DATE_FORMAT)}
          </time>
        </>
      )}
    </ExperienceDateRange>
    <ExperienceLogo className="column">
      {logo && (
        <a href={logo.url} rel="noopener noreferrer" target="_blank">
          <img src={logo.url} title={title} />
        </a>
      )}
    </ExperienceLogo>
    <div className="column">{workedOn}</div>
  </Root>
);

export default Experience;

export const fragment = gql`
  fragment Experience on Work {
    endDate
    logo {
      url
    }
    startDate
    title
    workedOn
  }
`;
