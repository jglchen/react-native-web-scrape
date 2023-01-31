---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: home
---

This mobile app is considered the mobile version of [Web Scraping Demonstrations](https://web-scrape.vercel.app) to demonstrate web scraping cases and my expertise in web scraping. Totally 9 scraping cases are presented at this moment, they are handled in API routes with [node.js](https://nodejs.org/en/).

There are two main approaches to scraping the web: 
1. HTTP clients to query the web and data extraction
2. headless browsers

For the first approach, we use [Cheerio](https://www.npmjs.com/package/cheerio), a library using jQuery on the server side, to crawl web pages. Sites, however, now become increasingly complex, and often regular HTTP crawling won't suffice anymore, but one needs a full-fledged browser engine, to get the necessary information from a site. This is particularly true for single-page applications which heavily rely on JavaScript and dynamic and asynchronous resources. Browser automation and headless browsers come to deal with the issues. Therefore we use [Puppeteer](https://pptr.dev/) to manipulate the browser programmatically. For the cases in this demonstration, we use either way depending on the actual situations of the target pages.

**iOS** and **Android** mobile apps are developed with **React Native**, anyone who is interested can test the apps through the [Expo Publish Link](https://exp.host/@jglchen/web-scrape) with [Expo Go](https://expo.dev/client) app.

![react-native-web-scrape-screenshot](/images/react-native-web-scrape-screenshot.png)

### [React Native Expo Publish](https://expo.dev/@jglchen/web-scrape)
### [React Native GitHub](https://github.com/jglchen/react-native-web-scrape)
### [View the Web Demo](https://web-scrape.vercel.app)
### [React GitHub](https://github.com/jglchen/web-scrape)
### Docker: docker run -p 3000:3000 jglchen/web-scrape
### back To [Series Home](https://jglchen.github.io/)

{% include giscus.html %}

