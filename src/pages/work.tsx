import { PageLayout, SlimContainer } from '../components/Layout';
import { ExperienceProps, ExperienceList } from '../components/Work';
import { cms, gql } from '../modules/api';

interface WorkProps {
  experience: ExperienceProps[];
}

const Work = ({ experience }: WorkProps) => (
  <PageLayout>
    <SlimContainer>
      <h1>Work</h1>
      <h4>Commercial Experience</h4>
      <ExperienceList experience={experience} />
    </SlimContainer>
  </PageLayout>
);

export default Work;

const pageQuery = gql`
  query WorkPageQuery {
    page(where: { slug: "/work" }) {
      title
      seoDescription
      content
    }
    experience: workHistory(where: { type: CommercialExperience }) {
      id
      current
      endDate
      logo {
        url
      }
      startDate
      title
      workedOn
    }
  }
`;

export const getServerSideProps = async () => {
  const props = await cms.request(pageQuery);

  return {
    props,
  };
};
