<?php
session_start();
if(!isset($_SESSION['ticker_id'])) {
  $_SESSION['ticker_id'] = 0;
}

//reload tickers
$TICKER_FILE_PATH = "./tickers.txt";

$ticker_file = fopen($TICKER_FILE_PATH, "r") or die("Error loading tickers! Contact WMTU Technology.");
$all_tickers = fread($ticker_file, filesize($TICKER_FILE_PATH));
fclose($ticker_file); //done with file

//array-a-tize me captain
$all_tickers = preg_split('/'.PHP_EOL.'/', $all_tickers, NULL, PREG_SPLIT_NO_EMPTY);

if ($_SESSION['ticker_id'] > (count($all_tickers) - 1)) {
  //reset on overflow
  $_SESSION['ticker_id'] = 0;
}

echo $all_tickers[$_SESSION['ticker_id']];

//increment
$_SESSION['ticker_id']++;
?>
