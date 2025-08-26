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
      hreflang: "en-US",
    },
    {
      href: "https://molclass.com/fr",
      hreflang: "fr-FR",
    },
    {
      href: "https://molclass.com/es",
      hreflang: "es-ES",
    },
    {
      href: "https://molclass.com/de",
      hreflang: "de-DE",
    },
    {
      href: "https://molclass.com/zh",
      hreflang: "zh-CN",
    },
    {
      href: "https://molclass.com/hi",
      hreflang: "hi-IN",
    },
    {
      href: "https://molclass.com/ar",
      hreflang: "ar-SA",
    },
    {
      href: "https://molclass.com/ru",
      hreflang: "ru-RU",
    },
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
