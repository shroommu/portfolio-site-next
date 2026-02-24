import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import BlogPost from "../../features/blog/BlogPost";
import { mdxComponents } from "../../lib/mdxPage";
import {
  getMdxPostStaticPaths,
  getMdxPostStaticProps,
} from "../../lib/mdxPageData";

export default function PostPage({ source }) {
  return (
    <div>
      <Head>
        <title>{source.frontmatter.title}</title>
      </Head>
      <BlogPost source={source}>
        <MDXRemote {...source} components={mdxComponents} />
      </BlogPost>
    </div>
  );
}
export async function getStaticPaths() {
  return getMdxPostStaticPaths("_posts");
}

export async function getStaticProps(ctx) {
  return getMdxPostStaticProps(ctx, "_posts");
}
