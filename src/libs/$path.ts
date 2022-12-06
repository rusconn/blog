/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  posts: {
    _slug: (slug: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/posts/[slug]' as const, query: { slug }, hash: url?.hash })
    })
  },
  tags: {
    _slug: (slug: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/tags/[slug]' as const, query: { slug }, hash: url?.hash })
    })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath

// prettier-ignore
export const staticPath = {
  favicon_ico: '/favicon.ico',
  images: {
    profile_png: '/images/profile.png'
  },
  robots_txt: '/robots.txt'
} as const

// prettier-ignore
export type StaticPath = typeof staticPath
