import m from 'moment';

import { gql } from '../../modules/api';

import { ExperienceProps } from './types';

const DATE_FORMAT = 'MMM YYYY';

const Experience = ({
  title,
  current,
  startDate,
  endDate,
  logo,
  workedOn,
}: ExperienceProps) => (
  <div className="row">
    <div className="column">
      <time dateTime={startDate.toISOString()}>
        {m(startDate).format(DATE_FORMAT)}
      </time>{' '}
      {!current && (
        <>
          &mdash;{' '}
          <time dateTime={endDate.toISOString()}>
            {m(endDate).format(DATE_FORMAT)}
          </time>
        </>
      )}
    </div>
    <div className="className">
      {logo && <img src={logo.url} title={title} />}
    </div>
    <div className="className">{workedOn}</div>
  </div>
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
