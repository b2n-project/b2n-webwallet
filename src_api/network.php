<?php
include 'config.php';

$curl = curl_init();

$body = json_encode(array("jsonrpc" => "2.0", "id" => "0", "method" => "getlastblockheader"));
curl_setopt_array($curl, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_URL => 'http://'.$daemonAddress.':'.$rpcPort.'/json_rpc', CURLOPT_POST => 1, CURLOPT_POSTFIELDS => $body));

$resp = curl_exec($curl);
curl_close($curl);
//var_dump($resp);
$array = json_decode($resp, true);
//var_dump($array);
if($array === null)
	http_response_code(400);
else{
	$blockHeader = $array['result']['block_header'];
	header('Content-Type: application/json');
	echo json_encode(array(
			'major_version'=>$blockHeader['major_version'],
			'hash'=>$blockHeader['hash'],
			'reward'=>$blockHeader['reward'],
			'height'=>$blockHeader['height'],
			'timestamp'=>$blockHeader['timestamp'],
			'difficulty'=>$blockHeader['difficulty'],
			'hashrate'=>$blockHeader['difficulty']*60*2,
	));
}



