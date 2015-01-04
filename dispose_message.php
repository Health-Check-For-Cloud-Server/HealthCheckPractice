<?php
	$message = $_GET['message'];
	$arr = json_decode($message,true);
	
	if(count($arr)==0){
		echo "传到服务器的数据是空的";
	}else{
		echo "服务器接收到信息：";
		if (array_key_exists("text",$arr)){
			echo "\n\t文本信息：".$arr['text'];
		}		
		if (array_key_exists("single_choice",$arr)){
			echo "\n\t单选信息：".$arr['single_choice'];
		}		
		if (array_key_exists("multiple_choice",$arr)){
			echo "\n\t多选信息：";
			for ($i=0 ; $i<count($arr["multiple_choice"]) ; $i++){
				echo $arr["multiple_choice"][$i];
				if($i!=(count($arr["multiple_choice"])-1)){
					echo "、";
				}
			}
		}
	}		
?>
