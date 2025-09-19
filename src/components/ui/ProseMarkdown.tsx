'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const components = {
  p: (props: any) => <p {...props} className="my-3 leading-relaxed" />,
  ul: (props: any) => <ul {...props} className="list-inside list-disc space-y-1" />,
  ol: (props: any) => <ol {...props} className="list-inside list-decimal space-y-1" />,
  a: (props: any) => <a {...props} className="break-words text-blue-600 hover:underline" />,
  strong: (props: any) => <b {...props} className="font-semibold" />,
  img: (props: any) => <img {...props} className="mx-auto rounded-xl" />,
};

export default function ProseMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="prose prose-zinc prose-headings:font-semibold prose-a:text-blue-600 max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
