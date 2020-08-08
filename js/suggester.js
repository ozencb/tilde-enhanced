class Suggester {
    constructor(options) {
      this._el = $.el('#search-suggestions');
      this._enabled = options.enabled;
      this._influencers = options.influencers;
      this._limit = options.limit;
      this._suggestionEls = [];
      this._handleKeydown = this._handleKeydown.bind(this);
      this._registerEvents();
    }
  
    setOnClick(callback) {
      this._onClick = callback;
    }
  
    setOnHighlight(callback) {
      this._onHighlight = callback;
    }
  
    setOnUnhighlight(callback) {
      this._onUnhighlight = callback;
    }
  
    success(query) {
      this._clearSuggestions();
      this._influencers.forEach(i => i.addItem(query));
    }
  
    suggest(input) {
      if (!this._enabled) return;
      input = input.trim();
      if (input === '') this._clearSuggestions();
  
      Promise.all(this._getInfluencerPromises(input)).then(res => {
        const suggestions = $.flattenAndUnique(res);
        this._clearSuggestions();
  
        if (suggestions.length) {
          this._appendSuggestions(suggestions, input);
          this._registerSuggestionHighlightEvents();
          this._registerSuggestionClickEvents();
          $.bodyClassAdd('suggestions');
        }
      });
    }
  
    _appendSuggestions(suggestions, input) {
      suggestions.some((suggestion, i) => {
        const match = new RegExp($.escapeRegex(input), 'ig');
        const suggestionHtml = suggestion.replace(match, `<b>${input}</b>`);
  
        this._el.insertAdjacentHTML(
          'beforeend',
          `<li>
            <button
              type="button"
              class="js-search-suggestion search-suggestion"
              data-suggestion="${suggestion}"
              tabindex="-1"
            >
              ${suggestionHtml}
            </button>
          </li>`
        );
  
        if (i + 1 >= this._limit) return true;
      });
  
      this._suggestionEls = $.els('.js-search-suggestion');
    }
  
    _clearSuggestionClickEvents() {
      this._suggestionEls.forEach(el => {
        el.removeEventListener('click', this._onClick);
      });
    }
  
    _clearSuggestionHighlightEvents() {
      this._suggestionEls.forEach(el => {
        el.removeEventListener('mouseover', this._highlight);
        el.removeEventListener('mouseout', this._unHighlight);
      });
    }
  
    _clearSuggestions() {
      $.bodyClassRemove('suggestions');
      this._clearSuggestionHighlightEvents();
      this._clearSuggestionClickEvents();
      this._suggestionEls = [];
      this._el.innerHTML = '';
    }
  
    _focusNext(e) {
      const exists = this._suggestionEls.some((el, i) => {
        if (el.classList.contains('highlight')) {
          this._highlight(this._suggestionEls[i + 1], e);
          return true;
        }
      });
  
      if (!exists) this._highlight(this._suggestionEls[0], e);
    }
  
    _focusPrevious(e) {
      const exists = this._suggestionEls.some((el, i) => {
        if (el.classList.contains('highlight') && i) {
          this._highlight(this._suggestionEls[i - 1], e);
          return true;
        }
      });
  
      if (!exists) this._unHighlight(e);
    }
  
    _getInfluencerPromises(input) {
      return this._influencers.map(influencer =>
        influencer.getSuggestions(input)
      );
    }
  
    _handleKeydown(e) {
      if ($.isDown(e)) this._focusNext(e);
      if ($.isUp(e)) this._focusPrevious(e);
    }
  
    _highlight(el, e) {
      this._unHighlight();
      if (!el) return;
      this._onHighlight(el.getAttribute('data-suggestion'));
      el.classList.add('highlight');
      e.preventDefault();
    }
  
    _registerEvents() {
      document.addEventListener('keydown', this._handleKeydown);
    }
  
    _registerSuggestionClickEvents() {
      this._suggestionEls.forEach(el => {
        const value = el.getAttribute('data-suggestion');
        el.addEventListener('click', this._onClick.bind(null, value));
      });
    }
  
    _registerSuggestionHighlightEvents() {
      const noHighlightUntilMouseMove = () => {
        window.removeEventListener('mousemove', noHighlightUntilMouseMove);
  
        this._suggestionEls.forEach(el => {
          el.addEventListener('mouseover', this._highlight.bind(this, el));
          el.addEventListener('mouseout', this._unHighlight.bind(this));
        });
      };
  
      window.addEventListener('mousemove', noHighlightUntilMouseMove);
    }
  
    _unHighlight(e) {
      const el = $.el('.highlight');
      if (!el) return;
      this._onUnhighlight();
      el.classList.remove('highlight');
      if (e) e.preventDefault();
    }
  }