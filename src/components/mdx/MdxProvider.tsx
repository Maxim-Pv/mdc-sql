"use client";
import { MDXProvider } from "@mdx-js/react";

const components = {
  p: (props: any) => <p {...props} className="leading-relaxed my-3" />,
  ul: (props: any) => <ul {...props} className="list-disc list-inside space-y-1" />,
  ol: (props: any) => <ol {...props} className="list-decimal list-inside space-y-1" />,
  a: (props: any) => <a {...props} className="text-blue-600 underline break-words" />,
  strong: (props: any) => <b {...props} className="font-semibold" />,
};

export default function MdxProvider({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
