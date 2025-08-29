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

// 🕓 Data da última modificação
const today = new Date().toISOString();

// 📁 Caminho das rotas reais (App Router)
const pagesDir = path.join(__dirname, "src", "app", "[locale]");

// 🧭 Coleta automática de páginas reais com page.tsx
function getPagesFromAppRouter() {
  const entries = fs.readdirSync(pagesDir, { withFileTypes: true });
  const validPages = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const pagePath = path.join(pagesDir, entry.name, "page.tsx");
      if (fs.existsSync(pagePath)) {
        validPages.push(entry.name);
      }
    }
  }

  return ["", ...validPages]; // Inclui a homepage ("")
}

const pages = getPagesFromAppRouter();

// 📝 Início do arquivo sitemap
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
`;

// 🔁 Geração das URLs com hreflang alternates
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

// 💾 Salva o sitemap na pasta /public
const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
fs.writeFileSync(sitemapPath, xml, "utf8");

console.log("✅ sitemap.xml gerado automaticamente a partir de rotas reais.");
