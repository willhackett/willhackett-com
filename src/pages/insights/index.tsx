import Layout from '../../components/Layout';
import Markdown from '../../components/Markdown';
import InsightLink from '../../components/InsightLink';
import { LargeHeading } from '../../components/Heading';

import cms from '../../modules/cms';

type InsightsPageProps = {
  page: {
    content: string;
  };
  insights: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: {
      url: string;
    };
  }[];
};

const InsightsPage = ({ page: { content }, insights }: InsightsPageProps) => (
  <Layout>
    <LargeHeading>Insights</LargeHeading>
    <Markdown content={content} />
    <hr />
    <div className="row">
      {insights.map((insight) => (
        <InsightLink key={insight.id} {...insight} />
      ))}
    </div>
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
