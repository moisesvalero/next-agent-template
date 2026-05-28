import groq from "groq";

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt
  }
`;
