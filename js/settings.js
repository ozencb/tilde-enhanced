/*
- ~! tilde ile Modal açılacak ve config.js'den gelen verilere göre ayarlar sekmesi oluşturacak
- Açılışta cookie yoksa config.js'den kopyalanarak yaratılacak, varsa o okunacak
- Sayfa açılışında da config yerine cookie okuması önceliklendirilecek
- Save butonu ile kaydedildiğinde cookie yazılıp sayfa refresh edilecek

Özellikler: 
Config json import/export 
*/

class Settings {
    constructor(options) {
        this._el = $.el('#settings');
        this._config = options.config;
        this._toggled = false;
        this._handleKeydown = this._handleKeydown.bind(this);
        this.toggle = this.toggle.bind(this);
        this._inputEl = $.el('#search-input');
        this._inputElVal = '';
        this._buildSettings();
        this._registerEvents();
    }

    toggle(show) {
        this._toggled = typeof show !== 'undefined' ? show : !this._toggled;
        this._toggled ? $.bodyClassAdd('settings') : $.bodyClassRemove('settings');
    }

    _getCategories() {
        const categories = this._config.commands
            .map(v => v.category)
            .filter(category => category);

        return [...new Set(categories)];
    }



    _buildSettings() {
        const lists = document.createElement('ul');
        lists.classList.add('settings');

        /*         this._getCategories().forEach(category => {
                    lists.insertAdjacentHTML(
                        'beforeend',
                        `<div>${category}</div>`
                    );
                });
         */
        for (let k in this._config) {
            lists.insertAdjacentHTML(
                'beforeend',
                `<div>${k} ${this._config[k]}</div>`
            );
        }
        this._el.appendChild(lists);
    }

    _registerEvents() {
        document.addEventListener('keydown', this._handleKeydown);
    }

    _handleKeydown(e) {
        if ($.key(e) === 'escape') this.toggle(false);
    }
}