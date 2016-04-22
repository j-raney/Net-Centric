<?php
echo $_POST["method"]();

function sanitize($str, $quotes = ENT_NOQUOTES)
{
    $str = htmlspecialchars($str, $quotes);
    return $str;
}

function getChampions()
{
    $dbConn = mysqli_connect("23.253.61.96", "ncJonathanR",
                             ";;ncJonathanR;;", "ncJonathanR");
    
    $query = "SELECT Champion, Lane, Role
              FROM ncJonathanR.Champions, ncJonathanR.Lanes, ncJonathanR.Roles
              WHERE Champions.LaneID = Lanes.LaneID and Champions.RoleID = Roles.RoleID;";
    $result = $dbConn->query($query);
    if($dbConn->connect_error){
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }
    
    $champions = array();
    
    if($result){
        while($row = $result->fetch_array()){
            $allColumns = array();
            for ($i = 0; $i < 3; $i++){
                array_push($allColumns, $row[$i]);
            }
            array_push($champions, $allColumns);
        }
    }
    
    $return = new StdClass();
    $return->success = true;
    $return->champions = $champions;
    $return->querystring = $query;
    return json_encode($return);
}

function insertChampion()
{
    if(isset($_POST['Champion'])){
        $Champion = json_decode(sanitize($_POST['Champion']));
    }
    
    if(isset($_POST['LaneID'])){
        $LaneID = json_decode(sanitize($_POST['LaneID']));
    }
    
    if(isset($_POST['RoleID'])){
        $RoleID = json_decode(sanitize($_POST['RoleID']));
    }
    
    $dbConn = mysqli_connect("23.253.61.96", "ncJonathanR",
                             ";;ncJonathanR;;", "ncJonathanR");
    
    if($dbConn->connect_error){
        die("Connection failed: " . $dbConn->connect_error);
    }
    
    $query = "INSERT INTO ncJonathanR.Champions ( Champion, LaneID, RoleID ) " .
            "VALUES ( '" . $Champion . "', " . $LaneID . ", " . $RoleID .
            " );";
    
    $result = $dbConn->query($query);
    $return = new StdClass();
    $return->querystring = (string) $query;
    if ($result)
    {
        $return->success = true;
    }
    else
    {
        $return->success = false;
    }
    return json_encode($return);
}