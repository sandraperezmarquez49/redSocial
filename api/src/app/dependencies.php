<?php

use Psr\Container\ContainerInterface;

$container->set('db', function(ContainerInterface $c){
	$config = $c->get('settings');

	$host = $config->DB_HOST;
	$password = $config->DB_PASS;
	$charset = $config->DB_CHAR;
	$name = $config->DB_NAME;
	$user = $config->DB_USER;
	$port = $config->DB_PORT;

	$opt = [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
	];

	$dsn = "mysql:host=" . $host . ";dbname=" . $name . ";charset=" . $charset. ";port=" . $port;

	return new PDO($dsn, $user, $password, $opt);
});