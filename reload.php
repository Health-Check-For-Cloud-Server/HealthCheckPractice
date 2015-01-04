<?php
if (!file_exists("./file/widget.txt")){
	echo "";
}else{
	$file = fopen("./file/widget.txt","r");
	if (filesize("./file/widget.txt")==0){
		echo "";
	}else{
		$json_string = fread($file,filesize("./file/widget.txt"));	
		echo $json_string;
		fclose($file);
	}
}
?>