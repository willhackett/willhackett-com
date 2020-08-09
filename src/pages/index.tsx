import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import BioText from '../components/BioText';
import Markdown from '../components/Markdown';

import cms from '../modules/cms';

import { LATO_FONT } from '../fonts';

interface InsightPostProps {
  id: string;
  title: string;
  coverImage: {
    url: string;
  };
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

const InsightPost = ({ title, coverImage, excerpt }: InsightPostProps) => (
  <div className="column">
    <img src={coverImage.url} />
    <h4>{title}</h4>
    <p className="small">{excerpt}</p>
  </div>
);

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
    <BioText>
      <Markdown content={content} />
    </BioText>

    <hr />

    <InsightsTitle>
      <h3>Insights</h3>
    </InsightsTitle>

    <div className="row">
      {insights.map((insight) => (
        <InsightPost key={insight.id} {...insight} />
      ))}
    </div>
  </Layout>
);

export default IndexPage;

export const getServerSideProps = async () => {
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
