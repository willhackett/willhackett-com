import { Markdown } from '../components/Content';
import { PageLayout, SlimContainer } from '../components/Layout';
import { cms, gql } from '../modules/api';

interface ProfileProps {
  page: {
    title: string;
    content: string;
    seoDescription?: string;
  };
}

const Profile = ({
  page: { title, content, seoDescription },
}: ProfileProps) => (
  <PageLayout seoDescription={seoDescription} title={title}>
    <SlimContainer>
      <Markdown content={content} />
    </SlimContainer>
  </PageLayout>
);

export default Profile;

const pageQuery = gql`
  query {
    page(where: { slug: "/profile" }) {
      title
      seoDescription
      content
    }
  }
`;

export const getServerSideProps = async () => {
  const props = await cms.request(pageQuery);

  return {
    props,
  };
};
