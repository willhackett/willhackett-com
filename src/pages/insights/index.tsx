import { ArticleList, ArticlePreviewProps } from '../../components/Article';
import { LargeHeading } from '../../components/Heading';
import { Markdown } from '../../components/Content';
import Layout from '../../components/Layout/PageLayout';

import { cms, gql } from '../../modules/api';

type InsightsPageProps = {
  page: {
    title: string;
    content: string;
  };
  insights: ArticlePreviewProps[];
};

const InsightsPage = ({
  page: { title, content },
  insights,
}: InsightsPageProps) => (
  <Layout>
    <LargeHeading>{title}</LargeHeading>
    <Markdown content={content} />
    <hr />
    <ArticleList articles={insights} />
  </Layout>
);

const pageQuery = gql`
  query InsightsPageQuery {
    page(where: { slug: "/insights" }) {
      title
      seoDescription
      content
    }
    articles {
      ...ArticleContent
    }
  }
`;

export const getServerSideProps = async () => {
  try {
    const data = await cms.request(pageQuery);

    console.log('DATA', data);

    return {
      props: data,
    };
  } catch {
    return null;
  }
};

export default InsightsPage;
