const $ = {
    bodyClassAdd: c => $.el('body').classList.add(c),
    bodyClassRemove: c => $.el('body').classList.remove(c),
    el: s => document.querySelector(s),
    els: s => [].slice.call(document.querySelectorAll(s) || []),
    escapeRegex: s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
    flattenAndUnique: arr => [...new Set([].concat.apply([], arr))],
    ieq: (a, b) => a.toLowerCase() === b.toLowerCase(),
    iin: (a, b) => a.toLowerCase().indexOf(b.toLowerCase()) !== -1,
    isDown: e => ['c-n', 'down', 'tab'].includes($.key(e)),
    isRemove: e => ['backspace', 'delete'].includes($.key(e)),
    isUp: e => ['c-p', 'up', 's-tab'].includes($.key(e)),
  
    jsonp: url => {
      let script = document.createElement('script');
      script.src = url;
      $.el('head').appendChild(script);
    },
  
    key: e => {
      const ctrl = e.ctrlKey;
      const shift = e.shiftKey;
  
      switch (e.which) {
        case 8:
          return 'backspace';
        case 9:
          return shift ? 's-tab' : 'tab';
        case 13:
          return ctrl ? 'c-enter' : 'enter';
        case 16:
          return 'shift';
        case 17:
          return 'ctrl';
        case 18:
          return 'alt';
        case 27:
          return 'escape';
        case 38:
          return 'up';
        case 40:
          return 'down';
        case 46:
          return 'delete';
        case 78:
          return ctrl ? 'c-n' : 'n';
        case 80:
          return ctrl ? 'c-p' : 'p';
        case 189:
          return 'dash';
        case 91:
        case 93:
        case 224:
          return 'super';
      }
    },
  
    pad: v => ('0' + v.toString()).slice(-2),
  };