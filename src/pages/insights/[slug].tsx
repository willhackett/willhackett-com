import React from 'react';

import cms from '../../modules/cms';
import { GetServerSidePropsContext } from 'next';

interface PostProps {
  title: string;
  excerpt: string;
}

interface RouteProps {
  [slug: string]: string | string[];
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
  context: GetServerSidePropsContext<RouteProps>
) => {
  const slug = context.params?.slug as string;

  if (!slug) {
    return null;
  }

  try {
    const { insight } = await cms.request(
      `
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
