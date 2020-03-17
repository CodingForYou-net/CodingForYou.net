const fs = require('fs'),
  xml2js = require('xml2js'),
  path = require('path'),
  SitemapGenerator = require('advanced-sitemap-generator');

const sitemapPath = path.join(process.cwd(), 'static/sitemap.xml');

const parser = new xml2js.Parser();
const builder = new xml2js.Builder();
const generator = SitemapGenerator('http://localhost:3000', {
  filepath: sitemapPath,
});

generator.on('done', () => {
  fs.readFile(sitemapPath, function(err, data) {
    parser.parseString(data, function(err, result) {
      result.urlset.url.forEach(
        (url) =>
          (url.loc[0] = url.loc[0].replace('http://localhost:3000', 'https://codingforyou.net')) &&
          url.loc[0].includes('fr') &&
          (url.priority[0] = (parseFloat(url.priority[0]) + 0.1).toString())
      );
      fs.writeFileSync(sitemapPath, builder.buildObject(result));
    });
  });
});

generator.start();
