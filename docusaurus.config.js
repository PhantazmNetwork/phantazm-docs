// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { metaFromConfig } = require("./docusaurus.config.extras");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Phantazm Docs",
  tagline: "Unique PvE Minecraft Network",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: "https://docs.phantazm.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Phantazm Network", // Usually your GitHub org/user name.
  projectName: "Phantazm Documentation", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/PhantazmNetwork/phantazm-docs",
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  // themes: ["@docusaurus/theme-search-algolia"],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: "3802304802342",

        // Public API key: it is safe to commit it
        apiKey: "9234890328490284p2",

        indexName: "YOUR_INDEX_NAME",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: "/docs/", // or as RegExp: /\/docs\//
          to: "/",
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },

      // Replace with your project's social card
      image: "/img/social-banner.png",

      colorMode: {
        defaultMode: "dark",
        respectPrefersColorScheme: true,
      },

      metadata: [
        ...metaFromConfig({
          description:
            "The Phantazm Docs website is the official source of information on the tools and frameworks used in the Phantazm Network Technologies Minecraft minigame server. It is designed to help developers and game designers create custom minigames with ease, providing in-depth knowledge and resources. Explore the technologies behind Phantazm and master its tools.",
          title: "Home | Phantazm Docs",
          url: "https://docs.phantazm.org/",
          siteName: "Phantazm Docs",
          image: "https://docs.phantazm.org/img/social-banner.png",
          color: "#ec5b26",
        }),
        // additional meta
      ],

      navbar: {
        title: "Phantazm Docs",
        logo: {
          alt: "Phantazm",
          src: "img/favicon.png",
        },
        items: [
          {
            type: "dropdown",
            label: "Configuration",
            position: "left",
            items: [
              {
                type: "doc",
                docId: "configurations/zombies/intro",
                label: "Zombies",
              },
              {
                type: "doc",
                docId: "configurations/skyblock/intro",
                label: "Skyblock",
              },
            ],
          },
          {
            type: "dropdown",
            label: "Developer Manual",
            position: "left",
            items: [
              {
                type: "doc",
                docId: "devman/server/intro",
                label: "Phantazm Server",
              },
              {
                type: "doc",
                docId: "devman/intro",
                label: "Phantazm Zombies",
              },
            ],
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownItemsAfter: [{ to: "/versions", label: "All versions" }],
            dropdownActiveClassDisabled: true,
          },
          {
            type: "localeDropdown",
            position: "right",
          },
          {
            type: "search",
            position: "right",
          },
          {
            href: "https://github.com/PhantazmNetwork/PhantazmServer",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Configuration - Zombies",
                to: "configurations/zombies/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord - Community",
                href: "https://discord.gg/DVnD3RxRXb",
              },
              {
                label: "Discord - Developers",
                href: "https://discord.gg/TKgZJ5jgvD",
              },
              {
                label: "Youtube",
                href: "https://www.youtube.com/channel/UCj6xaNwZdBWF4s-J_krMLwA",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Main Website",
                href: "https://phantazm.org",
              },
              {
                label: "GitHub",
                href: "https://github.com/PhantazmNetwork",
              },
            ],
          },
        ],
        copyright: `Build by Phantazm Network with ♥`,
      },
      prism: {
        theme: require("prism-react-renderer/themes/vsLight"),
        darkTheme: require("prism-react-renderer/themes/vsDark"),
      },
    }),
};

module.exports = config;
