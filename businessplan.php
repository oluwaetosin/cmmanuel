<?php  
  session_start()
?>
<?php
if(isset($_POST['submit'])){
$error 		 	= array();
$name    		=  preg_replace("#[^a-z' ']#i","",$_POST['name']);
$pnumb   		=  preg_replace("#[^0-9+]#i","",$_POST['pnumb']);
$cname  		=  preg_replace("#[^a-z' ']#i","",$_POST['cname']);
$email          =  $_POST['email'];
if(trim($name) 	== ""){$error[] 	= "Please Enter name";}
elseif(trim($pnumb ) == ""){$error[] 	= "Please Enter Phone Number";}
elseif(trim($pnumb ) == ""){$error[] 	= "Please Enter Phone Number";}
elseif(!eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$",$email)){
		 $error[] = "Invalid Email";
		 }
elseif(!is_array($_FILES['file'])){
				$error[] = "Invalid File Format";
	}
elseif($_FILES['file']['size'] > 2097152){
	$error[] = "File too Large. file Size should Not be More than 2MB";
	}
$b = explode(".",$_FILES['file']['name']);
$c = array('doc','docx'); 
if( !in_array(end($b),$c)){$error[] = "file format ".end($b)  ."not accepted. Submit '.doc' or '.docx' only";}

if(empty($error)){
	$file_name = time().$_FILES['file']['name'];
	$file_temp = $_FILES['file']['tmp_name'];
	move_uploaded_file($file_temp,"files/".$file_name);
	}
if(empty($error)){
	    
		require_once("PHPMailer/class.phpmailer.php");
        require_once("PHPMailer/class.smtp.php");
		
		$to        = "service@cmannuel.com";
		$to_name   = "cmannuel";
		$subject = "Business Plan" . strftime("%T", time());
		$message   = '<!doctype html><html><head><meta charset="utf-8"><title>Business plan</title></head><body><div><p><strong>Name: </strong>'.$name.'</p><p><strong>Company Name: </strong>'.$cname.'</p><p><strong>Phone Number: </strong>'.$pnumb.'</p><p><strong>Email: </strong>'.$email.'</p><p><a href="http://www.cmannuel.com/CMANNUEL/files/'.$file_name.'">Download Business Plan</a></p></div></body></html>';
		$message = wordwrap($message,70);
		$from_name = "$email";
		$mail           = new PHPMailer();
		$mail->isSMTP();
		$mail->Host     =  "localhost";
		$mail->Port     =  25;
		$mail->SMTPAuth = true;
		$mail->isHTML(true);
		$mail->Username  = "admin@cmannuel.com";
		$mail->Password   = "admin";
		$mail->FromName = $name;
		$mail->From     = $email;
		$mail->addAddress($to,$to_name);
		$mail->Subject  = $subject;
		$mail->Body     = $message;
		$result          = $mail->send();
		if($result){
			$_SESSION['message'] = "Business Plan Submitted. Thank You";
			header("location:businessplan.php#form");
			exit();
			}else{
		$error[] = "Form Cannot be Submitted at this Time. Please Try again";
				}
	}
}
else{
$name 	= "";
$pnumb  = "";
$cname  = "";
$email  = "";
}

?>

<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>C Manuel | Submit Business Plan</title>
<link href="css/mystylesheet.css" rel="stylesheet" >
</head>
<body>
<div class="wrapper">
   <?php require_once("include/header.php") ?>
  <article>
 	
    <div id="form">
    <h2>Upload Your Business Plan</h2>
    <?php if(isset($_SESSION['message'])){echo "<p class='message'>".$_SESSION['message']."</p>"; session_destroy();} ?>
    <p style="error">Simply Fill Out the form below. That is it!</p>
    <?php if(isset($error) && !empty($error)){echo "<p>".$error[0]."</p>";}?>
    <form action="businessplan.php" method="POST" enctype="multipart/form-data" id="form">
    <input type="hidden" name="MAX_FILE_SIZE" value="2097152 " />
    	<div>
        <label  for="name">Your Name</label>
        </div>
        <div>
        <input name="name" maxlength="80" value="<?php echo $name ?>" >
        </div>
        
        <div>
        <label  for="pnumb">Phone Number</label>
        </div>
        <div>
        <input name="pnumb"  value="<?php echo $pnumb ?>" maxlength="15" >
        </div>
        
        <div>
        <label  for="cname">Company Name</label>
        </div>
        <div>
        <input name="cname" maxlength="80" value="<?php echo $cname ?>" >
        </div>
        
        <div>
        <label  for="email">Email</label>
        </div>
        <div>
        <input name="email" maxlength="80" value="<?php echo $email ?>" >
        </div>
        
        <div>
        <label for="file">File</label>
        </div>
        <div>
        <input type="file" value="" name="file" >
        </div>
        <input type="submit" name="submit" value="submit">
	</form>    
    </div>
  </article>
  <?php require_once("include/footer.php") ?>
</div>
</body>
</html>