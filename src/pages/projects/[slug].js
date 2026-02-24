import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import ProjectPost from "../../features/projects/ProjectPost";
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
      <ProjectPost source={source}>
        <MDXRemote {...source} components={components} />
      </ProjectPost>
    </div>
  );
}
export async function getStaticPaths() {
  return {
    paths: getMdxSlugPaths("_projects"),
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  const { slug } = ctx.params;
  const mdxSource = await getMdxSourceBySlug("_projects", slug);

  return {
    props: {
      source: mdxSource,
    },
    revalidate: 60,
  };
}
