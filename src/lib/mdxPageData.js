import {
  getMdxPreviews,
  getMdxSlugPaths,
  getMdxSourceBySlug,
} from "./content";

export async function getMdxListStaticProps(contentDirectory) {
  const postPreviews = await getMdxPreviews(contentDirectory);

  return {
    props: {
      postPreviews,
    },
    revalidate: 60,
  };
}

export function getMdxPostStaticPaths(contentDirectory) {
  return {
    paths: getMdxSlugPaths(contentDirectory),
    fallback: false,
  };
}

export async function getMdxPostStaticProps(ctx, contentDirectory) {
  const { slug } = ctx.params;
  const source = await getMdxSourceBySlug(contentDirectory, slug);

  return {
    props: {
      source,
    },
    revalidate: 60,
  };
}
