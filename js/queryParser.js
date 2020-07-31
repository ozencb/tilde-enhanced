class QueryParser {
    constructor(options) {
      this._commands = options.commands;
      this._searchDelimiter = options.searchDelimiter;
      this._pathDelimiter = options.pathDelimiter;
      this._protocolRegex = /^[a-zA-Z]+:\/\//i;
      this._urlRegex = /^((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/i;
      this.parse = this.parse.bind(this);
    }
  
    parse(query) {
      const res = { query: query, split: null };
  
      if (this._urlRegex.test(query)) {
        const hasProtocol = this._protocolRegex.test(query);
        res.redirect = hasProtocol ? query : 'http://' + query;
      } else {
        const trimmed = query.trim();
        const splitSearch = trimmed.split(this._searchDelimiter);
        const splitPath = trimmed.split(this._pathDelimiter);
  
        this._commands.some(({ category, key, name, search, url }) => {
          if (query === key) {
            res.key = key;
            res.isKey = true;
            res.redirect = url;
            return true;
          }
  
          if (splitSearch[0] === key && search) {
            res.key = key;
            res.isSearch = true;
            res.split = this._searchDelimiter;
            res.query = QueryParser._shiftAndTrim(splitSearch, res.split);
            res.redirect = QueryParser._prepSearch(url, search, res.query);
            return true;
          }
  
          if (splitPath[0] === key) {
            res.key = key;
            res.isPath = true;
            res.split = this._pathDelimiter;
            res.path = QueryParser._shiftAndTrim(splitPath, res.split);
            res.redirect = QueryParser._prepPath(url, res.path);
            return true;
          }
  
          if (key === '*') {
            res.redirect = QueryParser._prepSearch(url, search, query);
          }
        });
      }
  
      res.color = QueryParser._getColorFromUrl(this._commands, res.redirect);
      return res;
    }
  
    static _getColorFromUrl(commands, url) {
      const domain = new URL(url).hostname;
  
      return (
        commands
          .filter(c => new URL(c.url).hostname.includes(domain))
          .map(c => c.color)[0] || null
      );
    }
  
    static _prepPath(url, path) {
      return QueryParser._stripUrlPath(url) + '/' + path;
    }
  
    static _prepSearch(url, searchPath, query) {
      if (!searchPath) return url;
      const baseUrl = QueryParser._stripUrlPath(url);
      const urlQuery = encodeURIComponent(query);
      searchPath = searchPath.replace('{}', urlQuery);
      return baseUrl + searchPath;
    }
  
    static _shiftAndTrim(arr, delimiter) {
      arr.shift();
      return arr.join(delimiter).trim();
    }
  
    static _stripUrlPath(url) {
      const parser = document.createElement('a');
      parser.href = url;
      return `${parser.protocol}//${parser.hostname}`;
    }
  }