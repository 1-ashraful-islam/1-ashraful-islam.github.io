---
title: Web Crawler
date: 2024-02-20
tags:
  - Node.js
  - JavaScript
---

This is the web crawler project from boot.dev backend course. The project is written in Javascript. The crawler generates a report to show internal linking profile and outputs a csv file with the results. The crawler also generates a image showing the first calls to any path thus showing a internal site map.

Check the source code in [:material-github: github repo](https://github.com/1-ashraful-islam/boot.dev-projects).

Following is an example of the csv file generated by the crawler:

```csv
Page,Visits
1-ashraful-islam.github.io,40
1-ashraful-islam.github.io/tags,32
1-ashraful-islam.github.io/projects/maze-generator-and-solver,24
1-ashraful-islam.github.io/blog,17
1-ashraful-islam.github.io/projects,17
1-ashraful-islam.github.io/projects/pong-war,11
```

Following is an example of the generated image:
![Example image](web-crawler/output-graph.png)

## Impacts

The webcrawler builds internal linking profile of a website. It can be used for SEO optimization (1), user navigation analysis (2), detecting broken links (3) among other things.
{ .annotate }

1. SEO Optimization: Internal links help search engines understand the structure and hierarchy of a website. Analyzing these links can help identify which pages are considered most important and how effectively the link structure supports SEO.
2. User Navigation Analysis: Understanding internal linking helps in analyzing how users might navigate through a site. This can lead to improvements in user experience and site architecture.
3. Detecting Broken Links: It can identify broken internal links, which are detrimental to user experience and SEO.

## Learning

I have learned more about web crawling, web scraping, and the use of Node.js. I have also learned how to use robots.txt to respect the website's crawling policy. I have also learned how to use JSDOM to parse HTML and extract links from the website. I have also learned how to use Jest for unit testing and mocking.

## Limitations

The project requires a website to be live and accessible to the crawler. It cannot crawl websites that are behind a login or require user interaction to access the content. It also does not handle JavaScript-based content, so it may not be able to crawl websites that rely heavily on client-side rendering. Also, if the website is blocked by robots.txt, the crawler will not be able to access the site.

Another limitation is that if the website have a lot of dynamic content it may produce some false positive. One of the issues I ran into was when crawling `facebook.com` some links would start appending `/help` indefinitely (1). I added a depth check to prevent this behavior but it is not a perfect solution.
{ .annotate }

1. ![Alt text](web-crawler/fb-issue.png)