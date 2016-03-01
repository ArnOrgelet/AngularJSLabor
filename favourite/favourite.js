'use strict';

/**
 * Das Modul fuer Favourite Modul.
 */
var favourite = angular.module('Favourite', ['base64']);


favourite.directive('favouriteView', function () {
    return {
        templateUrl: 'favourite/favourite.html',
        controller: 'FavouriteController',
        restrict: 'E',
        link: function (scope, element, attrs) {
        }
    };
});

favourite.controller('FavouriteController', ['$scope', '$state', 'UserParams', 'SharedService', function ($scope, $state, UserParams, SharedService) {

    var fromState;
    $scope.favbytype = {};
    $scope.types = $scope.typeSet;

    $scope.selectedoffer = null;

    $scope.$watch("selectedoffer", function (newValue, oldValue) {
        console.log($scope.selectedoffer);
    });

    $scope.setSelectedOffer = function (offer) {
        $scope.selectedoffer = offer;
        console.log($scope.selectedoffer);
    };

    $scope.hasSelectedOffer = function (offer) {
        if ($scope.selectedoffer !== null)
            return true;
        else
            return false;
    };

    $scope.isSelectedOffer = function (offer) {
        return $scope.selectedoffer === offer;
    }

    $scope.infoStyle = {
        border: "4px solid #475cc1",
        backgroundColor: "#18c41a"
    };

    var loadSortedOffers = function () {
        //if (UserParams.active) {
        console.log($scope.typeSet);
        angular.forEach($scope.typeSet, function (type) {
            console.log(type);
            SharedService.getLikedOffersByType(type)
                .then(function (response) {
                    $scope.favbytype[type] = response.data;//$scope.favByTypes.set(type, response.data);
                    console.log($scope.favbytype);
                },
            function (error) {
                console.log('Cannot access notepad data:' + error);
                //$scope.$parent.loged = true;
                //return null;
            });
        })
        // }
        console.log($scope.favbytype);
    };


    var applyService = function (name) {
        switch (name) {
            case 'countries':
                return SharedService.getAllCountries();
                break;
            case 'companies':
                return SharedService.getAllCompanies();
                break;
        }
    }

    $scope.init = function () {
        loadSortedOffers();
        //loadData([{ name: "countries" }, { name: "companies" }]);
    }

    var loadData = function (toSearch) {
        $scope.mutidata = {};
        if (angular.isArray()) {; }
        angular.forEach("toSearch", function (dataItem) {
            var serviceToCall;
            if (angular.isString(dataItem.name)) {
                console.log(dataItem.name);

                serviceToCall = applyService(dataItem.name);
                console.log(serviceToCall);
                $scope.mutidata[dataItem] = serviceToCall
                    .then(
                    function (response) {
                        return response.data;
                    },
                    function (error) {
                        return null;
                    });
            }
        });
    }
    $scope.closed = function () {
        //$state.go($scope.fromState);
    }

}]);