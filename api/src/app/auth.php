<?php namespace App\controllers;

use Psr\Container\ContainerInterface;
use \Firebase\JWT\JWT;

class authController{

	public function  encode( $row){
		return $row;
	};
}
