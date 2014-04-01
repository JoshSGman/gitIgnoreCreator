var gitignore = angular.module('gitignore', ['angularFileUpload']);

gitignore.service('fileOrDir', function(){

	this.isDir = function(path){
		return path[path.length-1] === '.' ? true : false;
	};

});

// main controller

gitignore.controller('mainController', function($scope){

});

// upload controller

gitignore.controller('uploadController',[ '$scope', '$upload', 'fileOrDir', function($scope, $upload, fileOrDir){

	$scope.filePaths = {};
	$scope.root = {};

	$scope.addChild = function(root, filePath){
		var currObj = root;

		for (var i = 0; i < filePath.length; i++){
			if (currObj[filePath[i]]) {
				currObj = currObj[filePath[i]];
			} else {
				currObj[filePath[i]] = {};
				var temp = currObj[filePath[i]];
				currObj = temp;
			}
		}
	};

	$scope.showChildren = function(dirname){
		console.log(dirname);
		var currRoot = $scope.root;
		var keys;

		var findDir = function(dirname, currRoot) {
			if (currRoot[dirname]) {
				keys = Object.keys(currRoot[dirname]);
				return;
			} else {
				for (var key in currRoot) {
					findDir(dirname, currRoot[key]);
				}
			}
		};

		findDir(dirname, currRoot);

		if (!keys.length) {
			return;
		}

		$scope.dirname = keys;
		var childTemp = $('<li class=\'filePath\' ng-repeat=\'filePath in '+filePaths.dirname+'\' ng-controller=\'fileController\'><input name="fileCheck" value="{{filePath}}" type="checkbox" ng-click=addToGitIgnore(filePath) ng-model=\'checked\'><a href=\'#\' ng-click=showChildren(filePath) class=\'fileAnchor\'><img class=\'expand\' src=\'/images/expand.png\'>{{filePath}}</a></li>');
		console.log($(this).find('img'));
		// $(this).append(childTemp);
	};



	$scope.onFileSelect = function($files) {
		console.log($files);
		var rootDir = $files[0].webkitRelativePath.match(/.*\//);

		_.each($files, function(file){

			var fileArr = file.webkitRelativePath.slice(rootDir[0].length).split('/');

			$scope.addChild($scope.root, fileArr);

		});
		$scope.filePaths = Object.keys($scope.root);
	};

	

	$scope.gitIgnoreSelections = {};

}]);

// file controller

gitignore.controller('fileController', function($scope){
	
	$scope.checked = false;

	$scope.addToGitIgnore = function(filePath){
		$scope.checked = !$scope.checked;

		if ($scope.checked === true) {
			$scope.gitIgnoreSelections[filePath] = filePath;
		} else {
			if ($scope.gitIgnoreSelections[filePath]) {
				delete $scope.gitIgnoreSelections[filePath];
			}
		}
	};
});







