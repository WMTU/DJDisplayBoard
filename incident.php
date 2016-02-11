<?php 
  $configs = include('./config.php');
  $days = 0;
  
  // Create connection
	$con = mysqli_connect($configs['host'], $configs['username'], $configs['password'], $configs['database']);
	
  // Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
  
  //load last incident
  $sql = "SELECT * FROM discrepency_logs ORDER BY id DESC LIMIT 1";
  
  // Execute query
  if ($result = mysqli_query($con,$sql))
  {
    //success
    while($assoc = mysqli_fetch_assoc($result)){
      $then = new DateTime($assoc['timestamp']);
      $days = $then->diff(new DateTime())->format("%a");
    }
  }
  else
  {
    echo "Error parsing data: " . mysqli_error($con);
  }
  
  echo $days;
  
	mysqli_close($con);
?>
