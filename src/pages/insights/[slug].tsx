import React from 'react';
import { useRouter } from 'next/router';
import { gql } from 'graphql-request';

import cms from '../../modules/cms';
import { GetServerSidePropsContext } from 'next';

interface PostProps {
  title: string;
  excerpt: string;
}

const Post = ({ title, excerpt }: PostProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{excerpt}</p>
    </div>
  );
};

export default Post;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const {
    params: { slug },
  } = context;

  console.log(slug);

  try {
    const { insight } = await cms.request(
      gql`
        query InsightQuery($slug: String!) {
          insight(where: { slug: $slug }) {
            title
            excerpt
          }
        }
      `,
      {
        slug,
      }
    );

    if (!insight) {
      return null;
    }

    return {
      props: insight,
    };
  } catch {
    return null;
  }
};
