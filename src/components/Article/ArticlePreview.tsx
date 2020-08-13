import Link from 'next/link';
import { ArticlePreviewProps } from './types';

import { gql } from '../../modules/api';

const ArticlePreview = ({
  title,
  coverImage,
  excerpt,
  slug,
}: ArticlePreviewProps) => (
  <article className="column">
    <Link href={`/insights/${slug}`}>
      <a title={title}>
        <img src={coverImage.url} alt={title} />
      </a>
    </Link>
    <h4>
      <Link href={`/insights/${slug}`}>
        <a>{title}</a>
      </Link>
    </h4>
    <p className="small">{excerpt}</p>
  </article>
);

export default ArticlePreview;

export const fragment = gql`
  fragment ArticlePreview on Article {
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
`;
