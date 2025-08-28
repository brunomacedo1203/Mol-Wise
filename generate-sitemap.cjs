/* eslint-disable */

const fs = require("fs");
const path = require("path");

// 🌐 Domínio do seu site
const siteUrl = "https://molclass.com";

// 🌍 Idiomas suportados
const locales = [
  { code: "pt", hreflang: "pt-BR" },
  { code: "en", hreflang: "en-US" },
  { code: "fr", hreflang: "fr-FR" },
  { code: "es", hreflang: "es-ES" },
  { code: "de", hreflang: "de-DE" },
  { code: "zh", hreflang: "zh-CN" },
  { code: "hi", hreflang: "hi-IN" },
  { code: "ar", hreflang: "ar-SA" },
  { code: "ru", hreflang: "ru-RU" },
];

// 🧭 Rotas principais
const pages = [
  "", // homepage
  "periodic-table",
  "catalog",
  "calculators",
  "visualization",
  "theory",
  "exercises",
  "games",
];

const today = new Date().toISOString();
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
`;

pages.forEach((page) => {
  locales.forEach((primaryLocale) => {
    const url = `${siteUrl}/${primaryLocale.code}${page ? `/${page}` : ""}`;
    xml += `  <url>
    <loc>${url}</loc>
`;

    locales.forEach((altLocale) => {
      const altUrl = `${siteUrl}/${altLocale.code}${page ? `/${page}` : ""}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${altLocale.hreflang}" href="${altUrl}" />\n`;
    });

    xml += `    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>\n`;
  });
});

xml += `</urlset>`;

// Caminho do arquivo final
const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
fs.writeFileSync(sitemapPath, xml, "utf8");

console.log("✅ sitemap.xml gerado com sucesso em /public/sitemap.xml");
