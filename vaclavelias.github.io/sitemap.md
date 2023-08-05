---
permalink: /sitemap.xml
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {% for page in collections.all %}{% unless page.url contains ".css" or page.url contains ".js" or page.url contains "tags.html" or page.url contains "archive.html" or page.url contains "about.html" %}
  <url>
    <loc>{{ site.url }}{{ page.url | url }}</loc>
  </url>
  {% endunless %}{% endfor %}
</urlset>