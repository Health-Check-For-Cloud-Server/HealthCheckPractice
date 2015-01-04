<?php
	$mid_code = $_GET['mid_code'];
//	$obj = json_decode($message,true);
	$file = fopen("./file/widget.txt","w");
	fwrite($file,$mid_code);
	fclose($file);
	echo "已保存控件";
?>