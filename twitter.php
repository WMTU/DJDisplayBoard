<?php
  /* Load config */
  $configs = include('./config.php');
  require_once('./TwitterAPIExchange.php');
  
  header('Content-Type: application/json');
  
  session_start();
  
  $initialize = false;
  if(isset($_GET['first'])) {
    if ($_GET['first'] === 'true') {
      $initialize = true;
    }
  }
  
  if ($initialize) {
    $_SESSION['lasttweetid'] = 0;
    $numberOfTweets = 5;
  } else {
    $numberOfTweets = 3;
  }
  
  /** Set access tokens here - see: https://dev.twitter.com/apps/ **/
  $settings = array(
    'oauth_access_token' => $configs['oauth_access_token'],
    'oauth_access_token_secret' => $configs['oauth_access_token_secret'],
    'consumer_key' => $configs['consumer_key'],
    'consumer_secret' => $configs['consumer_secret']
  );

  /** URL for REST request, see: https://dev.twitter.com/docs/api/1.1/ **/
  $url = 'https://api.twitter.com/1.1/search/tweets.json';

  $getfield = '?q=%23WMTUrequest&result_type=recent&count='.$numberOfTweets;

  //don't reload old tweets
  if (!$initialize) {
    $getfield .= '&since_id='.$_SESSION['lasttweetid'];
  }

  $requestMethod = 'GET';
  $twitter = new TwitterAPIExchange($settings);
  
  $json = $twitter->setGetfield($getfield)
                  ->buildOauth($url, $requestMethod)
                  ->performRequest();

  $tweets = json_decode($json);
  //print_r($json);
  //for tweets
  $tweetDivs = array();
  
  //start from smallest to largest
  $tweetArray = array_reverse($tweets->statuses);
  //print_r($tweets->statuses);
  
  foreach ($tweetArray as $tweet) {
    $id = $tweet->id;
    $_SESSION['lasttweetid'] = $id;
    
    $username = $tweet->user->screen_name;
    $profileImage = $tweet->user->profile_image_url;
    $tweetText = $tweet->text; 
     
    $datetime = new DateTime($tweet->created_at);
    $datetime->setTimezone(new DateTimeZone('America/Detroit')); 
    //echo $id;
    $tweetDiv = '<div class="tweet">';
    $tweetDiv .= '<img src="'.strval($profileImage).'" alt="profile picture" />';
    $tweetDiv .= '<span class="tweet-name"><h3>'.strval($username).'</h3></span><span class="tweet-date">'.$datetime->format('D, M, j g:ia').'</span>';
    $tweetDiv .= '<p>'.strval($tweetText);
    $tweetDiv .= '</div>';
      
    array_push($tweetDivs, $tweetDiv);
  } 
  
  //output array
  echo json_encode($tweetDivs);
?>
