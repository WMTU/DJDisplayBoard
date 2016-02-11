<?php
  $dir = new DirectoryIterator('./images');
  session_start();
  
  if (!isset($_SESSION['imageid'])) {
    $_SESSION['imageid'] = 0;
  }
  $dir->seek($_SESSION['imageid']);
  
  do {
    $dir->next();
    
    //loop back to 0
    if (!$dir->valid()) {
      $dir->seek(0);
    }

  } while ( (!$dir->isFile()) || (!$dir->valid()) || (!exif_imagetype($dir->getPathname())) ); //it's not an image
  
  $_SESSION['imageid'] = $dir->key();
  //echo $dir->key();
  echo './images/'.$dir->getFilename();
  //imagejpeg('./images/'.$fileinfo-getFilename(), NULL,100);
?>
