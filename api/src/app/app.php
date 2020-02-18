<?php

use Slim\Factory\AppFactory;

require __DIR__ . '/../../vendor/autoload.php';

$aux = new \DI\Container();
AppFactory::setContainer($aux);
$app = AppFactory::create();
$container = $app->getContainer();

require __DIR__ . "/routes.php";
require __DIR__ . "/configs.php";
require __DIR__ . "/dependencies.php";

$app->run();
