/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://molclass.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  autoLastmod: true,
  exclude: ["/api/*", "/admin*"],
  alternateRefs: [
    {
      href: "https://molclass.com/pt",
      hreflang: "pt-BR",
    },
    {
      href: "https://molclass.com/en",
      hreflang: "en",
    },
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
