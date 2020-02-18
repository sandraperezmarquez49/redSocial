<?php namespace 

App\controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\controllers\baseController;
use Psr\Container\ContainerInterface;

class usersController extends baseController {


	public function new(Request $request, $response, $arg){

		$pdo =  $this->container->get('db');	
		$params = $request->getParsedBody();

		$clave = $params['pass'];
		$pass = $this->encriptar($clave);

		$row = [
			'email' => $params['email'],
			'pass' => $pass,
			'apellido' => $params['apellido'],
			'nombre' => $params['nombre'],
			'sexo' => $params['sexo'],
			'telefono' => $params['telefono'],
			'fechaNacimiento' => $params['fechaNacimiento'],				        
		];


		$queryEmail = $pdo->query("SELECT * FROM usuarios WHERE (`email` = '" . $params['email'] . "')");
		$countEmail = sizeof($queryEmail->fetchAll());
		if ($countEmail == 0) {
			$query =  "INSERT INTO usuarios (`email`, `pass`, `apellido`,  `nombre`, `sexo`, `telefono`, `fechaNacimiento`) VALUES (:email, :pass, :apellido, :nombre, :sexo, :telefono, :fechaNacimiento)";
		
			$success = $pdo->prepare($query)->execute($row);

			$response->getBody()->write(json_encode((object)[
					"status" => 200,
					"message" => 'User registered',
				]
			));
		} else {
			$response->getBody()->write(json_encode((object)[
					"status" => 400,
					"message" => 'Email aready registered.',
				]
			));
		}
		
    	return $response
    		->withHeader("Content-type", "application/json")
    		->withHeader('Access-Control-Allow-Origin', '*')
    		->withHeader('Access-Control-Allow-Methods', 'POST')
			->withStatus(200);

			
	}

	public function viewUser(Request $request, $response, $arg){
		$pdo =  $this->container->get('db');
		$params = $request->getParsedBody();
		$row = [
	        'email' => $params['email'],
		];
		

		$query = $pdo->query("SELECT * FROM usuarios WHERE `email` = '" . $params['email'] . "' ");
		$success = $query->fetchAll();	

			$response->getBody()->write(json_encode((object)[
					"status" => 200,
					"token" => $this->encode($success[0]),
					"user"  => $success[0],
					"message" => 'User found.'
				]
			));
		

    	return $response
    		->withHeader("Content-type", "application/json")
    		->withHeader('Access-Control-Allow-Origin', '*')
    		->withHeader('Access-Control-Allow-Methods', 'POST')
			->withStatus(200);

	}

	public function edit(Request $request, $response, $arg){
		$pdo =  $this->container->get('db');
		$params = $request->getParsedBody();

		$row = [
			'idUsuario' => $params['idUsuario'],
			'email' => $params['email'],
			'pass' => $params['pass'],
			'apellido' => $params['apellido'],
			'nombre' => $params['nombre'],
			'sexo' => $params['sexo'],
			'telefono' => $params['telefono'],
			'fechaNacimiento' => $params['fechaNacimiento'],				        
		];
	    $querySerch = $pdo->query("SELECT * FROM usuarios WHERE `idUsuario` = '" . $params['idUsuario'] . "' ");
		
		$successSerch = $querySerch->fetchAll();
		if (sizeof($successSerch) > 0){

			$theRow = [];

			$theRow['idUsuario'] = $successSerch[0]->idUsuario;

			if(!$params['email']){
				$theRow['email'] = $successSerch[0]->email;
			}else{
				$theRow['email'] = $params['email'];
			}

			if(!$params['pass']){
				$theRow['pass'] = $successSerch[0]->pass;
			}else{
				$clave = $params['pass'];
				$pass = $this->encriptar($clave);
				$theRow['pass'] = $pass;
			}

			if(!$params['apellido']){
				$theRow['apellido'] = $successSerch[0]->apellido;
			}else{
				$theRow['apellido'] = $params['apellido'];
			}

			if(!$params['nombre']){
				$theRow['nombre'] = $successSerch[0]->nombre;
			}else{
				$theRow['nombre'] = $params['nombre'];
			}

			if(!$params['sexo']){
				$theRow['sexo'] = $successSerch[0]->sexo;
			}else{
				$theRow['sexo'] = $params['sexo'];
			}

			if(!$params['telefono']){
				$theRow['telefono'] = $successSerch[0]->telefono;
			}else{
				$theRow['telefono'] = $params['telefono'];
			}

			if(!$params['fechaNacimiento']){
				$theRow['fechaNacimiento'] = $successSerch[0]->fechaNacimiento;
			}else{
				$theRow['fechaNacimiento'] = $params['fechaNacimiento'];
			}

			
			$query = "UPDATE usuarios SET `idUsuario`=:idUsuario, `email`=:email, `pass`=:pass,
			 `apellido`=:apellido, `nombre`=:nombre, `sexo`=:sexo,`telefono`=:telefono, `fechaNacimiento`=:fechaNacimiento WHERE `usuarios`.`idUsuario` = :idUsuario";
			
			$success = $pdo->prepare($query)->execute($theRow);

			$response->getBody()->write(json_encode((object)[
					"status" => 200,
					"message" => "User updated",
				]
			));
		}else{
			$response->getBody()->write(json_encode((object)[
				"status" => 400,
				"message" => 'User not found.'
				]
			));
		}

    	return $response
    		->withHeader("Content-type", "application/json")
    		->withHeader('Access-Control-Allow-Origin', '*')
    		->withHeader('Access-Control-Allow-Methods', 'POST')
			->withStatus(200);
	}


	public function delete(Request $request, $response, $arg){
		$pdo =  $this->container->get('db');
		 $state = 0;
		$params = $request->getParsedBody();
		$row = [
	        'idUsuario' => $params['idUsuario'],
	    ];

		$query = "DELETE FROM  usuarios  WHERE `usuarios`.`idUsuario` = :idUsuario";

		$success = $pdo->prepare($query)->execute($row);

		$response->getBody()->write(json_encode((object)[
				"status" => 200,
				"message" => 'User Delete',
			]
		));
		
    	return $response
    		->withHeader("Content-type", "application/json")
    		->withHeader('Access-Control-Allow-Origin', '*')
    		->withHeader('Access-Control-Allow-Methods', 'POST')
			->withStatus(200);
	}

	public function login(Request $request, $response, $arg){
		$pdo =  $this->container->get('db');
		$params = $request->getParsedBody();
		$row = [
	        'email' => $params['email'],
	        'pass' => $params['pass'],
		];
		

		$query = $pdo->query("SELECT * FROM usuarios WHERE `email` = '" . $params['email'] . "' ");
		
		$success = $query->fetchAll();
		if (sizeof($success) > 0){
			$clave=$success[0]->pass;

			$pass = $this->descencriptar($clave);


			
			if($pass==$params['pass']){
					unset($success[0]->password);
					$response->getBody()->write(json_encode((object)[
						"status" => 200,
						"token" => $this->encode($success[0]),
						"user"  => $success[0],
						"message" => 'User found.'
					]
					));
				}else{
					$response->getBody()->write(json_encode((object)[
					"status" => 400,
					"message" => 'Password invalid.'
					]
					));
				}
		} else  {
			$response->getBody()->write(json_encode((object)[
				"status" => 400,
				"message" => 'User not found.'
				]
			));
		}

    	return $response
    		->withHeader("Content-type", "application/json")
    		->withHeader('Access-Control-Allow-Origin', '*')
    		->withHeader('Access-Control-Allow-Methods', 'POST')
			->withStatus(200);

		
	}


}
