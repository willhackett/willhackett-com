import Link from 'next/link';

const InsightLink = ({ title, coverImage, excerpt, slug }) => (
  <div className="column">
    <Link href={`/$slug`}>
      <a title={title}>
        <img src={coverImage.url} alt={title} />
      </a>
    </Link>
    <h4>
      <Link href={`/${slug}`}>
        <a>{title}</a>
      </Link>
    </h4>
    <p className="small">{excerpt}</p>
  </div>
);

export default InsightLink;
