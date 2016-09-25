// -------------
// Nav Functions
// -------------

(function() {
  var nav = document.querySelector('.js-nav');
  var navTrigger = document.querySelector('.js-nav__trigger');
  var navLinkContainer = document.querySelector('.js-nav__link-container');

  window.onscroll = function() {
    if (nav && window.pageYOffset > 0) {
      nav.classList.add('nav--bg');
    }
    else if (nav) {
      nav.classList.remove('nav--bg');
    }
  };

  navTrigger.onclick = function() {
    if (nav && window.pageYOffset <= 0) {
      nav.classList.toggle('nav--bg');
    }
    navLinkContainer.classList.toggle('nav__link-container--active');
  };
}());

// --------------
// Maps Functions
// --------------

(function() {
  var map;
  google.maps.event.addDomListener(window, 'load', init);

  function init() {
    var mapOptions = {
      center: new google.maps.LatLng(44.60671042194777, -63.61955169999999),
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
      },
      disableDoubleClickZoom: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      },
      scaleControl: true,
      scrollwheel: true,
      panControl: true,
      streetViewControl: true,
      draggable: true,
      overviewMapControl: true,
      overviewMapControlOptions: {
        opened: false,
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{
        'featureType': 'landscape',
        'stylers': [{
          'hue': '#F1FF00'
        }, {
          'saturation': -27.4
        }, {
          'lightness': 9.4
        }, {
          'gamma': 1
        }]
      }, {
        'featureType': 'road.highway',
        'stylers': [{
          'hue': '#0099FF'
        }, {
          'saturation': -20
        }, {
          'lightness': 36.4
        }, {
          'gamma': 1
        }]
      }, {
        'featureType': 'road.arterial',
        'stylers': [{
          'hue': '#00FF4F'
        }, {
          'saturation': 0
        }, {
          'lightness': 0
        }, {
          'gamma': 1
        }]
      }, {
        'featureType': 'road.local',
        'stylers': [{
          'hue': '#FFB300'
        }, {
          'saturation': -38
        }, {
          'lightness': 11.2
        }, {
          'gamma': 1
        }]
      }, {
        'featureType': 'water',
        'stylers': [{
          'hue': '#00B6FF'
        }, {
          'saturation': 4.2
        }, {
          'lightness': -63.4
        }, {
          'gamma': 1
        }]
      }, {
        'featureType': 'poi',
        'stylers': [{
          'hue': '#9FFF00'
        }, {
          'saturation': 0
        }, {
          'lightness': 0
        }, {
          'gamma': 1
        }]
      }],
    };
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var locations = [
      ['Rockingstone Rd. Entrance',44.6056716, -63.61955169999999,
        'https://mapbuildr.com/assets/img/markers/ellipse-green.png'
      ],
      ['Urban Farm', 44.60671042194777, -63.61896161401671,
        'https://mapbuildr.com/assets/img/markers/solid-pin-green.png'
      ],
      ['1st Path Entrance', 44.60600769148662, -63.618618291262806,
        'https://mapbuildr.com/assets/img/markers/ellipse-green.png'
      ],
      ['2nd Path Entrance', 44.60680208181595, -63.61794237459105,
        'https://mapbuildr.com/assets/img/markers/ellipse-green.png'
      ]
    ];
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        icon: locations[i][3],
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        title: locations[i][0],
      });
      link = '';
      bindInfoWindow(marker, map, locations[i][0]);
    }

    function bindInfoWindow(marker, map, title) {
      var infoWindowVisible = (function() {
        var currentlyVisible = false;
        return function(visible) {
          if (visible !== undefined) {
            currentlyVisible = visible;
          }
          return currentlyVisible;
        };
      }());
      iw = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function() {
        var html;
        if (infoWindowVisible()) {
          iw.close();
          infoWindowVisible(false);
        }
        else {
          html =
            '<div style=color:#000;background-color:#fff;padding:5px;width:150px;><h4>' +
            title + '</h4></div>';
          iw = new google.maps.InfoWindow({
            content: html
          });
          iw.open(map, marker);
          infoWindowVisible(true);
        }
      });
      google.maps.event.addListener(iw, 'closeclick', function() {
        infoWindowVisible(false);
      });
    }
    google.maps.event.addDomListener(window, 'resize', function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
    });

    map.getDiv().firstChild.style.top = '0';
  }
}());
