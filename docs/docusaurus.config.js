import { themes as prismThemes } from "prism-react-renderer";
import dotenv from "dotenv";

dotenv.config();

const config = {
  title: "eliza",
  tagline: "Flexible, scalable AI agents for everyone",
  favicon: "img/favicon.ico",
  url: "https://elizaos.github.io",
  baseUrl: "/eliza/",
  organizationName: "elizaos",
  projectName: "eliza",
  deploymentBranch: "gh-pages",
  trailingSlash: false,
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        path: "community",
        routeBasePath: "community",
        sidebarItemsGenerator: async ({
          defaultSidebarItemsGenerator,
          ...args
        }) => {
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          return sidebarItems
            .map((item) => {
              if (item.type === "category") {
                switch (item.label.toLowerCase()) {
                  case "streams":
                    item.label = "📺 " + item.label;
                    break;
                  case "development":
                    item.label = "💻 " + item.label;
                    break;
                  case "the_arena":
                    item.label = "🏟️ " + item.label;
                    break;
                  default:
                    item.label = "📄 " + item.label;
                }
              }
              return item;
            })
            .sort((a, b) => {
              const labelA = a.label || ""; // Ensure `label` exists
              const labelB = b.label || ""; // Ensure `label` exists
              return labelA.localeCompare(labelB, undefined, {
                numeric: true,
              });
            });
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "packages",
        path: "packages",
        routeBasePath: "packages",
        includeCurrentVersion: true,
        sidebarItemsGenerator: async ({
          defaultSidebarItemsGenerator,
          ...args
        }) => {
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          // Add icons to categories
          return sidebarItems
            .map((item) => {
              if (item.type === "category") {
                switch (item.label.toLowerCase()) {        
                  case "adapters":
                    item.label = "🔌 " + item.label;
                    break;
                  case "clients":
                    item.label = "🔗 " + item.label;
                    break;
                  case "plugins":
                    item.label = "🧩 " + item.label;
                    break;
                  default:
                    item.label = "📦 " + item.label;
                }
              }
              return item;                            
            })
            .sort((a, b) => {
              const labelA = a.label || "";
              const labelB = b.label || "";
              return labelA.localeCompare(labelB, undefined, {
                numeric: true,
              });
            });
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        entryPoints: ["../packages/core/src/index.ts"],
        tsconfig: "../packages/core/tsconfig.json",
        out: "./api",
        skipErrorChecking: true,
        excludeExternals: false,
        excludePrivate: true,
        excludeProtected: false,
        excludeInternal: false,
        excludeNotDocumented: false,
        plugin: ["typedoc-plugin-markdown"],
        hideGenerator: true,
        cleanOutputDir: true,
        categorizeByGroup: true,
        pretty: true,
        includeVersion: true,
        sort: ["source-order", "required-first", "visibility"],
        gitRevision: "main",
        readme: "none",
        commentStyle: "all",
        preserveAnchorCasing: true,
        hideBreadcrumbs: false,
        preserveWatchOutput: true,
        disableSources: false,
        validation: {
          notExported: true,
          invalidLink: true,
          notDocumented: false,
        },
        exclude: [
          "**/_media/**",
          "**/node_modules/**",
          "**/dist/**",
          "**/*.test.ts",
          "**/*.spec.ts",
        ],
        watch: false,
        treatWarningsAsErrors: true,
        treatValidationWarningsAsErrors: true,
        searchInComments: true,
        navigationLinks: {
          GitHub: "https://github.com/elizaos/eliza",
          Documentation: "/docs/intro",
        },
      },
    ],
    require.resolve("docusaurus-lunr-search"),
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "api",
        path: "api",
        routeBasePath: "api",
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        showReadingTime: true,
        onUntruncatedBlogPosts: 'ignore',
        editUrl: "https://github.com/elizaos/eliza/tree/main/docs/blog/",
        blogSidebarTitle: 'Recent posts',
        blogSidebarCount: 'ALL',
        showLastUpdateAuthor: true,
        feedOptions: {
          type: 'all',
          title: 'ElizaOS Updates',
          description: 'Stay up to date with the latest from ElizaOS',
        },
        path: 'blog',
        routeBasePath: 'blog',
      },
    ],
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        blog: {
          id: 'News',
          routeBasePath: 'news',
          onUntruncatedBlogPosts: 'ignore',
          blogTitle: 'AI News',
          blogDescription: 'Automated aggregating and summarization of elizaOS ecosystem updates',
          showReadingTime: true,
          editUrl: "https://github.com/elizaos/eliza/tree/main/docs/news",
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          showLastUpdateAuthor: true,
          feedOptions: {
            type: 'all',
            title: 'ElizaOS Updates',
            description: 'Stay up to date with the latest from ElizaOS',
          },
          path: 'news',
	  routeBasePath: 'news',
        },
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/elizaos/eliza/tree/main/docs/",
          routeBasePath: "docs",
          exclude: ["**/_media/**"],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      },
    ],
  ],
  themeConfig: {
    mermaid: {
      theme: {
        light: 'default',
        dark: 'dark'
      },
      options: {
        fontSize: 16,
        flowchart: {
          htmlLabels: true,
          padding: 20,
          nodeSpacing: 50,
          rankSpacing: 50,
          curve: 'cardinal'
        }
      }
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: "eliza",
      logo: {
        alt: "Eliza Logo",
        src: "img/favicon.ico",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          type: "doc",
          docsPluginId: "api",
          position: "left",
          label: "API",
          docId: "index",
        },
        {
          type: "doc",
          docsPluginId: "packages",
          position: "left",
          label: "Packages",
          docId: "index", // You'll need to create packages/index.md
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'left'
        },
        {
          type: "doc",
          docsPluginId: "community",
          position: "left",
          label: "Community",
          docId: "index",
        },
        {
          label: "RSS",
          position: "right",
          to: '/eliza/news',
          items: [
            { label: 'RSS (XML)', href: '/eliza/news/rss.xml', target: '_blank' },
            { label: 'Atom', href: '/eliza/news/atom.xml', target: '_blank' },
            { label: 'JSON Feed', href: '/eliza/news/feed.json', target: '_blank' },
          ], 
        },
        {
          href: "https://github.com/elizaos/eliza",
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
              label: "General",
              href: "./",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/elizaos",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/elizaos",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/elizaos/eliza",
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
  customFields: {
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
  },
};

export default config;
