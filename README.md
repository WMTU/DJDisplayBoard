# DJ Display Board
A DJ information display board built for the WMTU DJ booth. 
Makes use of PHP, CSS, Jquery and the Yahoo weather API.

Many pieces of this project are written as mini PHP 'plugins' which are then piped into the board's main page at runtime with jQuery's Load(). This system offers quite a bit of stability where in the event that any of the individual plugins fail the entire board doesn't go down. Those of the plugins which are not entirely written in PHP (e.g. the weather widget) rely heavily upon the code in /Scripts/Script.js to function. 

&nbsp;
&nbsp;

Credit to [Entypo](http://www.entypo.com/index.php), [Weathericons](https://erikflowers.github.io/weather-icons/), [Fontawesome](https://fortawesome.github.io/Font-Awesome/), and [Open Sans](https://www.google.com/fonts/specimen/Open+Sans) for the use of their awesome fonts.
