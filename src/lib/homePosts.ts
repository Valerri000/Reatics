import { emptyBlog, postByline, postPath, visiblePosts, type PostCard } from '@/lib/postList'

export const homePostLimit = 3

export { emptyBlog }

export function homePostCards(posts: PostCard[]) {
  return visiblePosts(posts)
    .slice(0, homePostLimit)
    .map((post) => ({
      href: postPath(post.slug),
      title: post.title,
      byline: postByline(post),
    }))
}
