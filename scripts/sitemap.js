const { writeFileSync } = require('fs')
const { SitemapStream, streamToPromise } = require('sitemap')
const smStream = new SitemapStream({ hostname: 'https://morfix.io' })

// coalesce stream to value
// alternatively you can pipe to another stream
streamToPromise(smStream).then(buffer => {
  console.log('Finished writing sitemap!')
  return writeFileSync('./build/sitemap.xml', buffer, { encoding: 'utf8' })
})

// Define public routes to include in the sitemap
smStream.write({
  url: '/',
  changefreq: 'always',
  priority: 0.8
})
smStream.write({
  url: '/product',
  changefreq: 'always',
  priority: 0.8
})
smStream.write({
  url: '/pricing',
  changefreq: 'always',
  priority: 0.6
})
smStream.write({
  url: '/sandbox',
  changefreq: 'always',
  priority: 0.7
})
smStream.write({
  url: '/auth/login',
  changefreq: 'always',
  priority: 0.4
})
smStream.write({
  url: '/auth/logout',
  changefreq: 'always',
  priority: 0.1
})
smStream.write({
  url: '/auth/register',
  changefreq: 'always',
  priority: 0.5
})

// indicate there is nothing left to write
smStream.end()
