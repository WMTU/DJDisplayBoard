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
    // Construct a moment from the song's timestamp
    var mom_song = moment( data["songs"][0].timestamp, moment.ISO_8601 );
    // Construct a moment for the threshold of 17m30s ago
    var mom_threshold = moment().subtract( 17, 'minutes' ).subtract( 30, 'seconds' );

    // If the song was logged before our threshold (17m30s), display the
    // alert message; otherwise, hide it
    if ( mom_song.isBefore( mom_threshold ) )
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
 * Convert song data from object to HTML
 */
function song_obj_to_html( song ) {
  // Start our HTML output variable
  var html = '';

  // Open a new trackback div
  html += '<div class="trackback">';

  // Append song info
  html += '<h3>' + song.title + '</h3>';
  html += '<p>' + song.artist + '</p>';
  if ( song.album == '' )
    html += '<p>N/A</p>';
  else
    html += '<p>' + song.album + '</p>';

  // Close the trackback div
  html += '</div>';

  // Return the HTML output
  return html;
}

/*
 * Wrap child elements of container element in marquee tags
 * if they're wider than it
 */
function marquee_wrap( container ) {
  container.children().each( function() {
    var child = $( this );

    // Wrap the child element's contents with a span and measure both
    // its width and the container's width
    var original_text = child.html();
    child.html( "<span>" + original_text + "</span>" );
    var child_width = child.children().eq( 0 ).width();
    var container_width = container.width();

    // Restore the original state of the child element
    child.html(original_text);

    // If the child's width is greater than the
    // container, wrap the child's contents with tags
    // to pad its left and right edges and add a
    // marquee scrolling effect
    if ( child_width > container_width )
      child.html('<div class="marquee-wrap"><div class="marquee">' + original_text + '</div></div>');
  });
};

/*
 * Load new song records into the trackback element
 */
function load_trackback( first, id ) {
  // Set up API request parameters
  var params = { desc: true };
  if ( first ) {
    params.n = 5;
  } else {
    params.id = id;
  }

  // Declare a variable for the return value and initialize it to id (if 
  // there are no new songs, we want to return the last-added ID again)
  var return_value = id;

  // Get song data from Log app
  $.ajax( {
    url: "http://10.0.1.10/log/api/v1.0/songs",
    dataType: "json",
    async: false,
    data: params,
    success: function( data ) {
      // Declare variables
      var i;
      var queue = [];

      // Declare function to dequeue elements and toggle their collapsed status,
      // as well as remove the last element toggled if it is collapsed
      function process_queue( last_element ) {
        if ( queue.length > 0 ) {
          var element = queue.shift();
          element.toggleClass( "collapsed" );
          setTimeout( process_queue, 300, element );
        }
        if ( last_element !== undefined && last_element.hasClass( "collapsed" ) ) {
          last_element.remove();
        }
      }

      // Extract songs array from JSON data
      var songs = data.songs;

      // Loop over songs
      for ( i = songs.length - 1; i >= 0; i -= 1 ) {
        // Generate a div element for the new song and toggle it collapsed
        var item = $( song_obj_to_html( songs[i] ) );
        item.toggleClass( "collapsed" );

        // Prepend the new song div to the trackback list element
        $( "#djlog" ).prepend( item );

        // Add a marquee effect to overflowing fields in the song div
        marquee_wrap( item );

        // If this isn't one of the first set of songs being loaded to the
        // trackback, queue the last visible song to be collapsed and then
        // removed, to make room for the new one
        if ( !first ) {
          queue.push( $( "#djlog .trackback:nth-last-child(" + ( songs.length - i ) + ")" ) );
        }

        // Queue the new song div to be shown
        queue.push( item );
      }

      // Process the queue and set the return value to the ID of the last-added song
      if ( songs.length > 0 ) {
        process_queue();
        return_value = songs[0].id;
      }
    }
  } );

  return return_value;
}

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

/*
 * Load the next image onto the page
 */
function cycleImageFeed() {
  $( "#images" ).fadeOut( "normal", function() {
    $.get( "./images.php", function( data ) {
      $( "#images" ).attr( "src", data );
      $( "#images" ).fadeIn();
    } );
  } );
}

/*
 * Load the number of days since the last discrepancy log was
 * filed onto the page
 */
function daysSinceLastIncident() {
  // Get the most recently filed discrepancy log
  $.getJSON( "http://10.0.1.10/log/api/v1.0/discrepancies", {
        n: 1,
        desc: true
      }, function( data ) {
    // Construct a moment from the discrepancy log's timestamp
    var mom_discrepancy = moment( data.discrepancies[0].timestamp );

    // Calculate the number of days elapsed since the log was filed
    var days = moment().diff( mom_discrepancy, "days" );

    // Update the appropriate element on the page with the new value
    $( "#dayssince" ).text( days );
  } );
}

/*
 * Reload certain dynamic page features every ten seconds
 */
function ten_second_interval( last_song_id ) {
  // Reload the number of days since the last discrepancy log
  // was filed
  daysSinceLastIncident();

  // Reload the number of web stream listeners
  $.getJSON( "https://stream.wmtu.mtu.edu:8000/status-json.xsl", undefined, czech_listeners );

  // Load new items into the trackback feed
  last_song_id = load_trackback( false, last_song_id );

  // Load new items into the Twitter request feed
  $.getJSON( "./twitter.php?first=false", function( data ) {
    var i = 0;
    cycleTwitterFeed( i, data, false );
  } );

  // Reload the image
  cycleImageFeed();

  // Check whether or not songs are being logged
  check_logging();

  // Run again in ten seconds
  setTimeout( ten_second_interval, 10000, last_song_id );
}

/*
 * Reload the page, and set a timeout to reload again in an hour
 */
function reload_page() {
  // Reload the page
  location.reload();

  // Reload again in an hour
  setTimeout( reload_page, 60*60*1000 );
}

/*
 * When the document is ready, initialize dynamic page features
 */
$( document ).ready( function() {
  // Start the clock
  ( function refresh_clock() {
      // Load the time onto the board
      $( "#clock" ).load( "./time.php" );

      // Repeat every second
      setTimeout( refresh_clock, 1000 );
  } )();

  // Populate the trackback list
  var last_song_id = load_trackback( true );

  // Populate the Twitter request feed
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
  setTimeout( reload_page, 60*60*1000 ); 

  // Load the rest of the dynamic page features and start the
  // ten-second reload loop
  ten_second_interval( last_song_id );
} );
