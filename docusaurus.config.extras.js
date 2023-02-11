// @ts-check

const fs = require("fs");
const { JSDOM } = require("jsdom");

const meta = {
  description:
    "Explore Phantazm Network Technologies with phantazm docs - the official documentation website with information on tools and frameworks for Minecraft minigame server. Perfect for developers and game designers.",
  title: "Home | Phantazm Docs",
  url: "https://docs.phantazm.org/",
  siteName: "Phantazm Docs",
  image: "https://docs.phantazm.org/img/social-banner.png",
  color: "#ec5b26",
};

const mappings = {
  description: ["og:description", "twitter:description"],
  title: ["og:title", "twitter:title"],
  url: ["og:url", "twitter:url"],
  siteName: ["og:site_name"],
  image: ["og:image", "twitter:image"],
  color: ["theme-color"],
};

// type Mappings = typeof mappings;
// type MetaTags = {
//   [Property in keyof Mappings]: string;
// };

const metaFromConfig = (metadata) => {
  const xMeta = Object.entries(metadata ?? meta);
  return [
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    ...xMeta.flatMap((x) =>
      mappings[x[0]].map((y) => ({ name: y, content: x[1] }))
    ),
  ];
};

const metaFromHtml = (src) => {
  const content = fs.readFileSync(src ?? "./meta.html", "utf-8");
  const data = new JSDOM(content).window.document;

  return [...data.head.children]
    .filter((x) => x.getAttribute("property"))
    .map((x) => ({
      name: x.getAttribute("property"),
      content: x.getAttribute("content"),
    }));
};

module.exports = { metaFromConfig, metaFromHtml };
