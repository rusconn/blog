/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  posts: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/posts/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  tags: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/tags/[id]' as const, query: { id }, hash: url?.hash })
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
