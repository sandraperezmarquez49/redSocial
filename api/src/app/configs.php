<?php

$container->set('settings', function() {
	return (object)[
		"DB_NAME" => "red_social",
		"DB_PASS" => "root",
		"DB_CHAR" => "utf8mb4",
		"DB_HOST" => "127.0.0.1",
		"DB_USER" => "root",
		"DB_PORT" => "8889",
		"KEY" => "*stoDrivers.338-3388*",
	];
});