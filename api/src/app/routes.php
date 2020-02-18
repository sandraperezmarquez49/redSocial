<?php

use Slim\Routing\RouteCollectorProxy;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->group('/api', function(RouteCollectorProxy $group) {
	$users = '/users';
	$group->post($users . '/register', 'App\controllers\usersController:new');
	$group->post($users . '/viewUser', 'App\controllers\usersController:viewUser');
	$group->post($users . '/edit', 'App\controllers\usersController:edit');
	$group->post($users . '/delete', 'App\controllers\usersController:delete');
	$group->post($users . '/login', 'App\controllers\usersController:login');

	$publication = '/publication';
	$group->post($publication . '/register', 'App\controllers\publicationController:new');
	$group->post($publication . '/view', 'App\controllers\publicationController:view');
	$group->post($publication . '/edit', 'App\controllers\publicationController:edit');
	$group->post($publication . '/list', 'App\controllers\publicationController:list');
	$group->post($publication . '/delete', 'App\controllers\publicationController:delete');
	$group->post($publication . '/destacar', 'App\controllers\publicationController:destacar');

	$group->get('/rr', 'App\controllers\usersController:listTest');
	
});
