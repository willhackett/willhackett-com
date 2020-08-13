import { Markdown } from '../components/Content';
import { PageLayout } from '../components/Layout';

import cms from '../modules/cms';

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
  <PageLayout title={title} seoDescription={seoDescription}>
    <Markdown content={content} />
  </PageLayout>
);

export default Profile;

export const getServerSideProps = async () => {
  try {
    const { data } = await cms.request(`
        query {

          page(where: { slug: "/profile" }) {
            title
            seoDescription
            content
          }
        }
      `);

    return {
      props: data,
    };
  } catch {
    return null;
  }
};
