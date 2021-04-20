const fs = require("fs");
const moment = require("moment");
const prettier = require("prettier");

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

require("dotenv").config();

//routest
const routesGenerals = [
  {
    path: "/",
    exact: true,
  },
];

// Creates a sitemap object given the input configuration with URLs
function generals() {
  const content = `
        ${routesGenerals
          .map((route) => {
            return `
              <url>
                <loc>${`${process.env.REACT_APP_HOST_DOMAIN}${route.path}`}</loc>
                <lastmod>${moment().format()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.8</priority>
              </url>`;
          })
          .join("")}
      `;
  const formattedSitemap = formatted(generatedSitemap(content));
  fs.writeFileSync("./public/sitemap.xml", formattedSitemap, "utf8");
  console.log("Sitemap generado correctamente");
}

function generatedSitemap(value) {
  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    ${value}
  </urlset>
`;
}

generals();
