const CONFIG = {
    /**
     * The category, name, key, url, search path, color, icon, and quicklaunch properties for your commands.
     * Icons must be added to "icons" folder and their values/names must be updated.
     * If none of the specified keys are matched, the '*' key is used.
     * Commands without a category don't show up in the help menu.
     * Update line 11 and 13 if you prefer using Google.
     */
    commands: [
      {
        name: 'Duckduckgo',
        key: '*',
        url: 'https://duckduckgo.com',
        search: '/?q={}'
      },
      {
        category: 'General',
        name: 'Mail',
        key: 'm',
        url: 'https://gmail.com',
        search: '/#search/text={}',
        color: 'linear-gradient(135deg, #dd5145, #dd5145)',
        icon: 'mail',
        quickLaunch: true,
      },
      {
        category: 'General',
        name: 'Drive',
        key: 'd',
        url: 'https://drive.google.com',
        search: '/drive/search?q={}',
        color: 'linear-gradient(135deg, #FFD04B, #1EA362, #4688F3)',
        icon: 'drive',
        quickLaunch: false,
      },
      {
        category: 'General',
        name: 'LinkedIn',
        key: 'l',
        url: 'https://linkedin.com',
        search: '/search/results/all/?keywords={}',
        color: 'linear-gradient(135deg, #006CA4, #0077B5)',
        icon: 'linkedin',
        quickLaunch: true,
      },
      {
        category: 'Tech',
        name: 'GitHub',
        key: 'g',
        url: 'https://github.com',
        search: '/search?q={}',
        color: 'linear-gradient(135deg, #2b2b2b, #3b3b3b)',
        icon: 'github',
        quickLaunch: true,
      },
      {
        category: 'Tech',
        name: 'StackOverflow',
        key: 's',
        url: 'https://stackoverflow.com',
        search: '/search?q={}',
        color: 'linear-gradient(135deg, #53341C, #F48024)',
        icon: 'stackoverflow',
        quickLaunch: true,
      },
      {
        category: 'Tech',
        name: 'HackerNews',
        key: 'h',
        url: 'https://news.ycombinator.com/',
        search: '/search?stories[query]={}',
        color: 'linear-gradient(135deg, #FF6600, #DC5901)',
        icon: 'hackernews',
        quickLaunch: true,
      },
      {
        category: 'Fun',
        name: 'YouTube',
        key: 'y',
        url: 'https://youtube.com',
        search: '/results?search_query={}',
        color: 'linear-gradient(135deg, #cd201f, #cd4c1f)',
        icon: 'youtube',
        quickLaunch: false,
      },
      {
        category: 'Fun',
        name: 'Netflix',
        key: 'n',
        url: 'https://www.netflix.com',
        color: 'linear-gradient(135deg, #E50914, #CB020C)',
        icon: 'netflix',
        quickLaunch: false,
      },
      {
        category: 'Fun',
        name: 'Twitch',
        key: 'tw',
        url: 'https://www.twitch.tv',
        search: '/directory/game/{}',
        color: 'linear-gradient(135deg, #6441a5, #4b367c)',
        icon: 'twitch',
        quickLaunch: false,
      },
      {
        category: 'Other',
        name: 'Reddit',
        key: 'r',
        url: 'https://reddit.com',
        search: '/search?q={}',
        color: 'linear-gradient(135deg, #FF8456, #FF4500)',
        icon: 'reddit',
        quickLaunch: false,
      },
      {
        category: 'Other',
        name: 'Twitter',
        key: 't',
        url: 'https://twitter.com',
        search: '/search?q={}&src=typed_query',
        color: 'linear-gradient(135deg, #1DA1F2, #19608F)',
        icon: 'twitter',
        quickLaunch: true,
      },
      {
        category: 'Other',
        name: 'IMDb',
        key: 'i',
        url: 'https://imdb.com',
        search: '/find?ref_=nv_sr_fn&q={}',
        color: 'linear-gradient(135deg, #7A5F00, #E8B708)',
        icon: 'imdb',
        quickLaunch: false,
      },
    ],
  
    /**
     * Get suggestions as you type.
     */
    suggestions: true,
    suggestionsLimit: 4,
  
    /**
     * The order and limit for each suggestion influencer. An "influencer" is
     * just a suggestion source. The following influencers are available:
     *
     * - "Commands" suggestions come from CONFIG.commands
     * - "Default" suggestions come from CONFIG.defaultSuggestions
     * - "DuckDuckGo" suggestions come from the duck duck go search api
     * - "History" suggestions come from your previously entered queries
     */
    influencers: [
      { name: 'Commands', limit: 2},
      { name: 'Default', limit: 4 },
      { name: 'History', limit: 1 },
      { name: 'DuckDuckGo', limit: 4 },
    ],
  
    /**
     * Default search suggestions for the specified queries.
     */
    defaultSuggestions: {
      g: ['g/issues', 'g/pulls', 'gist.github.com'],
      r: ['r/r/unixporn', 'r/r/startpages', 'r/r/webdev', 'r/r/technology'],
    },
  
    /**
     * Instantly redirect when a key is matched. Put a space before any other
     * queries to prevent unwanted redirects.
     */
    instantRedirect: false,
  
    /**
     * Open triggered queries in a new tab.
     */
    newTab: false,
  
    /**
     * Dynamic overlay background colors when command domains are matched.
     */
    colors: true,
  
    /**
     * Invert color theme
     */
    invertedColors: false,
  
    /**
     * Show keys instead of icons
     */
    showKeys: false,
  
    /**
     * The delimiter between a command key and your search query. For example,
     * to search GitHub for potatoes, you'd type "g:potatoes".
     */
    searchDelimiter: ':',
  
    /**
     * The delimiter between a command key and a path. For example, you'd type
     * "r/r/unixporn" to go to "https://reddit.com/r/unixporn".
     */
    pathDelimiter: '/',
  
    /**
     * The delimiter between the hours and minutes on the clock.
     */
    clockDelimiter: ' ',
  
    /**
     * Show a twenty-four-hour clock instead of a twelve-hour clock with AM/PM.
     */
    twentyFourHourClock: true,
  
    /**
     * File extension for icon images
     */
     iconExtension: 'png'
  };