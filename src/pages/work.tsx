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
      <hgroup>
        <h5>Commercial Experience</h5>
        <p>Places I have worked.</p>
      </hgroup>
      <ExperienceList experience={experience} />
      <hr style={{ margin: '4rem auto' }} />
      <hgroup>
        <h5>Consulting Experience</h5>
        <p>Clients I have worked with.</p>
      </hgroup>
      <hr style={{ margin: '4rem auto' }} />
      <hgroup>
        <h5>Projects</h5>
        <p>{"Work I'm proud of that I'd like to share."}</p>
      </hgroup>
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
