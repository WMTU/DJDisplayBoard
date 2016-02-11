<?php 
  $configs = include('./config.php');
  session_start();
  
  header('Content-Type: application/json');
  
  // Create connection
  $con = mysqli_connect($configs['host'], $configs['username'], $configs['password'], $configs['database']);
  $con->set_charset("utf8");
	
  // Check connection
  if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  
  $initialize = false;
  $firstset = false;
  if(isset($_GET['first'])) {
    if ($_GET['first'] === 'true') {
      $initialize = true;
    }
  }
  
  //if it's the start
  if ($initialize) {
    //load all entries
    $sql = "SELECT * FROM djlogs ORDER BY id DESC LIMIT 5";
  } else {
    //only new entries
    $sql = "SELECT * FROM djlogs WHERE id > ".$_SESSION['tblastentry']." ORDER BY id DESC";
  }
  
  $array = array();
  
  // Execute query
  if ($result = mysqli_query($con,$sql))
  {
    //success
    while($assoc = mysqli_fetch_assoc($result)){
      //if its the first call
      if (!$firstset) {
        $firstset = true;
        $_SESSION['tblastentry'] = $assoc['id'];
      }
      
      $html = '<div class="trackback">';
      
      $html .= '<h3>'.$assoc['song_name']."</h3>";
      $html .= '<p>'.$assoc['artist'].'</p>';
      
      
      
      if ($assoc['album'] === NULL || $assoc['album'] === ''){
        $html .= '<p>N/A</p>';
      } else {
        $html .= '<p>'.$assoc['album'].'</p>';
      }
      
      $html .= '</div>';
      
      array_push($array, $html);
    }
  }
  else
  {
    echo "Error parsing data: " . mysqli_error($con);
  }
  
  $array = array_reverse($array);
  echo json_encode($array);
  
	mysqli_close($con);
?>
