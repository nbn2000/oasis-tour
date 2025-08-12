/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://your-domain.com',
  generateRobotsTxt: true,
  exclude: ['/admin', '/api/*'],
  transform: async (config, path) => {
    // You can tweak changefreq/priority by route
    const base = { loc: path, changefreq: 'weekly', priority: 0.7, lastmod: new Date().toISOString() };
    if (path.startsWith('/packages/')) base.priority = 0.8;
    return base;
  },
};
