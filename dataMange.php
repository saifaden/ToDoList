<?php
    try {
        $db=mysqli_connect("localhost","root","","projects");
        // echo "connection succseful\n";
    } catch (Exception $e) {
        echo "connect faild\n";
        echo mysqli_connect_error();
    }
?>

<?php
    switch ($_POST['request']) {
        case 'newTask':
            try {
                $result=mysqli_query($db,"INSERT INTO `todolist`( `name`) VALUES ('".$_POST["taskName"]."')");
                echo $result;
            } catch (Exception $th) {
                echo "faild";
                echo mysql_errno($db) . ": " . mysql_error($db) . "\n";
            }
            break;
        case 'getTasks':
            try {
                $result=mysqli_query($db,"SELECT * FROM todolist WHERE status='".$_POST['status']."'");
                $tasks=[];
                while ($task=mysqli_fetch_assoc($result)) {
                    $tasks[]=$task;
                }
                echo json_encode($tasks);
            } catch (Exception $th) {
                echo "faild";
                echo mysql_errno($db) . ": " . mysql_error($db) . "\n";
            }
            break;
        case 'editTask':
            try {
                $result=mysqli_query($db,"UPDATE `todolist` SET `status`='".$_POST['status']."' WHERE `id`='".$_POST['id']."'");
                echo $result;
            } catch (Exception $th) {
                echo "faild";
                echo mysql_errno($db) . ": " . mysql_error($db) . "\n";
            }
            break;
        case 'deleteTask':
            try {
                $result=mysqli_query($db,"DELETE FROM `todolist` WHERE id='".$_POST['id']."'");
                echo $result;
            } catch (Exception $th) {
                echo "faild";
                echo mysql_errno($db) . ": " . mysql_error($db) . "\n";
            }
            break;
        default:
            echo "error request";
            break;
    }
    
    mysqli_close($db);