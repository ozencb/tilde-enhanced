class Help {
    constructor(options) {
      this._el = $.el('#help');
      this._commands = options.commands;
      this._newTab = options.newTab;
      this._toggled = false;
      this._handleKeydown = this._handleKeydown.bind(this);
      this.toggle = this.toggle.bind(this);
      this.launch = this.launch.bind(this);
      this.launchCategory = this.launchCategory.bind(this);
      this._inputEl = $.el('#search-input');
      this._inputElVal = '';
      this._suggester = options.suggester;
      this._invertColors = options.invertedColors;
      this._buildAndAppendLists();
      this._registerEvents();
      this._invertValue;
    }
  
    toggle(show) {
      this._toggled = typeof show !== 'undefined' ? show : !this._toggled;
      this._toggled ? $.bodyClassAdd('help') : $.bodyClassRemove('help');
    }
  
    hide() {
      $.bodyClassRemove('form');
      this._inputEl.value = '';
      this._inputElVal = '';
      this._suggester.suggest('');
    }
  
    launch() {
      this.hide();
      this.toggle(true);
      $.bodyClassAdd('help');
  
      CONFIG.commands.forEach(command => {
        if(command.quickLaunch) window.open(command.url);
      });
    }
  
    launchCategory(){
      
      const categorySet = new Set();
  
      CONFIG.commands.forEach(command => {
        if(command.category) categorySet.add(command.category);
      });
  
      const targetCategoryIndex = $.el('#search-input').value.replace('!', '');
      const targetCategory = Array.from(categorySet)[targetCategoryIndex - 1];
      
      CONFIG.commands.forEach(command => {
        if(targetCategory && command.category === targetCategory) window.open(command.url);
      });
    }
  
    _buildAndAppendLists() {
      const lists = document.createElement('ul');
      lists.classList.add('categories');
  
      this._getCategories().forEach(category => {
        lists.insertAdjacentHTML(
          'beforeend',
          `<li class="category">
            <h2 class="category-name">${category}</h2>
            <ul>${this._buildListCommands(category)}</ul>
          </li>`
        );
      });
  
      this._el.appendChild(lists);
    }
  
    _buildListCommands(currentCategory) {
      let invertValue = this._invertColors ? 1: 0;
  
      const bgcolor = invertValue ? getComputedStyle(document.documentElement).getPropertyValue('--foreground') 
                                  : getComputedStyle(document.documentElement).getPropertyValue('--background');
  
      const fgcolor = invertValue ? getComputedStyle(document.documentElement).getPropertyValue('--background') 
                                  : getComputedStyle(document.documentElement).getPropertyValue('--foreground');
  
  
      const commandListWithIcons =  this._commands
        .map(({ category, name, key, url, icon }, i) => {
          const iconEl = CONFIG.iconExtension !== 'svg'
                       ? `<img src='assets/icons/${icon}.png' height = 28px center style="filter: invert(${invertValue});">`
                       : `<img src='assets/icons/${icon}.svg' onload="SVGInject(this)" height = 28px center style="fill: ${fgcolor};">`
  
          if (category === currentCategory) {
            return `
              <style>
                .command-key-${i} {
                  color: ${fgcolor}; 
                  background-color:${bgcolor};
                  border: 4px solid ${fgcolor}; 
                }   
              </style>
              <li class="command">
                <a href="${url}" target="${this._newTab ? '_blank' : '_self'}">
                  <span class="command-key command-key-${i}">${iconEl}</span>
                  <span class="command-name">${name}</span>
                </a>
              </li>
            `;
          }
        })
        .join('');
  
      const commandListWithKeys = this._commands
        .map(({ category, name, key, url }, i) => {
          if (category === currentCategory) {
            return `
              <li class="command">
                <a href="${url}" target="${this._newTab ? '_blank' : '_self'}">
                      <style>
                        .command-key-${i} {
                          color: ${fgcolor}; 
                          background-color:${bgcolor};
                          border: 4px solid ${fgcolor}; 
                        }   
                      </style>
                  <span class="command-key command-key-${i}">${key}</span>
                  <span class="command-name command-name-${i}">${name}</span>
                </a>
              </li>
            `;
          }
        })
        .join('');
  
      return CONFIG.showKeys ? commandListWithKeys : commandListWithIcons;
    }
  
    _getCategories() {
      const categories = this._commands
        .map(v => v.category)
        .filter(category => category);
  
      return [...new Set(categories)];
    }
  
    _handleKeydown(e) {
      if ($.key(e) === 'escape') this.toggle(false);
    }
  
    _registerEvents() {
      document.addEventListener('keydown', this._handleKeydown);
    }
  }