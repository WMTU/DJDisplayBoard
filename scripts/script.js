function refresh_ticker() {
  // slide to the left
  var $marginLefty = $('#ticker-text');
  $marginLefty.animate({
    marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ?
      $marginLefty.outerWidth() :
      0
  }, 600, load_ticker);
};  

function load_ticker() {
  // Do the Thing Here
  $('#ticker-span').load('./ticker.php', '', show_ticker);
};

function show_ticker() {
  // Fix the text
  $('#ticker-text').textfill({maxFontPixels: 64});
  $('#ticker-text').css('margin-top', (parseInt($('#ticker').height(),10) - parseInt($('#ticker-span').height(),10))/2);
  
  // now slide to the right
  var $marginLefty = $('#ticker-text');
  $marginLefty.animate({
    marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ?
      $marginLefty.outerWidth() :
      0
  }, 600);
  
  //repeat
  setTimeout(refresh_ticker,5000);
};

function refresh_weather() {
  // Forming the query for Yahoo's weather forecasting API with YQL
  // http://developer.yahoo.com/weather/

  var APPID = '',
  DEG = 'f',
  woeid = '12779656',
  code='MI', 
  city = 'Houghton',
  wsql = 'select * from weather.forecast where woeid=WID and u="'+DEG+'"',
  weatherYQL = 'http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent(wsql)+'&format=json&callback=?';
  
  // Make a weather API request (it is JSONP, so CORS is not an issue):
  $.getJSON(weatherYQL.replace('WID',woeid), function(r){
    if(r.query.count == 1){
      // Create the weather items in the #scroller UL
      var item = r.query.results.channel;
      
      //get wind, atmosphere
      $('#wind').html(Math.round(item.wind.speed) + item.units.speed);
      $('#humidity').html(item.atmosphere.humidity + "%");
      
      //cut out some path
      item = item.item;
      
      //get current temp
      $('#degrees').html(item.condition.temp);

      //Image Code
      switch (parseInt(item.condition.code)) {
        case 3: //Severe thunderstorm
          
        case 4: //thunderstorms
          $("#weather-icon").attr('class', 'wi wi-thunderstorm');
          break;
        case 5: //mixed rain and snow

        case 6: //mixed rain and sleet
          
        case 7: //mixed snow and sleet
          $("#weather-icon").attr('class', 'wi wi-thunderstorm');
          break;
        case 8: //freezing drizzle
          
        case 9: //drizzle
          $("#weather-icon").attr('class', 'wi wi-showers');
          break;
        case 10: //freezing rain
          $("#weather-icon").attr('class', 'wi wi-rain');
          break;
        case 11: //showers
        
        case 12: //showers
          $("#weather-icon").attr('class', 'wi wi-showers');
          break;
        case 13: //snow flurries
          
        case 14: //light snow showers
          $("#weather-icon").attr('class', 'wi wi-snow');
          break;
        case 15: //blowing snow
          $("#weather-icon").attr('class', 'wi wi-snow-wind');
          break;
        case 16: //snow
          $("#weather-icon").attr('class', 'wi wi-snow');
          break;
        case 17: //hail
          $("#weather-icon").attr('class', 'wi wi-hail');
          break;
        case 18: //sleet
          $("#weather-icon").attr('class', 'wi wi-sleet');
          break;
        case 20: //foggy
          $("#weather-icon").attr('class', 'wi wi-snow');
          break;
        case 21: //haze
          $("#weather-icon").attr('class', 'wi wi-smoke');
          break;
        case 23: //blustery
          $("#weather-icon").attr('class', 'wi wi-strong-wind');
          break;
        case 24: //windy
          $("#weather-icon").attr('class', 'wi wi-windy');
          break;
        case 25: //cold
          $("#weather-icon").attr('class', 'wi wi-snowflake-cold');
          break;
        case 26: //cloudy
          $("#weather-icon").attr('class', 'wi wi-cloudy');
          break;
        case 27: //mostly cloudy (night)
          $("#weather-icon").attr('class', 'wi wi-night-alt-cloudy');
          break;
        case 28: //mostly cloudy (day)
          $("#weather-icon").attr('class', 'wi wi-day-cloudy');
          break;
        case 29: //partly cloudy (night)
          $("#weather-icon").attr('class', 'wi wi-night-alt-partly-cloudy');
          break;
        case 30: //partly cloudy (day)
          $("#weather-icon").attr('class', 'wi wi-day-sunny-overcast');
          break;
        case 31: //clear (night)
          $("#weather-icon").attr('class', 'wi wi-night-clear');
          break;
        case 32: //sunny
          $("#weather-icon").attr('class', 'wi wi-day-sunny');
          break;
        case 33: //fair fair (night)
          $("#weather-icon").attr('class', 'wi wi-night-alt-cloudy-high');
          break;
        case 34: //fair (day)
          $("#weather-icon").attr('class', 'wi wi-day-cloudy-high');
          break;
        case 35: //mixed rain and hail
          $("#weather-icon").attr('class', 'wi wi-rain-wind');
          break;
        case 36: //hot
          $("#weather-icon").attr('class', 'wi wi-hot');
          break;
        case 37: //isolated thunderstorms
          $("#weather-icon").attr('class', 'wi wi-thunderstorm');
          break;
        case 38: //scattered thunderstorms
          
        case 39: //scattered thunderstorms
          $("#weather-icon").attr('class', 'wi wi-storm-showers');
          break;
        case 40: //scattered showers
          $("#weather-icon").attr('class', 'wi wi-showers');
          break;
        case 41: //heavy snow
          $("#weather-icon").attr('class', 'wi wi-snow-wind');
          break;
        case 42: //scattered snow showers
          $("#weather-icon").attr('class', 'wi wi-showers');
          break;
        case 43: //heavy snow
          $("#weather-icon").attr('class', 'wi wi-snow-wind');
          break;
        case 44: //partly cloudy
          $("#weather-icon").attr('class', 'wi wi-cloud');
          break;
        case 45: //thunderstorms
          $("#weather-icon").attr('class', 'wi wi-thunderstorm');
          break;
        case 46: //snow showers
          $("#weather-icon").attr('class', 'wi wi-snow-wind');
          break;
        case 47: //isolated thundershowers
          $("#weather-icon").attr('class', 'wi wi-thunderstorm');
          break;
        default:
          $("#weather-icon").attr('class', 'wi wi-day-sunny');
          break;
      }

      // high and low
      item = r.query.results.channel.item.forecast[0];
      $('#high').html(item.high);
      $('#low').html(item.low);
    } else
      showError("Error retrieving weather data!");
  });

  // every 15 minutes
  setTimeout(refresh_weather, 1000*60*15);
};

