<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$requestUri = isset($_SERVER["REQUEST_URI"]) ? $_SERVER["REQUEST_URI"] : '';

if(strpos($requestUri,'/api') === false){
	return false;
}else{
	$path = __DIR__.'/src_api/'.str_replace('/api/', '',$requestUri);
	if(strpos($path, '?') !== false){
		$path = substr($path, 0, strpos($path, '?'));
	}
	include $path;
}