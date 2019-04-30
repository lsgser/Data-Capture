<?php
	// 5$a2LOEqD[Ku
  require_once('DB.php');
  header("Content-Type:application/json");

  $db = new DB("127.0.0.1","code","root","");/*We do the same here*/

  if($_SERVER['REQUEST_METHOD']=='POST')
  {
    	$data=file_get_contents("php://input");
      $data = json_decode($data);

      $name=ucfirst(strtolower($data->name));
      $surname=ucfirst(strtolower($data->surname));
      $day=$data->day;
      $month=$data->month;
      $year=$data->year;
      $email=strtolower($data->email);
      $cell=$data->cellphone;

      if((int)$month<10)
      {
        $month ="0".$month;
      }
      if((int)$day<10)
      {
        $day ="0".$day;
      }

      //Birthdate format yyyy-mm-d
      $birthdate=$year.'-'.$month.'-'.$day;

      if(!empty($day) && !empty($month)&& !empty($year)&& !empty($name)&& !empty($surname)&& !empty($email)&& !empty($cell) && is_numeric($month) && is_numeric($day) && is_numeric($year))
      {
        //We first check if the email exists in the database
        if($db->query('SELECT id FROM users WHERE email=:email',array(':email'=>$email)))
        {
          http_response_code(200);
          echo '{"status":"User already exists"}';
        }
        else
        {
          if(filter_var($email,FILTER_VALIDATE_EMAIL))//check if the email is valid
          {
            $db->query('INSERT INTO users VALUES(\'\',:name,:surname,:birthdate,:cellphone,:email,NOW())',array(':name'=>$name,':surname'=>$surname,':birthdate'=>$birthdate,':cellphone'=>$cell,':email'=>$email));

            http_response_code(200);
            echo '{"status":"Success"}';
          }
          else
          {
            http_response_code(200);
            echo '{"status":"Invalid Email Format"}'; 
          }          
        }
      }
      else
      {
        http_response_code(200);
        echo '{"status":"Fill in all fields"}';
      }
  }
  else
  {
    //Bad request
    http_response_code(400);
  }

?>
