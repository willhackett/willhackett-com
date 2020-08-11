import styled from 'styled-components';

import Layout from '../components/Layout';
import { BioHeading } from '../components/Heading';
import Markdown from '../components/Markdown';

import cms from '../modules/cms';

import { LATO_FONT } from '../fonts';
import { GetServerSidePropsContext } from 'next';
import InsightLink from '../components/InsightLink';

interface InsightPostProps {
  id: string;
  title: string;
  coverImage: {
    url: string;
  };
  slug: string;
  excerpt: string;
}

interface IndexProps {
  insights: [InsightPostProps];
  page: {
    title: string;
    seoDescription: string;
    content: string;
  };
}

const InsightsTitle = styled.div`
  margin-top: 5rem;
  h3 {
    font-family: ${LATO_FONT};
    font-size: 2rem;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const IndexPage = ({
  insights,
  page: { title, content, seoDescription },
}: IndexProps) => (
  <Layout title={title} seoDescription={seoDescription}>
    <BioHeading>
      <Markdown content={content} />
    </BioHeading>

    <hr />

    <InsightsTitle>
      <h3>Insights</h3>
    </InsightsTitle>

    <div className="row">
      {insights.map((insight) => (
        <InsightLink key={insight.id} {...insight} />
      ))}
    </div>
  </Layout>
);

export default IndexPage;

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

  try {
    const { data } = await cms.request(`
        query IndexQuery {
          page(where: { slug: "/" }) {
            title
            content
          }
          insights(first: 3, orderBy: publishedAt_DESC) {
            id
            title
            excerpt
            publishedAt
            slug
            coverImage {
              url(
                transformation: {
                  image: { resize: { width: 300, height: 169, fit: crop } }
                }
              )
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
