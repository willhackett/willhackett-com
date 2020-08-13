import { Fragment } from 'react';

import Experience from './Experience';
import { ExperienceProps } from './types';

interface ExperienceListProps {
  experience: ExperienceProps[];
}

const ExperienceList = ({ experience }: ExperienceListProps) =>
  experience.map((work, index) => (
    <Fragment key={work.id}>
      <Experience {...work} />
      {index < experience.length - 1 && <hr />}
    </Fragment>
  ));

export default ExperienceList;
