import { GetServerSidePropsContext } from 'next';
import styled from 'styled-components';

import {
  ArticleList,
  ArticlePreviewProps,
  ArticlePreviewFragment,
} from '../components/Article';
import { Markdown } from '../components/Content';
import { BioHeading } from '../components/Heading';
import { PageLayout, SlimContainer } from '../components/Layout';
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

const IndexPage = (props: IndexProps) => {
  if (!props) {
    return <div>Under construction.</div>;
  }

  const {
    articles,
    page: { title, content, seoDescription },
  } = props;

  return (
    <PageLayout seoDescription={seoDescription} title={title}>
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
};

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
  res,
}: GetServerSidePropsContext) => {
  if (process.env.NODE_ENV === 'production') {
    const ip = req.headers['x-real-ip'] as string;
    const ipWhitelist = process.env.IP_WHITELIST;

    if (!ipWhitelist || ipWhitelist.includes(ip) === false) {
      res.statusCode = 401;
      return {
        props: null,
      };
    }
  }

  const props = await cms.request(pageQuery);

  return {
    props,
  };
};
