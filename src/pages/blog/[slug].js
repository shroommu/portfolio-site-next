import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import BlogPost from "./BlogPost";
import { Header1, Header2, Paragraph, Pre, Code, Link, Image } from "./styles";

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
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(ctx) {
  const { slug } = ctx.params;

  // retrieve the MDX blog post file associated
  // with the specified slug parameter
  const postFile = fs.readFileSync(`_posts/${slug}.mdx`);

  // read the MDX serialized content along with the frontmatter
  // from the .mdx blog post file
  const mdxSource = await serialize(postFile, { parseFrontmatter: true });
  return {
    props: {
      source: mdxSource,
    },
    // enable ISR
    revalidate: 60,
  };
}