/*
 * Displays an alert message if the DJ hasn't logged a song in a while
 */
function check_logging() {
  // Get the most recently logged song
  $.getJSON( "http://10.0.1.10/log/api/v1.0/songs", {desc: true, n: 1},
      function( data ) {
    // Construct a date object from the song's timestamp
    var date = new Date( data["songs"][0].ts );

    // If the song was logged more than 1,050,000 milliseconds ago (17m30s),
    // display the alert message; otherwise, hide it
    if ( new Date() - date > 1050000 )
      $('#alert').css( 'display','initial' );
    else
      $('#alert').css( 'display','none' );
  });
};

/*
 * Counts and displays the total number of listeners on all web stream
 * mount points
 */
function czech_listeners( data ) {
  var count = 0;

  // Loop over the number of mount points, and add each of their listener
  // counts to count
  for ( var i = 0; i < data.icestats.source.length; i++ ) {
    count = count + data.icestats.source[i].listeners;
  }

  // Update the listener count field with the count
  $('#listeners').text( count );
}

/*
 * If new song objects are present in data, transition the bottom object
 * off the trackback list and the new on until all five most recently
 * logged songs are displayed
 */
function check_trackback( i, data ) {
  // Run if there are new song objects
  if ( i < data.length ) {
    // Select the last visible song on the trackback list
    var lasttrack = $('#djlog').children().last();

    // Hide the last visible song
    lasttrack.toggleClass('collapsed');

    // Wait 300 milliseconds, then remove the last song
    // and display a new one
    setTimeout(cycle_trackback(i, data, lasttrack), 300);
  }
};

// Remove the last song from the trackback list, and add
// and show one corresponding to the i-th song object in
// data, then call check_trackback again to check whether
// or not there are additional new songs objects to add
function cycle_trackback( i, data, lasttrack ) {
  // Remove the last song on the trackback list
  lasttrack.remove(); 

  // Get the new song object and append it to the
  // trackback list
  var html = $(data[i]);
  html.toggleClass('collapsed');
  $('#djlog').prepend(html);

  // Wrap the song, artist and album text rows with
  // marquee tags if the contents are too long for
  // the container element
  marquee_wrap(html, html.children().eq(0));
  marquee_wrap(html, html.children().eq(1));
  marquee_wrap(html, html.children().eq(2));  

  // Wait five milliseconds, then show the new song
  // on the trackback list, then wait 300 milliseconds
  // and check for more new song objects
  setTimeout( function() {
    html.toggleClass('collapsed');
    setTimeout( check_trackback( ++i, data ), 500 );
  }, 5 );
};

