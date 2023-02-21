const fs = require('fs');

const summary = require(`${__dirname}/report/lighthouse/summary.json`)


const rows = ['Site,Lighthouse Score,Overall Performance,Overall Accessibility,Overall Best Practices,Overall SEO,LCP,CLS,TTI,Speed Index'];
summary.forEach((site) => {
  const report = require(`${__dirname}/report/lighthouse/${site.file}`);
  rows.push([
    site.url,
    site.score,
    site.detail.performance,
    site.detail.accessibility,
    site.detail['best-practices'],
    site.detail.seo,
    `${(report.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2)}s`,
    report.audits['cumulative-layout-shift'].numericValue.toFixed(2),
    `${(report.audits['interactive'].numericValue / 1000).toFixed(2)}s`,
    `${(report.audits['speed-index'].numericValue / 1000).toFixed(2)}s`,
  ].join(','));
});

rows.push(`
\n
Largest Contentful Paint (LCP) marks the time at which the largest text or image is painted. [Learn more](https://web.dev/lighthouse-largest-contentful-paint/)
Cumulative Layout Shift (CLS) measures the movement of visible elements within the viewport. [Learn more](https://web.dev/cls/).
Time to interactive (TTI) is the amount of time it takes for the page to become fully interactive. [Learn more](https://web.dev/interactive/).
Speed Index shows how quickly the contents of a page are visibly populated. [Learn more](https://web.dev/speed-index/).
`)

fs.writeFileSync('summary.csv', rows.join('\n'));
