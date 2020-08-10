import Layout from '../../components/Layout';
import LargeHeading from '../../components/LargeHeading';
import Markdown from '../../components/Markdown';

import cms from '../../modules/cms';

const InsightsPage = ({ page: { content } }) => (
  <Layout>
    <LargeHeading>Insights</LargeHeading>
    <Markdown content={content} />
    <hr />
  </Layout>
);

export const getServerSideProps = async () => {
  try {
    const { data } = await cms.request(`
        query {
          page(where: { slug: "/insights" }) {
            title
            seoDescription
            content
          }
          insights{
            id
            title
            slug
            excerpt
            coverImage{
              url(transformation:{image:{resize:{width:300}}})
            }
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

export default InsightsPage;
