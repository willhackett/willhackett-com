interface ArticleBaseProps {
  id: string;
  title: string;
  coverImage: {
    url: string;
  };
  publishedAt: Date;
}

export interface ArticleProps extends ArticleBaseProps {
  content: string;
  tags: string[];
}

export interface ArticlePreviewProps extends ArticleBaseProps {
  excerpt: string;
  slug: string;
}

export interface ArticleListProps {
  articles: ArticlePreviewProps[];
}
