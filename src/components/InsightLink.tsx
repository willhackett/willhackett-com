import Link from 'next/link';

interface InsightProps {
  title: string;
  coverImage: {
    url: string;
  };
  excerpt: string;
  slug: string;
}

const InsightLink = ({ title, coverImage, excerpt, slug }: InsightProps) => (
  <div className="column">
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
  </div>
);

export default InsightLink;
