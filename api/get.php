<?php
  require_once('DB.php');
  header("Content-Type:application/json");

  $db = new DB("127.0.0.1","exercise","root","");

  if($_SERVER['REQUEST_METHOD']=='GET')
  {
    if(isset($_GET['type']) && isset($_GET['sort']))
    {
      $type = $_GET['type'];
      $sort = $_GET['sort'];
      $page =(int)$_GET['page'];
      $index=$page*10-10;
    }
    elseif(empty($_GET['type']) && empty($_GET['sort']))
    {
      $sort = '';
      $type ='';
      $page = (int)$_GET['page'];
      $index=$page*10-10;
    }

    $rows=$db->query('SELECT COUNT(*) AS rows FROM users')[0]['rows'];
    $items_per_page=10;
    $number_of_pages=ceil($rows/$items_per_page);

    if($type == 'name' && $sort=='asc')
    {
      $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users ORDER BY name ASC LIMIT 10 OFFSET '.$index.'');
    }
    elseif($type == 'name' && $sort=='desc')
    {
      $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users ORDER BY name DESC LIMIT 10 OFFSET '.$index.'');
    }
    elseif($type == 'surname' && $sort=='asc')
    {
     $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users ORDER BY surname ASC LIMIT 10 OFFSET '.$index.'');
    }
    elseif($type == 'surname' && $sort=='desc')
    {
      $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users ORDER BY surname DESC LIMIT 10 OFFSET '.$index.'');
    }
    elseif($type == 'birth' && $sort=='asc')
    {
     $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users ORDER BY birth_date ASC LIMIT 10 OFFSET '.$index.'');
    }
    elseif($type == 'birth' && $sort=='desc')
    {
      $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users ORDER BY birth_date DESC LIMIT 10 OFFSET '.$index.'');
    }
    elseif($type == 'cell' && $sort=='asc')
    {
     $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users ORDER BY cellphone ASC LIMIT 10 OFFSET '.$index.'');
    }
    elseif($type == 'cell' && $sort=='desc')
    {
      $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users ORDER BY cellphone DESC LIMIT 10 OFFSET '.$index.'');
    }
    elseif($type == 'email' && $sort=='asc')
    {
     $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users ORDER BY email ASC LIMIT 10 OFFSET '.$index.'');
    }
    elseif($type == 'email' && $sort=='desc')
    {
      $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users ORDER BY email DESC LIMIT 10 OFFSET '.$index.'');
    }
    elseif($type == 'date' && $sort=='asc')
    {
     $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users ORDER BY date_captured ASC LIMIT 10 OFFSET '.$index.'');
    }
    elseif($type == 'date' && $sort=='desc')
    {
      $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users ORDER BY date_captured DESC LIMIT 10 OFFSET '.$index.'');
    }
    elseif(empty($type)&& empty($sort))
    {
      $results=$db->query('SELECT name,surname,birth_date,cellphone,email,date_captured FROM users LIMIT 10 OFFSET '.$index.'');
    }

    //creating json data
    $response ='[';
    foreach ($results as $r) 
    {
      $response .="{";
      $response .= '"name":"'.htmlspecialchars($r['name']).'",';
      $response .= '"surname":"'.htmlspecialchars($r['surname']).'",';
      $response .= '"birth":"'.htmlspecialchars($r['birth_date']).'",';
      $response .= '"cellphone":"'.htmlspecialchars($r['cellphone']).'",';
      $response .= '"email":"'.htmlspecialchars($r['email']).'",';
      $response .= '"date_captured":"'.htmlspecialchars($r['date_captured']).'",';
      $response .= '"on_page":"'.$page.'",';
      $response .= '"max_page":"'.$number_of_pages.'"';
      $response .="},";
    }
    $response=substr($response,0,strlen($response)-1);//remove the last comma in the json i.e [{"1:2"},{3:5},] to [{"1":"2"},{"3":"5"}]
    $response.="]";
    http_response_code(200);

    echo $response;
  }
  else
  {
    //Bad request
    http_response_code(400);
  }

?>