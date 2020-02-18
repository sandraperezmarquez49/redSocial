<?php 

namespace App\controllers;
use Psr\Container\ContainerInterface;
use \Firebase\JWT\JWT;

class baseController{

	protected $container;

	public  function  __construct(ContainerInterface $c){
		$this->container = $c;
	 	$this->$config = $this->container->get('settings');
	 }

	public function encode($row){
		$jwt = JWT::encode($row, $this->$config->KEY);
		return $jwt;
	}

	public function decode($jwt){
		$decoded = JWT::decode($jwt, $this->$config->KEY, array('HS256'));
		return $decoded;
	}


	public function encriptar($clave){
		define('METHOD','AES-256-CBC');
		define('SECRET_KEY','$S5!v10MfW.');
		define('SECRET_IV','7460163');
		$output=FALSE;
			$key=hash('sha256', SECRET_KEY);
			$iv=substr(hash('sha256', SECRET_IV), 0, 16);
			$output=openssl_encrypt($clave, METHOD, $key, 0, $iv);
			 return $output=base64_encode($output);

		
	}
	public function descencriptar($clave){
		define('METHOD','AES-256-CBC');
		define('SECRET_KEY','$S5!v10MfW.');
		define('SECRET_IV','7460163');
		
		$key=hash('sha256', SECRET_KEY);
		$iv=substr(hash('sha256', SECRET_IV), 0, 16);
		return$output1=openssl_decrypt(base64_decode($clave), METHOD, $key, 0, $iv);
		
	}

	
	public function generatePassword($length) {
		$str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
		$password = "";
		for($i=0;$i<$length;$i++) {
			$password .= substr($str,rand(0,62),1);
		}
		return $password;
	}
}