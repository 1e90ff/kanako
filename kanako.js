/**
 * @typedef Post
 * @property {string} link
 * @property {string} title
 * @property {Author[]} authors
 * @property {?string} summary
 * @property {?string} content
 * @property {string} updated
 * @property {string} published
 * @property {?Thumbnail} thumbnail
 */

/**
 * @typedef Author
 * @property {string} name
 * @property {string} email
 * @property {?Thumbnail} thumbnail
 */

/**
 * @typedef Thumbnail
 * @property {string} url
 * @property {string} width
 * @property {string} height
 */

class Kanako {
    /**
     * @param {string} blogUrl - Blogger blog homepage URL.
     * @param {number} [maxResults=25] - Maximum number of posts per request, always greater than or equal to zero.
     */
    constructor(blogUrl, maxResults) {
        /**
         * @type {string}
         * @description Blogger blog homepage URL.
         */
        this.blogUrl = blogUrl;

        /**
         * @type {number}
         * @description Request index, always greater than zero.
         */
        this.startIndex = 1;
        
        /**
         * @type {number}
         * @description Maximum number of posts per request, always greater than or equal to zero.
         */
        this.maxResults = maxResults || 25;

        /**
         * @type {?string}
         * @description Filter by search term.
         */
        this.searchQuery = null;

        /**
         * @type {string}
         * @description Post content mode: "full", "summary" or "default".
         */
        this.contentMode = "default";

        /**
         * @type {?string}
         * @description Minimum update date filter in ISO 8601 notation.
         */
        this.updatedMin = null;
        
        /**
         * @type {?string}
         * @description Maximum update date filter in ISO 8601 notation.
         */
        this.updatedMax = null;
        
        /**
         * @type {?string}
         * @description Minimum published date filter in ISO 8601 notation.
         */
        this.publishedMin = null;
        
        /**
         * @type {?string}
         * @description Maximum published date filter in ISO 8601 notation.
         */
        this.publishedMax = null;
    }
    /**
     * @returns {Promise<Post[]>}
     * @description Makes a server request to get a paginated blog posts response.
     */
    get() {
        let self = this;
        
        let requestUrl = self.buildRequestUrl();
        
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            
            request.open("GET", requestUrl);  
            
            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(self.map(request.response));
                    self.updateStartIndex();
                    return;
                }

                reject(request.statusText);
            };
            
            request.onerror = () => reject(request.statusText);
            
            request.send(null);
        });
    }
    /**
     * @param {string} response
     * @returns {Post[]}
     * @description Transforms the server response to a posts array.
     */
    map(response) {
        let data = JSON.parse(response);
        return this.mapPosts(data.feed.entry);
    }
    /**
     * @param {Object[]} posts
     * @returns {Post[]}
     * @description Map the original posts array into a new one.
     */
    mapPosts(posts) {
        return posts.map((post) => this.mapPost(post));
    }
    /**
     * @param {Object} post
     * @returns {Post}
     * @description Maps the original post object into a simple one.
     */
    mapPost(post) {
        return {
            link: post.link[2].href,
            title: post.title.$t,
            authors: this.mapAuthors(post.author),
            summary: post.summary ? post.summary.$t : null,
            content: post.content ? post.content.$t : null,
            updated: post.updated.$t,
            published: post.published.$t,
            thumbnail: this.mapThumbnail(post.media$thumbnail)
        };
    }
    /**
     * @param {Object[]} authors
     * @returns {Author[]}
     * @description Maps the original authors array into a new one.
     */
    mapAuthors(authors) {
        return authors.map((author) => this.mapAuthor(author));
    }
    /**
     * @param {Object} author
     * @returns {Author}
     * @description Maps the original author object into a simple one.
     */
    mapAuthor(author) {
        return {
            name: author.name.$t,
            email: author.email.$t,
            thumbnail: this.mapThumbnail(author.gd$image)
        };
    }
    /**
     * @param {?Object} thumbnail
     * @returns {?Thumbnail}
     * @description Maps the original thumbnail object into a simple one.
     */
    mapThumbnail(thumbnail) {
        if (!thumbnail) return null;
        return {
            url: thumbnail.src || thumbnail.url,
            width: thumbnail.width,
            height: thumbnail.height
        };
    }
    /**
     * @returns {string}
     * @description Builds the URL to use in a request.
     */
    buildRequestUrl() {
        let url = `${this.blogUrl}feeds/posts/${this.contentMode}?alt=json`;
        if (this.startIndex)   url += `&start-index=${this.startIndex}`;
        if (this.maxResults)   url += `&max-results=${this.maxResults}`;
        if (this.searchQuery)  url += `&q=${encodeURIComponent(this.searchQuery)}`;
        if (this.updatedMin)   url += `&updated-min=${this.updatedMin}`;
        if (this.updatedMax)   url += `&updated-max=${this.updatedMax}`;
        if (this.publishedMin) url += `&published-min=${this.publishedMin}`;
        if (this.publishedMax) url += `&published-max=${this.publishedMax}`;
        return url;
    }
    /**
     * @description Resets the start index to make a new request since the beginning.
     */
    resetStartIndex() {
        this.startIndex = 1;
    }
    /**
     * @description Updates the start index to make a new request for the following posts.
     */
    updateStartIndex() {
        this.startIndex += this.maxResults;
    }
}
