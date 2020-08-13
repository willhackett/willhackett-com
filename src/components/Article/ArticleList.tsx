import ArticlePreview from './ArticlePreview';
import { ArticleListProps } from './types';

const ArticleList = ({ articles }: ArticleListProps) => (
  <section>
    {(() => {
      const articleListRows = [];

      /**
       * Split up every 3 articles into its own row
       */
      for (let i = 0; i < Math.ceil(articles.length / 3); i++) {
        articleListRows.push(
          <div key={i} className="row">
            {articles.slice(0 + i, 3 + i).map((article) => (
              <ArticlePreview key={article.id} {...article} />
            ))}
          </div>
        );
      }
      return articleListRows;
    })()}
  </section>
);
export default ArticleList;
