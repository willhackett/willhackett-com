import { GetServerSidePropsContext } from 'next';

import {
  ArticleProps,
  ArticleContent,
  ArticleContentFragment,
} from '../../components/Article';

import { cms, gql } from '../../modules/api';
import { PageLayout, SlimContainer } from '../../components/Layout';

interface RouteParams {
  [slug: string]: string | string[];
}

interface InsightArticleProps {
  article: ArticleProps;
}

const InsightArticle = ({ article }: InsightArticleProps) => (
  <PageLayout>
    <SlimContainer>
      <ArticleContent {...article} />
    </SlimContainer>
  </PageLayout>
);

export default InsightArticle;

const pageQuery = gql`
  ${ArticleContentFragment}
  query InsightArticleQuery($slug: String!) {
    article(where: { slug: $slug }) {
      ...ArticleContent
    }
  }
`;

export const getServerSideProps = async (
  context: GetServerSidePropsContext<RouteParams>
) => {
  const props = await cms.request(pageQuery, context.params);

  return {
    props,
  };
};
