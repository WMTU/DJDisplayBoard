<?php  
  $configs = include('./config.php');
  session_start();

  header('Content-Type: application/json');

  // Create connection
  $con = mysqli_connect($configs['host'], $configs['username'], $configs['password'], $configs['database']);

  // Check connection
  if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $sql = "SELECT * FROM djlogs ORDER BY id DESC LIMIT 1";

  $output = false;

  // Execute query
  if ($result = mysqli_query($con,$sql))
  {
    //success 
    while($assoc = mysqli_fetch_assoc($result)){ 
      $lastdate = strtotime( $assoc['ts'] );
      //FOR TESTING
      //$lastdate = strtotime( "2015-12-02 12:37:09" );
      if (time() - $lastdate > 17 * 60 +30) {
        //00:17:30 has passed
        $output = true;
      }
        
    } 
  } 
  else 
  { 
    echo "Error parsing data: " . mysqli_error($con); 
  } 

  echo json_encode($output); 
   
  mysqli_close($con); 
?> 
