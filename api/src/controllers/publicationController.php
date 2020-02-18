<?php namespace 

App\controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\controllers\baseController;
use Psr\Container\ContainerInterface;

class publicationController extends baseController {


	public function new(Request $request, $response, $arg){

		$pdo =  $this->container->get('db');
		
		$params = $request->getParsedBody();
		
		if($params['imagen']){ 
			$imagen = $params['imagen'];

			$nameImg = $this->generatePassword(6);

			$path = "uploads/usuarios";
			if(!file_exists($path)){ mkdir($path, 0777, true); }
			$baseFromJavascript = str_replace(' ', '+', $imagen);
			$base_to_php = explode(',', $baseFromJavascript);
			$data = base64_decode($base_to_php[1]);
			$filePath = $path . "/" . $nameImg . ".png";
			file_put_contents($filePath, $data);
		}
				
		
		$row = [
			'descripcion' => $params['descripcion'],
			'imagen' => $nameImg,
			'destacado' => $params['destacado'],
			'idUsuario' => $params['idUsuario'],
	        
		];

			$query =  "INSERT INTO publicaciones (`descripcion`, `imagen`, `destacado`, `idUsuario`) VALUES (:descripcion, :imagen, :destacado, :idUsuario)";
		
			$success = $pdo->prepare($query)->execute($row);

			$response->getBody()->write(json_encode((object)[
					"status" => 200,
					"message" => 'Publication registered',
				]
			));
		
    	return $response
    		->withHeader("Content-type", "application/json")
    		->withHeader('Access-Control-Allow-Origin', '*')
    		->withHeader('Access-Control-Allow-Methods', 'POST')
			->withStatus(200);

			
	}

	public function view(Request $request, $response, $arg){
		$pdo =  $this->container->get('db');
		$params = $request->getParsedBody();
		$row = [
	        'idPublicacion' => $params['idPublicacion'],
		];
		

		$query = $pdo->query("SELECT * FROM publicaciones WHERE `idPublicacion` = '" . $params['idPublicacion'] . "' ");
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
			'idPublicacion' => $params['idPublicacion'],
			'descripcion' => $params['descripcion'],
			'imagen' => $nameImg,
			'destacado' => $params['destacado'],
			
		];
	    $querySerch = $pdo->query("SELECT * FROM publicaciones WHERE `idPublicacion` = '" . $params['idPublicacion'] . "' ");
		
		$successSerch = $querySerch->fetchAll();
		if (sizeof($successSerch) > 0){

			$theRow = [];

			$theRow['idPublicacion'] = $successSerch[0]->idPublicacion;

			if(!$params['descripcion']){
				$theRow['descripcion'] = $successSerch[0]->descripcion;
			}else{
				$theRow['descripcion'] = $params['descripcion'];
			}

			if(!$params['destacado']){
				$theRow['destacado'] = $successSerch[0]->destacado;
			}else{
				$theRow['destacado'] = $params['destacado'];
			}

			if(!$params['idUsuario']){
				$theRow['idUsuario'] = $successSerch[0]->idUsuario;
			}else{
				$theRow['idUsuario'] = $params['idUsuario'];
			}


			if(!$params['imagen']){
				$theRow['imagen'] = $successSerch[0]->imagen;
			}else{

				$oldImg = "uploads/usuarios" .$successSerch[0]->imagen. ".png";
				if(file_exists($oldImg)){
					unlink($oldImg);
				}

				$imagen = $params['imagen'];

				$nameImg = $this->generatePassword(6);

				$path = "uploads/usuarios";
				if(!file_exists($path)){ mkdir($path, 0777, true); }
				$baseFromJavascript = str_replace(' ', '+', $imagen);
				$base_to_php = explode(',', $baseFromJavascript);
				$data = base64_decode($base_to_php[1]);
				$filePath = $path . "/" . $nameImg . ".png";
				file_put_contents($filePath, $data);
		
				$theRow['imagen'] = $nameImg;
			}


			$query = "UPDATE publicaciones SET `idPublicacion`=:idPublicacion, `descripcion`=:descripcion, `idUsuario`=:idUsuario,
			`imagen`=:imagen, `destacado`=:destacado WHERE `publicaciones`.`idPublicacion` = :idPublicacion";
			
			$success = $pdo->prepare($query)->execute($theRow);

			$response->getBody()->write(json_encode((object)[
					"status" => 200,
					"message" => "Publication updated",
				]
			));
		}else{
			$response->getBody()->write(json_encode((object)[
				"status" => 400,
				"message" => 'Publication not found.'
				]
			));
		}

    	return $response
    		->withHeader("Content-type", "application/json")
    		->withHeader('Access-Control-Allow-Origin', '*')
    		->withHeader('Access-Control-Allow-Methods', 'POST')
			->withStatus(200);
	}

	public function list(Request $request, $response, $arg){
		$pdo =  $this->container->get('db');
		$params = $request->getParsedBody();
		$query = $pdo->query("SELECT * FROM publicaciones");

		$success = $query->fetchAll();
		if (sizeof($success) > 0){

			$response->getBody()->write(json_encode((object)[
					"data" => $success,
					"status" => 200,
					"message" => "Lists Publicaciones",
				]
			));
		} else {
			$response->getBody()->write(json_encode((object)[
				"status" => 400,
				"message" => 'List not found.'
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
	        'idPublicacion' => $params['idPublicacion'],
	    ];

		$query = "DELETE FROM publicaciones WHERE `publicaciones`.`idPublicacion` = :idPublicacion";

		$success = $pdo->prepare($query)->execute($row);

		$path = "uploads/usuarios/" . $params['imagen']. ".png";
					if(file_exists($path)){
						unlink($path);
					}	

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

	public function destacar(Request $request, $response, $arg){
		$pdo =  $this->container->get('db');
		$params = $request->getParsedBody();
		$row = [
	        'idPublicacion' => $params['idPublicacion'],
		];
		

		$query1 = $pdo->query("SELECT * FROM publicaciones WHERE `idPublicacion` = '" . $params['idPublicacion'] . "' ");
		$success1 = $query1->fetchAll();
		$destaca = $success1[0]->destacado;


		$suma =$destaca + 1;


		$theRow = [

			'idPublicacion' => $params['idPublicacion'],
			'destacado' => $suma,
		];
				

			$query = "UPDATE publicaciones SET `idPublicacion`=:idPublicacion, `destacado`=:destacado WHERE `publicaciones`.`idPublicacion` = :idPublicacion";
			
			$success = $pdo->prepare($query)->execute($theRow);

			$response->getBody()->write(json_encode((object)[
					"status" => 200,
					"message" => "Publication updated",
				]
			));
		

    	return $response
    		->withHeader("Content-type", "application/json")
    		->withHeader('Access-Control-Allow-Origin', '*')
    		->withHeader('Access-Control-Allow-Methods', 'POST')
			->withStatus(200);

	}

	

}
