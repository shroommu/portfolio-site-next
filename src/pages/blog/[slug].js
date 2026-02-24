import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import BlogPost from "../../features/blog/BlogPost";
import { getMdxSlugPaths, getMdxSourceBySlug } from "../../lib/content";
import {
  Header1,
  Header2,
  Paragraph,
  Pre,
  Code,
  Link,
  Image,
} from "../../components/Blog/styles";

const components = {
  h1: Header1,
  h2: Header2,
  p: Paragraph,
  pre: Pre,
  code: Code,
  a: Link,
  Image,
};

export default function PostPage({ source }) {
  return (
    <div>
      <Head>
        <title>{source.frontmatter.title}</title>
      </Head>
      <BlogPost source={source}>
        <MDXRemote {...source} components={components} />
      </BlogPost>
    </div>
  );
}
export async function getStaticPaths() {
  return {
    paths: getMdxSlugPaths("_posts"),
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  const { slug } = ctx.params;
  const mdxSource = await getMdxSourceBySlug("_posts", slug);

  return {
    props: {
      source: mdxSource,
    },
    revalidate: 60,
  };
}
