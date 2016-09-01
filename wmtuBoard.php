<!DOCTYPE html>
<html>
<head>
<title>WMTU Board</title>
<meta name=viewport content="width=1920, height=1080, initial-scale=1">
<script src="./scripts/jquery-2.1.4.min.js"></script>
<script src="./scripts/jquery.textfill.js"></script>
<script src="//cdn.jsdelivr.net/jquery.marquee/1.3.1/jquery.marquee.min.js"></script>
<script src="./scripts/moment.min.js"></script>
<script src="./scripts/script.js"></script>
<link rel="stylesheet" type="text/css" href="./css/boardStyle.css">
<link rel="stylesheet" type="text/css" href="./css/fonts.css">
<link rel="stylesheet" type="text/css" href="./css/weather-icons.css">
</head>
<body>
  <div id="alert">
    <div id="alert-centered">
      <span>Please log your songs!</span>
    </div>
  </div>

  <div id="clock">
  </div>
  
  <div id="weather">
    <div id="weather-icon" class="wi wi-cloudy"></div>
    <div class="temperature entypo">
      <h2><span id="degrees">64</span><span class="degree-symbol">&deg;</span>F<div id="highlow"><span id="high">15</span><span id="low">5</span></div></h2>
    </div>
    <div id="weather-info">
    <ul>
      <li class="fontawesome-leaf left">
        <span id="wind">4 mph</span>
      </li>
      <li class="fontawesome-tint center">
        <span id="humidity">65%</span>
      </li>
    </ul> 
    </div>
  </div>
  
  <div id="trackback">
    <h1>Recently Played</h1>
  </div>
  <div id="djlog">
  </div>
  
  <div id="ticker">
    <div id="ticker-text">
      <span id="ticker-span"></span>
    </div>
  </div>
  
  <div id="incident">
    <h1 id="dayssince">0</h1><span>Days since<br /> last incident</span>
  </div>
  
  <div id="stream">
    <h1 id="listeners">0</h1><span>Web stream<br /> listeners</span>
  </div>
  
  <div id="twitter-feed">
  </div>
  
  <div id="image-feed">
    <img id="images" src="./images/2.jpg" />
  </div>
  
  </body>
</html>
