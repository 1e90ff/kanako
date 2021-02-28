# kanako
 
An easy way to get your Blogger blog posts through an AJAX request.

# Usage

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

// 3. Receive a new batch of posts for every request.
kanako.get()
    .then((posts) => {
        console.log(posts);
    })
    .catch((response) => {
        console.log(response);
    });

// 4. If you need, reset the index to start from the beginning again.
kanako.resetStartIndex();
```
