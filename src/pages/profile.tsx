import Layout from '../components/Layout';
import Markdown from '../components/Markdown';

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
  <Layout title={title} seoDescription={seoDescription}>
    <Markdown content={content} />
  </Layout>
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
