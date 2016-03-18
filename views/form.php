<form name="expenseForm" role="form" class="form-horizontal">
  <div class="row">
    <div class="col-xs-12">
      <div class="alert alert-warning" ng-show="expenseForm.$dirty && expenseForm.$invalid">
        Por favor, ingrese los valores que corresponden en los campos requeridos.
      </div>
      <div class="form-group">
        <label class="control-label col-xs-2"> * R.U.T.:</label>
        <div class="col-xs-10"><input class="form-control" placeholder="12345678-0" required ng-model="expense.rut"></div>
      </div>
          
      <div class="form-group">
        <label class="control-label col-xs-2">Nombre:</label>
        <div class="col-xs-10"><input class="form-control" placeholder="Juan Perez" ng-model="expense.nombre"></div>
      </div>
          
      <div class="form-group">
        <label class="control-label col-xs-2">* Email:</label>
        <div class="col-xs-10"><input class="form-control" type="email" placeholder="persona@empresa.cl" required ng-model="expense.email"></div>
      </div>
          
      <button type="submit" class="btn btn-success col-xs-offset-2" ng-click="expenseForm.$valid && save()">Enviar</button>
      <a href="#expenses" class="btn btn-default">Cancelar</a>
    </div><!--End div col-xs-12-->
  </div><!--End div row-->
</form><!--End form-->