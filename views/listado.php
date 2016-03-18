<div class="row">
	<div class="col-xs-12 button-row">
		<a href="#expenses/new" class="btn btn-success btn-lg btn-block"><span class="glyphicon glyphicon-plus"></span> Nueva persona</a>
	</div>
</div>
<div class="row">
	<div class="col-xs-12">
	    <ul class="list-group">
	        <li ng-repeat="expense in expenses" class="list-group-item text-center">
	            <span class="pull-left">{{expense.rut}}</span>{{expense.nombre}} (<span style="color:red">{{expense.email}}</span>)
	            <button type="button" class="btn btn-danger btn-s pull-right btn-separation-left" ng-click="remove(expense)"><span class="glyphicon glyphicon-trash"></span></button>
	            <a href="#expenses/edit/{{expense.id}}" class="btn btn-primary btn-s pull-right"><span class="glyphicon glyphicon-pencil"></span></a>
	        </li>
	    </ul>      
	</div><!--End div col-xs-12-->
</div>