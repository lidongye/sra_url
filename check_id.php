<?php 

function get_url($sra_id){
	if (!preg_match('/^(DRR|ERR|SRR)\d{6}$/', $sra_id)){
		//echo $sra_id."</br>";
		return 0;
	}
	$base_url = "https://ftp.ncbi.nlm.nih.gov/sra/sra-instant/reads/ByRun/sra/";
	$d1 = substr($sra_id, 0, 3);
	$d2 = substr($sra_id, 0, 6);
	return $base_url.$d1.'/'.$d2.'/'.$sra_id.'/';
}

if (isset($_GET['sra_id'])){
	$sra_id = $_GET['sra_id'];
	$url = get_url($sra_id);
	if ($url){
		$array = get_headers($url,1); 
		//echo $array[0]."<br>";
		if(preg_match('/200/',$array[0])){ 
			echo "True"; 
		}else{
			echo "url: ".$url."</br>";
			echo "status: ".$array[0]."</br>";
			echo "False";
		}
	}
	else{
		echo "id paser false</br>";
		echo "False";
	}
}
else{
	echo "no sra_id</br>";
	echo "False";
}
?>
