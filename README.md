[![GitHub Issues](https://img.shields.io/github/issues/Ozencb/tilde-enhanced)](https://github.com/Ozencb/tilde-enhanced/issues)
[![Stars](https://img.shields.io/github/stars/Ozencb/tilde-enhanced)](https://github.com/Ozencb/tilde-enhanced)
[![Forks](https://img.shields.io/github/forks/Ozencb/tilde-enhanced)](https://github.com/Ozencb/tilde-enhanced)
[![Unlicense](https://img.shields.io/github/license/Ozencb/tilde-enhanced)](../master/LICENSE)

# Tilde Enhanced

Based on [Cade Scroggins](https://github.com/cadejscroggins)'s [Tilde](https://github.com/cadejscroggins/tilde).

## Screenshots 

![Screenshot](assets/screenshot.png)


## Added Features
Most of the features are carried over from the original source.
Few of the added features are:

- A launch category functionality, which launches every site in a category. Enter a category index number followed by `!`, i.e. `2!` would launch everything under the second category. 
- A "Quick Launch" functionality, which launches every site with `quickLaunch` property set to `true` upon entering `q!`.
- An invertible color theme. Either edit config or use `invert!` command.
- Show image or SVG as bookmark icon
- An option to show launch keys instead of icons. Either edit config or type `keys!`.

## Usage

To use Tilde as your homepage, simply set your browser's home URL to
Tilde's index file.
To go to a site, enter the first letter of the site then hit enter.
To view the available sites, press `?` or click on the clock.
If your input doesn't match any of the commands,
a generic DuckDuckGo search will be triggered. For example:

- Entering `r` would redirect you to [www.reddit.com](https://www.reddit.com).
- Entering `t` would redirect you to [twitch.tv](https://www.twitch.tv).
- Entering `cats` would search [Cats](https://duckduckgo.com/?q=cats).

Note that by default, queries are searched on DuckDuckGo but this can be
configured easily by updating two lines on. Check [Configuration](#configuration) for details.

You might have to allow pop-ups for your homepage to use quick launch feature.

This version is not suitable for use on mobile as clicking on the clock will
only bring up pre-defined sites.

### Searching

You can search any of the sites by typing a colon after the site's key, followed
by your search query. For example:

- Entering `g:tilde-enhanced` would search
  [GitHub for tilde-enhanced](https://github.com/search?q=tilde-enhanced).
- Entering `y:cats` would search
  [Cats on YouTube](https://www.youtube.com/results?search_query=cats).

### Specific Locations

You can go to a specific location on a site by typing a forward slash after the
site's key, followed by the location on the site you'd like to be redirected to.
For example:

- Entering `r/r/startpages` would redirect you to
  [www.reddit.com/r/startpages](https://www.reddit.com/r/startpages)
- Entering `h/popular` would redirect you to
  [hypem.com/popular](http://hypem.com/popular).

### URL Redirects

If you enter in a full domain or URL, you will be redirected to said domain or
URL. For example:

- Entering `stallman.org` would redirect you to
  [stallman.org](https://stallman.org/).
- Entering `keep.google.com` would redirect you to
  [keep.google.com](https://keep.google.com/).

You can also use `Ctrl + Enter` key combination to launch the query with a `.com` TLD.

### Query Paramater

Additionally, you can pass any query via the `q` query param. For example:

- Going to `file:///path/to/tilde/index.html?q=cats` would search
  [Cats](https://duckduckgo.com/?q=cats).

This allows you to invoke Tilde with your native browser search bar.

## Configuration

Open up the [config.js](js/config.js) file and read through the `CONFIG`!

## Setting it up for new tabs on Firefox

By default Firefox won't let you set a custom URL for new tabs but there is a work-around to circumvent the problem.

You can follow [Urimu's Guide](https://github.com/Urimu/Startpage#setting-it-up-on-firefox) to set your new tab to launch custom URLs.

## License

Feel free to [use this and modify it however you like](https://github.com/Ozencb/tilde-enhanced/blob/master/LICENSE).
