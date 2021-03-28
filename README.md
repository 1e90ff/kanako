# kanako.js
 
An easy way to get your Blogger blog posts through an AJAX request.

## Usage

```javascript
// 1. Create a new instance passing your blog homepage URL.
var kanako = new Kanako("https://myblog.blogspot.com/");

// 2. Optionally set up your desired request parameters.

// 2.1 Maximum number of posts per request. 
kanako.maxResults   = 25;

// 2.2 Post content mode: "full", "summary" or "default".
kanako.contentMode  = "summary";

// 2.3 Filter by updated-date range.
kanako.updatedMin   = "2021-01-01T00:00:00.000Z";
kanako.updatedMax   = "2021-01-31T23:59:59.999Z";

// 2.4 Filter by published-date range.
kanako.publishedMin = "2021-01-01T00:00:00.000Z";
kanako.publishedMax = "2021-01-31T23:59:59.999Z";

// 2.5 Filter by search term.
kanako.searchQuery  = "blogger";

// 3. Receive a new batch of posts for every request.
kanako.get()
    .then(posts => console.log(posts))
    .catch(response => console.error(`Something happened: ${response}.`));

// 4. If you need, reset the index to start from the beginning again.
kanako.resetStartIndex();
```

## Response example

````javascript
[
  {
    link: "https://myblog.blogspot.com/2021/03/lorem-ipsum.html",
    title: "Lorem ipsum",
    authors: [
      {
        name: "John Doe",
        email: "noreply@blogger.com",
        thumbnail: {
          url: "//2.bp.blogspot.com/-Dc8FIa4We5g/Xuq5wh7bVKI/AAAAAAAAB2A/Mf3OCbe39C0v4iuViKHn5lnNnBiHXOAwACK4BGAYYCw/s32-c/avatar.jpg",
          width: "32",
          height: "32"
        }
      }
    ],
    summary: "Lorem ipsum dolor sit amet consectetur adipiscing elit venenatis, vulputate tristique ultricies lobortis libero class nunc enim, scelerisque malesuada felis mattis ridiculus turpis neque.",
    content: null,
    updated: "2021-03-03T00:00:00.000-00:00",
    published: "2021-03-01T00:00:00.000-00:00",
    thumbnail: {
      url: "https://1.bp.blogspot.com/-Dc8FIa4We5g/Xuq5wh7bVKI/AAAAAAAAB2A/Mf3OCbe39C0v4iuViKHn5lnNnBiHXOAwACK4BGAYYCw/s72-c/featured.jpg",
      width: "72",
      height: "72"
    }
  }
]
```
