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

	$scope.root = [];

	// check exists

	$scope.checkExists = function(currPath, currObj){
		var verdict = false;

		for (var i = 0; i < currObj.length; i++){
			if (currObj[i].dir === currPath) {
				verdict = true;
				return verdict;
			}
		}
		return verdict;
	};

	// grab child 

	$scope.grabChild = function(currPath, currObj){
		for (var i = 0; i < currObj.length; i++){
			if (currObj[i].dir === currPath) {
				return currObj[i].children;
			}
		}
	};

	// add children to root obj


	$scope.addChild = function(root, filePath){
		var currObj = root;
		var path = '';

		for (var i = 0; i < filePath.length; i++){
			path += i === filePath.length - 1 ? filePath[i] : filePath[i] + '/';
			if (currObj.length && $scope.checkExists(filePath[i], currObj)) {
				currObj = $scope.grabChild(filePath[i], currObj);
			} else {
				currObj.push({
					dir: filePath[i],
					children: [],
					fullPath: path
				});
				currObj = $scope.grabChild(filePath[i], currObj);
			}
		}
	};

	// grab files from upload

	$scope.onFileSelect = function($files) {
		var rootDir = $files[0].webkitRelativePath.match(/.*\//);

		_.each($files, function(file){

			var fileArr = file.webkitRelativePath.slice(rootDir[0].length).split('/');

			if (fileArr[fileArr.length-1] === '.') {
				fileArr.pop();
			}

			$scope.addChild($scope.root, fileArr);

		});

		console.log($scope.root);
	};

	$scope.gitIgnoreSelections = {};



}]);


// file controller

gitignore.controller('fileController', function($scope){

	$scope.checked = false;

	$scope.addToGitIgnore = function(fileObj){
		
		$scope.checked = !$scope.checked;

		if ($scope.checked === true) {
			$scope.gitIgnoreSelections[fileObj.fullPath] = fileObj.fullPath;
		} else {
			if ($scope.gitIgnoreSelections[fileObj.fullPath]) {
				delete $scope.gitIgnoreSelections[fileObj.fullPath];
			}
		}
	};
});







