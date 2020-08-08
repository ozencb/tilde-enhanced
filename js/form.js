class Form {
    constructor(options) {
      this._colors = options.colors;
      this._formEl = $.el('#search-form');
      this._inputEl = $.el('#search-input');
      this._inputElVal = '';
      this._instantRedirect = options.instantRedirect;
      this._newTab = options.newTab;
      this._parseQuery = options.parseQuery;
      this._suggester = options.suggester;
      this._toggleHelp = options.toggleHelp;
      this._quickLaunch = options.quickLaunch;
      this._categoryLaunch = options.categoryLaunch;
      this._clearPreview = this._clearPreview.bind(this);
      this._handleInput = this._handleInput.bind(this);
      this._handleKeydown = this._handleKeydown.bind(this);
      this._previewValue = this._previewValue.bind(this);
      this._submitForm = this._submitForm.bind(this);
      this._submitWithValue = this._submitWithValue.bind(this);
      this._invertColors = options.invertedColors;
      this.hide = this.hide.bind(this);
      this.show = this.show.bind(this);
      this._registerEvents();
      this._loadQueryParam();
      this.invert();
      this.isCtrlEnter = false;
    }
  
    hide() {
      $.bodyClassRemove('form');
      this._inputEl.value = '';
      this._inputElVal = '';
      this._suggester.suggest('');
      this._setBackgroundFromQuery('');
    }
  
    show() {
      $.bodyClassAdd('form');
      this._inputEl.focus();
    }
  
    invert() {
      if (this._invertColors) {
        const bgcolor = getComputedStyle(document.documentElement).getPropertyValue('--background');
        const fgcolor = getComputedStyle(document.documentElement).getPropertyValue('--foreground');
        document.documentElement.style.setProperty('--background', fgcolor);
        document.documentElement.style.setProperty('--foreground', bgcolor);    
      }
    }
  
    _invertConfig() {
      let isInverted = !CONFIG.invertedColors;
      localStorage.removeItem('invertColorCookie');
      localStorage.setItem('invertColorCookie', JSON.stringify(isInverted));
      location.reload();
    }
  
    _showKeysConfig() {
      let isShowKeys = !CONFIG.showKeys;
      localStorage.removeItem('showKeysCookie');
      localStorage.setItem('showKeysCookie', JSON.stringify(isShowKeys));
      location.reload();
    }
  
    _clearPreview() {
      this._previewValue(this._inputElVal);
      this._inputEl.focus();
    }
  
    _isCategoryLaunch(num){
      if(/^\d/.test(num[0]) && num[1] === '!'){
        return true
      } else {
        return false;
      }
    }
  
    _handleInput() {
      const newQuery = this._inputEl.value;
      const isHelp = newQuery === '?';
      const isLaunch = newQuery === 'q!';
      const isInvert = newQuery === 'invert!';
      const isShowKeys = newQuery === 'keys!';
      const isCategoryLaunch = this._isCategoryLaunch(newQuery);
      const { isKey } = this._parseQuery(newQuery);
      this._inputElVal = newQuery;
      this._suggester.suggest(newQuery);
      this._setBackgroundFromQuery(newQuery);
      if (!newQuery || isHelp) this.hide();
      if (isHelp) this._toggleHelp();
      if (isLaunch) this._quickLaunch();
      if (isInvert) this._invertConfig();
      if (isShowKeys) this._showKeysConfig();
      if (isCategoryLaunch) this._categoryLaunch();
      if (this._instantRedirect && isKey) this._submitWithValue(newQuery);
    }
  
  
    _handleKeydown(e) {
      if ($.isUp(e) || $.isDown(e) || $.isRemove(e)) return;
      
      switch ($.key(e)) {
        case 'alt':
        case 'ctrl':
        case 'enter':       
        case 'shift':
        case 'super':
          return;
        case 'escape':
          this.hide();
          return;
        case 'c-enter':
          this.isCtrlEnter = true;
      }
  
      this.show();
    }
  
    _loadQueryParam() {
      const q = new URLSearchParams(window.location.search).get('q');
      if (q) this._submitWithValue(q);
    }
  
    _previewValue(value) {
      this._inputEl.value = value;
      this._setBackgroundFromQuery(value);
    }
  
    _redirect(redirect) {
      if (this._newTab) window.open(redirect, '_blank');
      else window.location.href = redirect;
    }
  
    _registerEvents() {
      document.addEventListener('keydown', this._handleKeydown);
      this._inputEl.addEventListener('input', this._handleInput);
      this._formEl.addEventListener('submit', this._submitForm, false);
  
      if (this._suggester) {
        this._suggester.setOnClick(this._submitWithValue);
        this._suggester.setOnHighlight(this._previewValue);
        this._suggester.setOnUnhighlight(this._clearPreview);
      }
    }
  
    _setBackgroundFromQuery(query) {
      if (!this._colors) return;
      this._formEl.style.background = this._parseQuery(query).color;
    }
  
    _submitForm(e) {
      if (e) e.preventDefault();
      let query = this._inputEl.value;
      if (this._suggester) this._suggester.success(query);
      this.hide();
      if (this.isCtrlEnter) query += '.com';
      this._redirect(this._parseQuery(query).redirect);
    }
  
    _submitWithValue(value) {
      this._inputEl.value = value;
      this._submitForm();
    }
  }