/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Altere via variável de ambiente em produção se quiser:
  siteUrl: process.env.SITE_URL || "https://molclass.com",

  generateRobotsTxt: true, // gera /robots.txt
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  autoLastmod: true,

  // Se você tiver rotas que não devem ir para o Google, liste aqui:
  exclude: ["/api/*", "/admin*"],

  // Se precisar de sitemaps adicionais, liste aqui:
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      // { userAgent: '*', disallow: ['/admin', '/api'] },
    ],
    additionalSitemaps: [
      // 'https://molclass.com/sitemap-blog.xml',
    ],
  },
};
