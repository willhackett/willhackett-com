import { Markdown } from '../Content';
import { ArticleProps } from './types';

import { gql } from '../../modules/api';

const ArticleContent = ({
  title,
  content,
  publishedAt,
  coverImage,
}: ArticleProps) => (
  <article>
    <header>
      {coverImage && <img src={coverImage.url} alt={title} />}
      <hgroup>
        <h1>{title}</h1>
        <h5>{publishedAt}</h5>
      </hgroup>
    </header>
    <Markdown content={content} />
  </article>
);

export const fragment = gql`
  fragment ArticleContent on Article {
    id
    title
    slug
    excerpt
    content
    publishedAt
    coverImage {
      url(transformation: { image: { resize: { width: 1400 } } })
    }
  }
`;

export default ArticleContent;
