<!DOCTYPE HTML>
<html>
<head>
<title>Board Configurator!</title>
</head>
<body>
<form  action="" method="post" enctype="multipart/form-data">
<h1>Board Configuration</h1>
<?php
$TICKER_FILE_PATH = "./tickers.txt";

if(isset($_POST['done'])) {
  //DO

  //write the updated ticker stuff
  $ticker_file = fopen($TICKER_FILE_PATH, 'w') or die("Failed to update tickers!");
  $ticker_text =  htmlspecialchars($_POST['tickers']);
  fwrite($ticker_file, $ticker_text);
  fclose($ticker_file);
  
  //background updater
  //if there is actually background image
  if (isset($_FILES['newBG'])) {

    //if it's an image
    if (exif_imagetype($_FILES['newBG']['tmp_name']) > 0) {
      //replace the old one!
      move_uploaded_file($_FILES['newBG']['tmp_name'], './bg.png');
    } else {
      echo "Background was not an image file!";
    }
  }

  echo "Update submitted!</br>";
} 
?>
<h3>Tickers</h3>
<?php
echo '<textarea name="tickers" id="tickers" cols="60" rows="10">';
$ticker_file = fopen($TICKER_FILE_PATH, "r") or die("Error loading tickers! Please refresh the page!");
$all_tickers = fread($ticker_file, filesize($TICKER_FILE_PATH));
fclose($ticker_file);
echo $all_tickers;
echo '</textarea>';
?></br>
<h3>Background</h3>
<input type="file" name="newBG">

<h3>Images</h3>
<?php
$dir = new DirectoryIterator('./images');
foreach ($dir as $finfo) {
  if (exif_imagetype($finfo->getPathname()) > 0) {
    echo $finfo->getPathname()." <input type='checkbox' name='".$finfo->key()."'> remove</br>";
  }
}
?></br> 
<input type="submit" name="done" >
</form>

</body>
</html>
