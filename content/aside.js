'use strict';

/**
 * Das Modul fuer den Filternfield.
 */
var aside = angular.module('Aside', ['base64', 'MainApp']);


aside.factory('AsideService', ['$http', 'RestParams', '$base64', function ($http, RestParams, $base64) {
    var server = {};
    return server;
}]);

/*
aside.controller('AsideController', ['$scope', 'AsideService', 'KeywordService', function ($scope, AsideService, KeywordService) {
    $scope.badgeClosed = function (elmt) {
        console.log(elmt);
        if (KeyWordService.removeKeyword(elmt.kw))
            $scope.keywords = KeywordService.keywords;
    }

    $scope.submit = function () {
        if ($scope.wordsInput) {
            var words = $scope.wordsInput.split(" ") || [];
            if (words.length > 0) {
                angular.forEach(words, function (input) {
                    console.log(input);
                    if (KeywordService.addKeyword(input))
                        ;
                });
            }
            $scope.wordsInput = "";
            $scope.keywords = KeywordService.keywords;
            console.log($scope.keywords);
        }
    }

    $scope.toto = 'abc';
    //console.log($scope);
}]);
*/
