import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import BlogPost from "./BlogPost";
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
        <title>{source?.frontmatter?.title}</title>
      </Head>
      <BlogPost source={source}>
        <MDXRemote
          {...source}
          // specifying the custom MDX components
          components={components}
        />
      </BlogPost>
    </div>
  );
}
export async function getStaticPaths() {
  return { paths: [], fallback: false };
}

export async function getStaticProps(ctx) {
  const { slug } = ctx.params;

  const postFile = fs.readFileSync(`_posts/${slug}.mdx`);

  const mdxSource = await serialize(postFile, { parseFrontmatter: true });
  return {
    props: {
      source: mdxSource,
    },
  };
}
