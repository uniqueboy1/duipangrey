
<?php
session_start();
unset($_SESSION['password_changed_page']);
unset($_SESSION['signup_verification']);
unset($_SESSION['signup_access']);
$id = $_GET['id'];
include "../connection.php";

// delete from add to cart bikes
mysqli_query($con, "delete from add_to_cart_scooters where scooters_id = '$id'") or die("Query Failed !");

// delete popular scooters
mysqli_query($con, "delete from popular_scooters where scooters_id = '$id'") or die("Query Failed !");

// delete from order bikes
mysqli_query($con, "delete from order_scooters where scooters_id = '$id'") or die("Query Failed !");

// to bypass foreign key constraint
// mysqli_query($con, "set foreign_key_checks = 0") or die("Query Failed !");



// to delete images
$sql_image = "select * from scooters_images where scooters_id = '$id'";
$result_image = mysqli_query($con, $sql_image) or die("Query Failed !");

// $sql_image_delete = $sql_image;
// $result_image_delete = mysqli_query($con, $sql_image_delete) or die("Query Failed");

while ($rows_images = mysqli_fetch_assoc($result_image)) {
    $image = $rows_images['image_name'];
    $folder = "../../uploaded_images/scooters/$image";
    unlink($folder);
    mysqli_query($con, "delete from scooters_images where scooters_id = '$id'") or die("Query Failed !");
}

// delete scooters details
$sql = "delete from sell_scooters where id = '$id'";
$result = mysqli_query($con, $sql) or die("Query Failed !");

header("location:http://localhost/project/HTML/products_showing/my_scooters.php");

mysqli_close($con);

?>