// Wrap child in marquee tags if it is wider than
// container
function marquee_wrap( container, child ) {
  // Wrap the child element's contents with a span
  // and measure both its width and the container's
  // width
  var original_text = child.html();
  child.html('<span>' + original_text + '</span>');
  var child_width = child.children().eq(0).width();
  var container_width = container.width();

  // Restore the original state of the child element
  child.html(original_text);

  // If the child's width is greater than the
  // container, wrap the child's contents with tags
  // to pad its left and right edges and add a
  // marquee scrolling effect
  if ( child_width > container_width )
    child.html('<div class="marquee-wrap"><div class="marquee">' + original_text + '</div></div>');
};

function cycleTwitterFeed( i, data, cut ) {
  if ( i < data.length ) {
    // Get new element ready, mark its height, and hide it
    var html = $(data[i]);
    $('#twitter-feed').prepend(html);
    html.toggleClass('collapsed');

    var lasttweet = $('#twitter-feed').children().last();

    // Take some measurements
    var bottom = lasttweet.offset().top + lasttweet.height();
    var cBottom = $('#twitter-feed').offset().top + $('#twitter-feed').height();

    // If the LAST element clips
    if ( cut || bottom > cBottom ) {
      // FINALLY animate everything
      html.toggleClass('collapsed');
      lasttweet.toggleClass('collapsed');
      setTimeout(function() {
        lasttweet.remove();
        cycleTwitterFeed(++i, data, true);
      }, 300);

    } else {
      html.toggleClass('collapsed');
      cycleTwitterFeed(++i, data, false);
    }
  }
};

function cycleImageFeed() {
  $('#images').fadeOut( 'normal', function() {
    $.get( './images.php', function(data) {
      $('#images').attr( 'src', data );
      $('#images').fadeIn();
    } );
  } );
}

function ten_second_interval() {
  // Do the days since incident
  $('#dayssince').load("./incident.php");

  // Get web stream listeners
  $.getJSON( "http://stream.wmtu.mtu.edu:8000/status-json.xsl", function( data ) {
    czech_listeners(data);
  } );

  // Do the trackback feed
  $.getJSON( "./trackback.php?first=false", function( data ) {
    var i = 0;
    check_trackback( i, data );
  } );

  // Do the Twitter feed
  $.getJSON( "./twitter.php?first=false", function( data ) {
    var i = 0;
    cycleTwitterFeed( i, data, false );
  } );

  // Do the images
  cycleImageFeed();

  // Warn if songs aren't logged
  check_logging();

  // Run again in ten seconds
  setTimeout(ten_second_interval,10000);
}

var Sync = function() {
  // Refresh the page
  location.reload();

  // Sync again in an hour
  setTimeout(Sync, 60*60*1000);
}

// On page ready
$( function() {
  // Start the clock
  ( function refresh_clock() {
      // Load the time onto the board
      $("#clock").load("./time.php");

      // Repeat every second
      setTimeout(refresh_clock,1000);
  } )();

  // Populate the trackback list
  ( function refresh_log() {
    // Populate the container
    $.getJSON( "./trackback.php?first=true", function( data ) {
      for ( var i = 0; i < data.length; i++ ) {        
        // Get and append new element
        var html = $(data[i]);
        $('#djlog').prepend(html);

        marquee_wrap( html, html.children().eq(0) );
        marquee_wrap( html, html.children().eq(1) );
        marquee_wrap( html, html.children().eq(2) );
        
        html.hide();
        html.slideToggle();
      }
    } );
  } )();

  // Populate the twitter request feed
  ( function refresh_tweets() {
    // Populate the container
    $.getJSON( "./twitter.php?first=true", function( data ) {
      var i = 0;
      cycleTwitterFeed( i, data, false );
    } );
  } )();

  // Start the ticker
  refresh_ticker();

  // Start the weather
  refresh_weather();

  // Refresh the page every hour
  setTimeout(Sync, 60*60*1000); 

  ten_second_interval();
} );
