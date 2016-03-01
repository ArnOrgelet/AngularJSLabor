'use strict';

/**
 * Das Modul fuer den Mensa-Zugriff.
 */
var menu = angular.module('Menu', []);




menu.controller('MenuController', ['$scope', 'KeywordService', 'UserParams', 'RestParams', //'LogEventNotifier',
    function ($scope, KeyWordService, UserParams, RestParams) {

    /* initialize scope variables*/

    $scope.updateType = function (event) {
        $scope.$emit("andernTyp", { typeName: $scope.chosentype });
        console.log(event);
        $scope.chosentype = event;
    };

    $scope.keywords = null;
    $scope.ApS = 15;

    $scope.words = "";
    
        /*
    $scope.access = UserParams.active;
    $scope.$watch("access", function (oldVal, newVal) {
        if (newVal == true)
        {//{'btn navbar-btn ':true, 'btn-info ':(chosentype==option), 'btn-default ':(chosentype!=option)} active ':loged, 'disabled ':!loged
            $scope.btnStyle = function () {
                return {
                    display: $scope.master.display,
                    backgroundColor: "#333",
                    width: $scope.master.width + 'px',
                    height: $scope.master.height + 'px',
                    color: "#FFF"
                };
            };
        }
        if (newVal == false) {
            $scope.btnStyle = function () {
                return {
                    display: $scope.master.display,
                    backgroundColor: "#333",
                    width: $scope.master.width + 'px',
                    height: $scope.master.height + 'px',
                    color: "#FFF"
                };
            };
        }
    });
       */

}]);

menu.directive('menuView', function () {
    return {
        scope: {
            selectionSet: '=',
            loged : '='
        },
        trasclude :false,
        templateUrl: 'menu/menuTemplate.html',
        controller: 'MenuController',
        restrict: 'E',
        link: function (scope, element, attrs) {
        }
    };
});
