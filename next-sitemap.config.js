/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://blog-rusconn.vercel.app",
  exclude: ["/tags/*"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/tags/*"],
      },
    ],
  },
};
