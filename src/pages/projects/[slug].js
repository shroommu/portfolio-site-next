import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import ProjectPost from "../../features/projects/ProjectPost";
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
      <ProjectPost source={source}>
        <MDXRemote {...source} components={mdxComponents} />
      </ProjectPost>
    </div>
  );
}
export async function getStaticPaths() {
  return getMdxPostStaticPaths("_projects");
}

export async function getStaticProps(ctx) {
  return getMdxPostStaticProps(ctx, "_projects");
}
