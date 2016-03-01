'use strict';

/**
 * Das Modul fuer die Firmen,
 */
var company = angular.module('Company', ['base64', 'uiGmapgoogle-maps', 'nemLogging']);//, 'ngLodash'

company.config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //key: "key", //Clé pour utiliser l'API
        v: '3.17', //Par défaut la version la plus récente disponible
        libraries: 'geometry,places,visualization' //Librairies supplémentaires
    });
}]);

company.directive('companyDetails', function () {
    return {
        scope: {
            company: "=",
            website: "@"
        },
        templateUrl: 'company/companyTemplateDetails.html',
        restrict: 'E',
        controller: function ($scope) {
            $scope.companyname = $scope.company.companyName;
            $scope.nboffers = $scope.company.numberOfOffers;
            $scope.nbemployees = $scope.company.numberOfEmployees;
        },
        link: function (scope, element, attrs) {
            /*
            scope.companyname = scope.company.companyName;
            scope.nboffers = scope.company.numberOfOffers;
            scope.nbemployees = scope.company.numberOfEmployees;*/
        }
    };
});


company.directive('companylocalizer', function () {
    return {
        scope: {
            place: '=',
        },
        templateUrl: 'company/companyLocalizer.html',//'<div id="map" style="height:200px; width: 530px"></div>',
        restrict: 'E',
        controller: 'CompanyLocalizerController',
        link: function (scope, element, attrs, offersViewCtrl, transclude) {
            //scope.reload();
        }
    };
});
company.controller('CompanyLocalizerController', ['$scope', function ($scope, uiGmapGoogleMapApi) {
    var geocoder;
    $scope.map = {};

    //Initialisation des variables
    $scope.map = {
        center: {
            latitude: 46.5132, //initial position of the map
            longitude: 0.1033
        },
        zoom: 11 // de 0 à 19, 0 étant la valeur de zoom la plus forte
    };

    $scope.markers = [{
        coord: {
            latitude: 44.93, //Coordonnées où placer le point
            longitude: 4.89
        },
        email: "netapsys@netapsys.fr", //Propriété métier, pour les afficher à l'utilisateur lorsqu'il sélectionne le point par exemple
        icon: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png", //Icone personnalisée
        id: 412
    }, {
        coord: {
            latitude: 46.5132,
            longitude: 0.1033
        },
        email: "netapsys@netapsys.fr",
        icon: "//developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png", //Icone personnalisée
        id: 413
    }];

    $scope.clickMarker = function (marker) {
        alert(marker.email); //Affichera l'email du point sur lequel on a cliqué
    };
    /*

    //Initialisation of variables
    $scope.map = {
        center: {
            latitude: 46.5132, //Position initial de la carte
            longitude: 0.1033
        },
        zoom: 11 // de 0 à 19, 0 étant la valeur de zoom la plus forte
    };

    $scope.markers = [{
        coord: {
            latitude: 44.93, //Coordonnées où placer le point
            longitude: 4.89
        },
        email: "netapsys@netapsys.fr", //Propriété métier, pour les afficher à l'utilisateur lorsqu'il sélectionne le point par exemple
        icon: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png", //Icone personnalisée
        id: 412
    }];

    $scope.clickMarker = function (marker) {
        alert(marker.email); //Affichera l'email du point sur lequel on a cliqué
    };

    $scope.reload = function () {
        geocoder = new google.maps.Geocoder();
        map = new google.maps.Map(document.getElementById("map"),
        {
            zoom: 8,
            center: new google.maps.LatLng(52.5244, 13.4105),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        geocoder.geocode({ 'address': $scope.place }, function (results, status) {
            console.log('converting adress to LonLat');
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker(
                {
                    map: map,
                    position: results[0].geometry.location
                });
            }
            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }
    */
    $scope.$watch("place", function (newValue, oldValue) {
        console.log($scope.place);
        //$scope.reload();        
    });

}]);

