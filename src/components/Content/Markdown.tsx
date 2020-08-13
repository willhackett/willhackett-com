import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
  content: string;
}

const Markdown = ({ content }: MarkdownProps) => (
  <ReactMarkdown source={content} />
);

export default Markdown;
