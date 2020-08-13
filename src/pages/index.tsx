import { GetServerSidePropsContext } from 'next';
import styled from 'styled-components';

import { PageLayout, SlimContainer } from '../components/Layout';
import { Markdown } from '../components/Content';
import {
  ArticleList,
  ArticlePreviewProps,
  ArticlePreviewFragment,
} from '../components/Article';
import { BioHeading } from '../components/Heading';

import { cms, gql } from '../modules/api';

interface IndexProps {
  articles: ArticlePreviewProps[];
  page: {
    title: string;
    seoDescription: string;
    content: string;
  };
}

const InsightsTitle = styled.div`
  margin-top: 5rem;
`;

const IndexPage = ({
  articles,
  page: { title, content, seoDescription },
}: IndexProps) => (
  <PageLayout title={title} seoDescription={seoDescription}>
    <BioHeading>
      <Markdown content={content} />
    </BioHeading>

    <SlimContainer>
      <hr />

      <InsightsTitle>
        <h4>Insights</h4>
      </InsightsTitle>

      <ArticleList articles={articles} />
    </SlimContainer>
  </PageLayout>
);

export default IndexPage;

const pageQuery = gql`
  ${ArticlePreviewFragment}
  query IndexPageQuery {
    page(where: { slug: "/" }) {
      title
      content
    }
    articles(first: 3, orderBy: publishedAt_DESC) {
      ...ArticlePreview
    }
  }
`;

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  if (process.env.NODE_ENV === 'production') {
    if (
      ['117.20.66.181', '117.20.66.182', '49.177.130.159'].includes(
        (req.headers['x-real-ip'] as string) || ''
      ) === false
    ) {
      throw new Error('Not Authorised');
    }
  }

  const props = await cms.request(pageQuery);

  return {
    props,
  };
};
