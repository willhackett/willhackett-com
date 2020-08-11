import cms from '../../modules/cms';
import { GetServerSidePropsContext } from 'next';
import Markdown from '../../components/Markdown';

interface PostProps {
  title: string;
  excerpt: string;
  content: string;
}

interface RouteProps {
  [slug: string]: string | string[];
}

const Post = ({ title, content }: PostProps) => (
  <div>
    <h1>{title}</h1>
    <Markdown content={content} />
  </div>
);

export default Post;

export const getServerSideProps = async (
  context: GetServerSidePropsContext<RouteProps>
) => {
  const slug = context.params?.slug as string;

  console.log(slug);

  if (!slug) {
    return {};
  }

  try {
    const { data } = await cms.request(
      `
        query InsightQuery($slug: String!) {
          insight(where: { slug: $slug }) {
            title
            excerpt
            content
          }
        }
      `,
      {
        slug,
      }
    );

    if (!data.insight) {
      return null;
    }

    return {
      props: data.insight,
    };
  } catch {
    return null;
  }
};
