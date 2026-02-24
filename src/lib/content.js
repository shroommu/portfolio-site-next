import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";

const MDX_EXTENSION = ".mdx";

export function listMdxFiles(contentDirectory) {
  return fs.readdirSync(contentDirectory).filter((filePath) => {
    return path.extname(filePath).toLowerCase() === MDX_EXTENSION;
  });
}

export async function getMdxPreviews(contentDirectory) {
  const postFilePaths = listMdxFiles(contentDirectory);

  const previews = await Promise.all(
    postFilePaths.map(async (postFilePath) => {
      const postFile = fs.readFileSync(
        path.join(process.cwd(), contentDirectory, postFilePath),
        "utf8"
      );

      const serializedPost = await serialize(postFile, {
        parseFrontmatter: true,
      });

      return {
        ...serializedPost.frontmatter,
        slug: postFilePath.replace(MDX_EXTENSION, ""),
      };
    })
  );

  return previews;
}

export async function getMdxSourceBySlug(contentDirectory, slug) {
  const postFile = fs.readFileSync(
    path.join(process.cwd(), contentDirectory, `${slug}${MDX_EXTENSION}`),
    "utf8"
  );

  return serialize(postFile, { parseFrontmatter: true });
}

export function getMdxSlugPaths(contentDirectory) {
  return listMdxFiles(contentDirectory).map((postFilePath) => {
    return {
      params: {
        slug: postFilePath.replace(MDX_EXTENSION, ""),
      },
    };
  });
}