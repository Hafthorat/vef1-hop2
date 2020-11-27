(function (dateFns) {
  'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  /**
   * Sækja gögn frá
   * https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
   *
   * sér í lagi, alla jarðskjálfta 4,5+ seinustu 7 daga:
   * https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
   *
   * Ath, í verkefni er afrit af gögnum í `./4.5_week.geojson`, gott
   * að nota það á meðan þróun stendur en skipta svo út.
   */
  //const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
  var URL = './videos.json';
  function fetchVideos() {
    return _fetchVideos.apply(this, arguments);
  }

  function _fetchVideos() {
    _fetchVideos = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var result, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch(URL);

            case 3:
              result = _context.sent;
              _context.next = 10;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              console.error('Villa við að sækja', _context.t0);
              return _context.abrupt("return", null);

            case 10:
              if (result.ok) {
                _context.next = 17;
                break;
              }

              _context.t1 = console;
              _context.next = 14;
              return result.text();

            case 14:
              _context.t2 = _context.sent;

              _context.t1.error.call(_context.t1, 'Ekki 200 svar', _context.t2);

              return _context.abrupt("return", null);

            case 17:
              _context.next = 19;
              return result.json();

            case 19:
              data = _context.sent;
              return _context.abrupt("return", data);

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    }));
    return _fetchVideos.apply(this, arguments);
  }

  /**
   * Create an element with attributes and events, and append elements or
   * strings to it.
   *
   * Usage:
   *  const el = element(
   *    'button',
   *    { 'class': 'button' },
   *    { click: () => { ... } },
   *    'Takki'
   *   );
   *  returns
   *  <button class="button">Takki</button> with a click handler.
   *
   * @param {string} name Element name
   * @param {object} attributes Object containing attributes to attach to element.
   * @param {object} events Object of events to add to element.
   * @param  {...any} children List of elements or strings to append to element.
   * @returns {object} HTML element.
   */

  function element(name) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var events = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var el = document.createElement(name);

    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    for (var _i = 0, _children = children; _i < _children.length; _i++) {
      var child = _children[_i];

      if (!child) {
        continue;
      }

      if (attributes) {
        for (var attrib in attributes) {
          console.log('attrib :>> ', attrib);
          el.setAttribute(attrib, attributes[attrib]);
        }
      }

      if (events) {
        for (var event in events) {
          el.addEventListener(event, events[event]);
        }
      }

      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else {
        el.appendChild(child);
      }
    }

    return el;
  }
  /**
   * Simplified element function.
   * Creates an element and append elements or strings to it.
   *
   * @param {string} name Element name
   * @param  {...any} children List of elements or strings to append to element.
   * @returns {object} HTML element.
   */

  function el(name) {
    for (var _len2 = arguments.length, children = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      children[_key2 - 1] = arguments[_key2];
    }

    return element.apply(void 0, [name, null, null].concat(children));
  }
  /**
   * Format a timestamp as dd.mm.yyyy hh:mm:ss e.g. "01.11.2020 12:00:00".
   *
   * @param {number} timestamp Unix timestamp to format
   * @returns {string} Formatted string.
   */

  function formatDate(timestamp) {
    // Útfæra með „vanilla JS“ eða nota date-fns pakka
    return dateFns.format(new Date(timestamp), 'dd.MM.yyyy HH:mm:ss');
  }

  document.addEventListener('DOMContentLoaded', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var videos, loading, parent, ul, map;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetchVideos();

          case 2:
            videos = _context.sent;
            // Fjarlægjum loading skilaboð eftir að við höfum sótt gögn
            loading = document.querySelector('.loading');
            parent = loading.parentNode;
            parent.removeChild(loading);

            if (!videos) {
              parent.appendChild(el('p', 'Villa við að sækja gögn'));
            }

            ul = document.querySelector('.earthquakes');
            map = document.querySelector('.map');
            init(map);
            earthquakes.forEach(function (quake) {
              var _quake$properties = quake.properties,
                  title = _quake$properties.title,
                  mag = _quake$properties.mag,
                  time = _quake$properties.time,
                  url = _quake$properties.url;
              var link = element('a', {
                href: url,
                target: '_blank'
              }, null, 'Skoða nánar');
              var markerContent = el('div', el('h3', title), el('p', formatDate(time)), el('p', link));
              var marker = createPopup(quake.geometry, markerContent.outerHTML);

              var onClick = function onClick() {
                marker.openPopup();
              };

              var li = el('li');
              li.appendChild(el('div', el('h2', title), el('dl', el('dt', 'Tími'), el('dd', formatDate(time)), el('dt', 'Styrkur'), el('dd', "".concat(mag, " \xE1 richter")), el('dt', 'Nánar'), el('dd', url.toString())), element('div', {
                'class': 'buttons'
              }, null, element('button', null, {
                'click': onClick
              }, 'Sjá á korti'), link)));
              ul.appendChild(li);
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));

}(dateFns));
//# sourceMappingURL=bundle.js.map
