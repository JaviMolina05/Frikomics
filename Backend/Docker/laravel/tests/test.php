<?php

$response = file_get_contents("https://comicvine.gamespot.com/api/issues/?api_key=78135e3dda6f59da28b241ef0af2a9e805573f3e&format=json");

echo $response;
