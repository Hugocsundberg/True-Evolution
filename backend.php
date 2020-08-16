<?php

//VARS
$JSON_content = file_get_contents("scores.JSON");
$new_data = $_POST["score"];
$decoded_JSON = json_decode($JSON_content);
$decoded_new_data = json_decode($_POST["score"]);
//New data added to old data 
// array_push($decoded_JSON->scores, $decoded_new_data);
//Sort data
$i = 0;
foreach($decoded_JSON->scores as $score_object) {
    if($decoded_new_data->score <= $score_object->score) {
    $i = $i +1;
    } else {
    break;
    }
}
array_splice($decoded_JSON->scores, $i, 0, [$decoded_new_data]);
array_splice($decoded_JSON->scores, 10, 12);



//Put data back in JSON
$encoded_JSON = json_encode($decoded_JSON);
file_put_contents("scores.JSON", $encoded_JSON);

//Return data
echo $encoded_JSON;







