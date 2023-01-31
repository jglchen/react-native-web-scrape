export const scrapeList = [
  {
    id: 'reddit',
    title: 'Reddit',
    url: 'https://old.reddit.com/r/programming/',
    api: '/api/reddit',
    posts: '<p>We are collecting the list of newsfeeds on the page of <a href="https://old.reddit.com/r/programming/">https://old.reddit.com/r/programming/</a>, including <strong>news titles</strong> and <strong>linkage page URLs for the respective news</strong>. We can easily expand this app functionality to scrawl additional more pages to collect more data at the same time.</p>'
  },
  {
    id: 'iban',
    title: 'Exchange Rate',
    url: 'https://www.iban.com/exchange-rates',
    api: '/api/iban',
    posts: '<p>This is a simple web extraction demonstration. We extract the listed currency exchange rates to EURO in the page of <a href="https://www.iban.com/exchange-rates">https://www.iban.com/exchange-rates</a>, including   <strong>Currency Codes</strong>, <strong>Currency Names</strong>, and <strong>Exchange Rates (= 1EUR)</strong>. We can easily add one more field of current DateTime and save the data to databases such as MySQL, firebase, etc. to expand the application as an automatic exchange rate collection app.</p>'
  },
  {
    id: 'president',
    title: 'US Presidents',
    url: 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States',
    api: '/api/president',
    posts: '<p>We are looking for a list of 46 US Presidents and their birthdays. Starting from the page of <a href="https://en.wikipedia.org/wiki/List_of_presidents_of_the_United_States">https://en.wikipedia.org/wiki/List_of_presidents_of_the_United_States</a>, we extracted the list of linkage page URLs for the respective presidents. Then we repetitively scrape the web pages with URLs collected to obtain their birthdays. We can easily use this kind of mechanism to collect other data.</p>'
  },
  {
    id: 'restaurant',
    title: 'Seattle Restaurants',
    url: 'https://www.yellowpages.com/search?search_terms=restaurant&geo_location_terms=Seattle%2C+WA',
    api: '/api/restaurant',
    posts: '<p>We are searching for the best 30 best restaurants in Seattle listed by yellowpages.com. Starting from the page of <a href="https://www.yellowpages.com/search?search_terms=restaurant&#x26;geo_location_terms=Seattle%2C%20WA">https://www.yellowpages.com/search?search_terms=restaurant&#x26;geo_location_terms=Seattle%2C%20WA</a>, we collected the list of <strong>linkage page URLs</strong> of the respective best restaurants recommended by yellowpages.com. Then we repetitively scrape the web pages with URLs obtained to get the <strong>names</strong>, <strong>email addresses</strong>, and <strong>phone numbers</strong> of the restaurants. We can easily expand this app functionality to scrawl the data of additional more restaurants at the same time.</p><p>The target URL may only function well if your server is in North America.</p>'
  },
  {
    id: 'job',
    title: 'Stack Overflow Jobs',
    url: 'https://stackoverflow.com/jobs',
    api: '/api/job',
    posts: '<p>We are collecting Stack Overflow job listings on the page of <a href="https://stackoverflow.com/jobs">https://stackoverflow.com/jobs</a>, including <strong>job titles</strong>, <strong>linkage page URLs for the respective job</strong> and <strong>listing date</strong>. Unfortunately, the target page has already been discontinued, we still keep this scraping page to see the search results for demonstrations.</p>'
  },
  {
    id: 'hackernews',
    title: 'Hacker News',
    url: 'https://news.ycombinator.com/news',
    api: '/api/hackernews',
    posts: '<p>We are collecting the list of newsfeeds on the page of <a href="https://news.ycombinator.com/news">https://news.ycombinator.com/news</a>, including <strong>news titles</strong> and <strong>linkage page URLs for the respective news</strong>. We can easily expand this app functionality to scrawl additional more pages to collect more data at the same time.</p>'
  },
  {
    id: 'bookscraper',
    title: 'Book Scraping',
    url: 'http://books.toscrape.com',
    api: '/api/bookscraper',
    posts: '<p>We are looking for the books listed on <a href="https://books.toscrape.com/">https://books.toscrape.com/</a>. Starting from the page of <a href="https://books.toscrape.com/">https://books.toscrape.com/</a>, we collected the list of <strong>linkage page URLs</strong> of the respective books listed on the site. Then we repetitively scrape the web pages with URLs obtained to get the <strong>title</strong>, <strong>price</strong>, <strong>number of stock available</strong>, <strong>thumbnail</strong>, <strong>description</strong>, and <strong>upc</strong> of the books. For this illustration, we only collected the data of 60 books. We can easily expand this app functionality to scrawl the data of adding more books at the same time.</p>'
  },
  {
    id: 'country',
    title: 'Countries',
    url: 'https://www.scrapethissite.com/pages/simple/',
    api: '/api/country',
    posts: '<p>This is a single-page web extraction demonstration. We extract the countries of the world on the page of <a href="https://www.scrapethissite.com/pages/simple/">https://www.scrapethissite.com/pages/simple/</a>, including <strong>name</strong>, <strong>capital</strong>, <strong>population</strong>, and <strong>area</strong>.</p>'
  },
  {
    id: 'quotescrape',
    title: 'Quotes to Scrape',
    url: 'https://quotes.toscrape.com/search.aspx',
    api: '/api/quotescrape',
    posts: '<p><a href="https://quotes.toscrape.com/filter.aspx">https://quotes.toscrape.com/filter.aspx</a> is a web page for people to selectively find out what a celebrity said on a particular subject to be quoted. The page provides a list of celebrities called <strong>Author</strong> for viewers to select, once <strong>Author</strong> is chosen a list of subjects called <strong>Tag</strong> will be available on the page for people to pick up. When people selected <strong>Author</strong> and  <strong>Tag</strong>, they will find out the <strong>quotes</strong>.</p><p>This application will recursively search out all the <strong>quotes</strong> listed on the page of <a href="https://quotes.toscrape.com/filter.aspx">https://quotes.toscrape.com/filter.aspx</a>.</p>',
  }
];

//export const baseUrl = Platform.OS === 'android' ? 'http://10.4.3.121:3000' : 'http://localhost:3000';
export const baseUrl = 'https://web-scrape.vercel.app';

export function getAPIRoute(url: string){
    let elm = scrapeList.find(item => item.url == url);
    if (!elm) {
       return '';
    }
    return baseUrl + elm.api;
  }
  
  export function getTitle(url: string){
    let elm = scrapeList.find(item => item.url == url);
    if (!elm) {
      return '';
    }
    return elm.title;
  
  }
  
  export function getTableName(url: string){
    return getTitle(url).replace(/\s/g, '');
  }
  
  export function getPostsData(url: string){
    let elm = scrapeList.find(item => item.url == url);
    if (!elm){
       return '';
    }
    if (!elm.posts){
       return '';
    }
    return elm.posts.replace(/<p>/g,'<p style="font-size: 1.3rem;">'); 
  }

  export function getResultPath(url: string){
    let elm = scrapeList.find(item => item.url == url);
    if (!elm) {
       return '';
    }
    return elm.api.replace(/\/api\//,'');
  }
  
  