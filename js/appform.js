var app = angular.module("expensesApp",['ngRoute']);

//Configuración de la app
//Entrega las rutas que usará la aplicación
app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		//Cuando está en la raíz, mostrará el listado
		.when('/',{
			templateUrl:'views/listado.php',
			controller:'ExpensesViewController'
		})
		//Cuando se envía a /expenses también muestra el listado
		.when('/expenses',{
			templateUrl:'views/listado.php',
			controller:'ExpensesViewController'
		})
		//Cuando se quiere crear un nuevo registro, se envía al formulario
		.when('/expenses/new',{
			templateUrl:'views/form.php',
			controller:'ExpenseViewController'
		})
		//Cuando se quiere editar, se envía al formulario, con los datos del registro a editar
		.when('/expenses/edit/:id',{
			templateUrl:'views/form.php',
			controller:'ExpenseViewController'
			})
		//En caso contrario, se redirecciona a la raíz
		.otherwise({
			redirectTo:'/'
		});
}]);

//Servicio de la Aplicación
app.factory('Expenses', function($http){
	//nueva variable
	var service ={};

	//Los registros desde la bd se cargarán aquí
	service.entries =[];

	//Obtiene el listado completo desde la bd
	$http.get('modelo/getpersonas.php').
		success(function(data){
			//Si es exitoso, lo presenta en el listado
			service.entries = data;
		}).
		error(function(data,status){
			alert('error!');
		});

	//Obtiene los valores de un registro a partir de la id
	service.getById=function(id){
		return _.find(service.entries, function(entry){return entry.id == id});
	};

	//Función save
	service.save =function(entry){
		//Obtiene los datos de un registro a partir de la id
		var toUpdate = service.getById(entry.id);
		//Si los valores existen, actualiza los datos
		if(toUpdate){
			$http.post('modelo/updatepersona.php',entry).
				success(function(data){
					if(data.success){
						_.extend(toUpdate,entry);
					}
				}).
				error(function(data,status){
					alert('error!');
				})
		}
		//Si no existen, crea un nuevo registro
		else{
			$http.post('modelo/insertpersona.php',{'rut':entry.rut,'nombre':entry.nombre,'email':entry.email}).
			success(function(data){
				entry.id = data.newId;
				service.entries.push(entry);
			}).
			error(function(data,status){
				alert('error!');
			})
		}
		
	}

	//Función remove, permite eliminar un registro
	service.remove = function(entry){
		$http.post('modelo/deletepersona.php',{id:entry.id}).
			success(function(data){
				if(data.success){
					service.entries = _.reject(service.entries,function(element){
						return entry.id == element.id
					});
				}		
			}).
			error(function(data,status){
				alert('error!');
			})
	};

	return service;
});

//Controlador que está a cargo del listado
app.controller('ExpensesViewController',['$scope','Expenses',function($scope,Expenses){
	$scope.expenses =Expenses.entries;

	//Permite eliminar registros llamando a la función remove del servicio "service"
	$scope.remove = function(expense){
		Expenses.remove(expense);
	};

	//watch permite estar atento a los cambios realizados, para actualizar la vista
	$scope.$watch(function(){
		return Expenses.entries;
	},
	function(entries){
		$scope.expenses=entries;
	});
}]);

//Controlador a cargo de la vista Formulario
app.controller('ExpenseViewController', ['$scope','$routeParams','$location','Expenses', function($scope,$routeParams,$location,Expenses){
	if(!$routeParams.id){
		//$scope.expense =  {id:7,rut:'something',nombre:'pablo millaquen',email:'pablomillaquen@gmail.com'};
	}
	else{
		$scope.expense = _.clone(Expenses.getById($routeParams.id));
	}
	//Guarda los registros y redirecciona a la raíz
	$scope.save =function(){
		Expenses.save($scope.expense);
		$location.path('/');
	}
}]);