function refresh_ticker(){
  //slide to the left
  var $marginLefty = $('#ticker-text');
  $marginLefty.animate({
    marginLeft: parseInt($marginLefty.css('marginLeft'),10) == 0 ?
      $marginLefty.outerWidth() :
      0
  }, 600, load_ticker);
};  

function load_ticker(){
  // Do the Thing Here
  $('#ticker-span').load('./ticker.php', '', show_ticker);
};

function show_ticker(){
  //Fix the text
  $('#ticker-text').textfill({maxFontPixels: 64});
  $('#ticker-text').css('margin-top', (parseInt($('#ticker').height(),10) - parseInt($('#ticker-span').height(),10))/2);
  
  //now slide to the right
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
      
      //high and low
      item = r.query.results.channel.item.forecast[0];
      $('#high').html(item.high);
      $('#low').html(item.low);
      
    }
    else {
      showError("Error retrieving weather data!");
    }
  });
  
  //every 15 minutes
  setTimeout(refresh_weather, 1000*60*15);
};

function check_logging(){
  //populate 
  $.getJSON( "./logwarn.php", function( data ) {
    //data should be a boolean true or false      
    if (data) {
      $('#alert').css('display','initial'); 
    } else {
      $('#alert').css('display','none'); 
    } 
  });
};
  
function tenSecondRefresh() {
  //also do the days since incident
  $('#dayssince').load("./incident.php");
  
  //Do the TrackBack Feed
  $.getJSON( "./trackback.php?first=false", function( data ) {
    var i = 0;
    cycleDjLog(i, data);
  });
  
  //Do the Twitter Feed
  $.getJSON( "./twitter.php?first=false", function( data ) {
    var i = 0;
    cycleTwitterFeed(i, data, false);
  });
  
  //do the images
  cycleImageFeed();

  //warn if songs aren't logged
  check_logging();  

  //start animation sequence
  setTimeout(tenSecondRefresh,10000);
}

var cycleDjLog = function(i, data) {  
  if(i < data.length) {
    //hide and remove the last element
    var lasttrack = $('#djlog').children().last();
    //lasttrack.slideToggle('normal', hideDjLogItem(i, data, lasttrack));
    lasttrack.toggleClass('collapsed');
    setTimeout(hideDjLogItem(i, data, lasttrack), 300);
  }
};

var hideDjLogItem = function(i, data, lasttrack) {
  lasttrack.remove(); 
        
  //get and append new element
  var html = $(data[i]);
  html.toggleClass('collapsed');
  $('#djlog').prepend(html);

  marqueeWrapChild(html, html.children().eq(0));
  marqueeWrapChild(html, html.children().eq(1));
  marqueeWrapChild(html, html.children().eq(2));  
      
  setTimeout(function() {
    html.toggleClass('collapsed');
    setTimeout( cycleDjLog(++i, data) ,500);
  }, 5);  
};

var marqueeWrapChild = function(container, child) { 
  var oText = child.html();
  child.html('<span>' + oText + '</span>');
  var cWidth = child.children().eq(0).width();
  var oWidth = container.width();
       
  child.html(oText); 
  if (cWidth > oWidth) {
    //add a marquee
    child.html('<div class="marquee-wrap"><div class="marquee">' + oText + '</div></div>');
  }
};
 
var cycleTwitterFeed = function(i, data, cut) {
  if(i < data.length) { 
    //get new element ready mark its height and hide it 
    var html = $(data[i]);
    $('#twitter-feed').prepend(html);
    html.toggleClass('collapsed');

    var lasttweet = $('#twitter-feed').children().last();
      
    //take some measurements
    var bottom = lasttweet.offset().top + lasttweet.height();  
    var cBottom = $('#twitter-feed').offset().top + $('#twitter-feed').height();
      
    //if the LAST element clips
    if (cut || bottom > cBottom) {
      //FINALLY animate everything
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


var cycleImageFeed = function() {
  $('#images').fadeOut('normal', function() {
    $.get('./images.php', function(data) {
      $('#images').attr('src', data);
      $('#images').fadeIn();
    });
  });
}

var Sync = function() {
  //refresh the page
  location.reload();

  //sync again in an hour
  setTimeout(Sync, 60*60*1000);
}

//on ready
$(function() {
  //start the clock
  (function refresh_clock(){
      // Do the Thing Here
      $("#clock").load("./time.php");
      
      //repeat
      setTimeout(refresh_clock,1000);
  })();
        
  //Populate the TrackBack Container
  (function refresh_log(){
    //populate the container
    $.getJSON( "./trackback.php?first=true", function( data ) {
      for (var i = 0; i < data.length; i++) {        
        //get and append new element
        var html = $(data[i]);
        $('#djlog').prepend(html);

        marqueeWrapChild(html, html.children().eq(0));
        marqueeWrapChild(html, html.children().eq(1));
        marqueeWrapChild(html, html.children().eq(2));
        
        html.hide();
        html.slideToggle();
      }
    });
  })();
  
  //populate the twitter feed
  (function refresh_tweets(){
    //populate the container
    $.getJSON( "./twitter.php?first=true", function( data ) {
      var i = 0;
      cycleTwitterFeed(i, data, false);
    });
  })();
  
  //start the ticker
  refresh_ticker();
  
  //start the weather
  refresh_weather();
  
  //populate days since
  $('#dayssince').load("./incident.php");
 
  //set the song logging alert
  check_logging();
 
  //Setup Refresh on the trackback/incident tracker/and twitter feed 
  setTimeout(tenSecondRefresh,10000);
  
  //refresh the page every hour
  setTimeout(Sync, 60*60*1000); 
});
