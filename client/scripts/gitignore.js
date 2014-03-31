var gitignore = angular.module('gitignore', ['angularFileUpload']);

gitignore.controller('mainController', function($scope){

});

gitignore.controller('uploadController',[ '$scope', '$upload', function($scope, $upload){
	
	$scope.filePaths = [];
	$scope.hideGenerator = true;

	$scope.onFileSelect = function($files) {
		//$files: an array of files selected, each file has name, size, and type.
		var rootDir = $files[0].webkitRelativePath.match(/.*\//);
		$scope.filePaths.push(rootDir[0]);
		_.each($files, function(file){
			$scope.filePaths.push(file.webkitRelativePath);
		});

		$scope.hideGenerator = !$scope.hideGenerator;
	};

	$scope.gitIgnoreSelections = [];

	$scope.addToGitIgnore = function(filePath){
		$scope.gitIgnoreSelections.push(filePath);
	};

}]);

