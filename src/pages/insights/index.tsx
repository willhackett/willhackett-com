import {
  ArticleList,
  ArticlePreviewProps,
  ArticleContentFragment,
} from '../../components/Article';
import { Markdown } from '../../components/Content';
import { PageLayout, SlimContainer } from '../../components/Layout';
import { cms, gql } from '../../modules/api';

type InsightsPageProps = {
  page: {
    title: string;
    content: string;
  };
  articles: ArticlePreviewProps[];
};

const InsightsPage = ({
  page: { title, content },
  articles,
}: InsightsPageProps) => (
  <PageLayout>
    <SlimContainer>
      <h1>{title}</h1>
      <Markdown content={content} />
      <hr />
      <ArticleList articles={articles} />
    </SlimContainer>
  </PageLayout>
);

const pageQuery = gql`
  ${ArticleContentFragment}
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
  const props = await cms.request(pageQuery);

  return {
    props,
  };
};

export default InsightsPage;
