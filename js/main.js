'use strict';

/**
 * Das Haupt-Modul.
 */
var mainApp = angular.module('MainApp', ['Menu', 'Login', 'keywordModule', 'Offer', 'Company', 'Favourite', 'ui.bootstrap', 'ui.router']); // 'Aside', , 'uiGmapgoogle-maps'
/*
mainApp.config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		key: "key", //Clé pour utiliser l'API
		v: '3.17', //Par défaut la version la plus récente disponible
		libraries: 'geometry,places,visualization' //Librairies supplémentaires
	});
}]) ;
*/
mainApp.value('RestParams', {
    url: {
        path: 'http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/'
    },
    typeSet: ["test3"],//[],//['internship', 'joboffer', 'workingstudent', 'thesis'],
    
});


mainApp.value('UserParams', {
    userInfos: {
        firstName: '',
        lastName: ''
    },
    userAccess: '',
    active: false,
});

mainApp.factory('SharedService', ['$http', 'RestParams', 'UserParams', function ($http, RestParams, UserParams) {
    var server = {};

    var nativeURL = RestParams.url.path;
    this.getByURL = function (url) {
        nativeURL += url;
        console.log(nativeURL);
        return $http.get(nativeURL);
    };

    this.deleteByURL = function (url) {
        nativeURL += url;
        console.log(nativeURL);
        return $http.delete(nativeURL);
    };

    server.dislikeOfferById = function (id) {
        URL = 'joboffer/notepad/offer/' + id;
        console.log(nativeURL); 
        return $http.delete(nativeURL + URL);
    };

    server.likeOfferById = function (id) {
        URL = 'joboffer/notepad/offer';
        console.log(nativeURL);
        return $http.post(nativeURL + URL, id);
    };
    

    server.getAllCountries = function () {
        URL = 'joboffer/countries/all';
        console.log(nativeURL);
        return $http.get(nativeURL + URL);
        //return getByURL('/joboffer/countries/all');
    };

    server.getAllCompanies = function () {
        URL = 'joboffer/companies/withoffers';
        console.log(nativeURL);
        return $http.get(nativeURL + URL);
        //return getByURL('/joboffer/companies/all');
    };

    server.getCompaniesWithOffers = function () {
        URL = 'joboffer/companies/withoffers';
        console.log(nativeURL);
        return $http.get(nativeURL + URL);
        //return getByURL('/joboffer/companies/withoffers');
    };

    server.getAllLikedOffers = function () {
        URL = 'joboffer/notepad/0/-1';
        console.log(nativeURL + URL);
        return $http.get(nativeURL + URL);
        //return getByURL('/joboffer/companies/withoffers');
    };

    server.getLikedOffersByType = function (type) {
        //if (angular.isString(type)) {
            URL = 'joboffer/notepad/' + type + '/0/-1';
            console.log(nativeURL + URL);
            return $http.get(nativeURL + URL);
        //}
        //return getByURL('/joboffer/companies/withoffers');
    }
    
    server.getCountryIdByName = function (ctryName) {
        server.getAllCountries().then(
            function(response){
                var countries = response.countries;
                angular.for(countries, function(country){
                    if(country.name == ctryName)
                        return country.id;
                })
                return -1;
            }
            , function(error){});

        return getByURL('/joboffer/countries/all');
    }
    
    /*
    server.getFriendlyNames = function (nativeData) {
        var result = new Array();
        angular.forEach(nativeData, function(elmt){
            result.push(elmt.shortname);
        })
        result.sort();
        return result;
    }*/

    return server;
}]);
/*
mainApp.run(){
    RestParams.setSelectType();
}
*/

/**
 * Controller fuer die Hauptseite. , 'uiGmapgoogle-maps'
 */
mainApp.controller('MainController', ['$scope', '$rootScope', '$state', 'TypeService', 'UserParams', function ($scope, $rootScope, $state, TypeService, UserParams) {

    
    $scope.user = {};

    $scope.test = "tototoot";
    $scope.typeSet = ["test!"];
    $scope.filtersmapping = {};

    $scope.nbEntries = 15;

    $scope.$on('logevent', function (event, data) {
        if (UserParams.active) 
        {
            console.log(data);
            $scope.loged = true;
            $scope.user = data.user;
            //$scope.typeSet = TypeService.getOfferTypes().sort();
            $scope.$digest;
            $scope.$apply;
            console.log('logevent');
        }
    });

    $scope.$watch("filtersmapping", function (newValue, oldValue) {
        //if (oldValue != null)
            console.log('filters changed');
    });

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        $rootScope.fromState = from;
        console.log('newState');
    });

    $scope.$on("andernTyp", function(data){
        console.log("andernTyp");
    });


    $scope.init = function () {
        $scope.loged = false;
        $state.go('home');
    }

}]);


mainApp.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
    
    // Cross-Domain-Aufrufe erlauben
    $httpProvider.defaults.useXDomain = true;
    // Das Mitsenden von Authentifizierungsinformationen erlauben
    $httpProvider.defaults.withCredentials = true;


   // $urlRouterProvider.otherwise('/home');

    $stateProvider
    

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home', 
            controller: 'MainController',
            views: {
                '': {
                    templateUrl: 'content/window1.html',
                    //abstract: true,
                    //controllerAs: 'WindowController' 
                },
                'perso@home': {
                    template: 
                                '<div="persoSeite">' +
                                '<img ng-src="img/hska.gif" alt="HsA-logo">'+
                               '</div>',
                },
                'infos@home': {
                    templateUrl: 'content/welcome.html',
                    controller: 'OfferController',
                    //parent: 'browser@home'
                }
            }
        })


        .state('home.inside', {
            url: '/inside',
            parent: 'home',
            controller:'MainController',
            views: {
                '': {
                    controller: function($scope, $state){
                        if ($scope.loged == false)
                            $state.go('home');
                    },
                },
                'perso@home': {
                    template: '<div="willkommen">' +
                                '<profile-view user="user"></profile-view>' +
                                '</div>'
                }
            }
        })
        // registering regardless of the currently displayed view
        .state('home.login', { //home.
            url: '/login',/*
            parent: 'home',
            templateUrl: 'login/login.html',
            controller: 'LoginController',*/
            views: {
                'perso@home': {
                    templateUrl: 'login/login.html',
                    controller: 'LoginController'
                }
            }
        })

        .state('board', { //home.
            url: '/board',
            //templateUrl: 'content/window2.html',//'content/frame.html',//<h1>hgjghhg</h1>',
            views: {
                '': {
                    templateUrl: 'content/window2.html',
                    resolve: {
                        typesPromise: function (TypeService, UserParams, RestParams) {
                            var selections = [];
                            if (UserParams.active) {
                                console.log("ACTIIIVE");
                                selections = TypeService.getOfferTypes()
                                .then(function (response) {
                                    return response.data;
                                },
                                function (error) {
                                    return ["test1"];
                                });
                            }
                            //RestParams.setSelectTypes(selections);
                            return selections;
                        }
                    },
                    controller: function ($scope, typesPromise) { //'WindowController'  
                        $scope.getFriendlyNames = function (nativeData) {
                            var result = new Array();
                            angular.forEach(nativeData, function (elmt) {
                                result.push(elmt.shortname);
                            })
                            result.sort();
                            return result;
                        }

                        $scope.$parent.typeSet = $scope.getFriendlyNames(typesPromise);  //RestParams.getSortedTypeSet();
                    }
                    //parent: 'MainController',
                    //abstract: true,
                    //controllerAs: 'WindowController'
                },
                'browser@board': {
                    templateUrl: 'content/frame.html',
                    controller: function ($scope, $state, $stateParams) {
                        //$scope.include = [];
                        $scope.type = $stateParams.type;
                        $scope.$watch("include", function (oldVal, newVal) {
                            if (oldVal !== null) {
                                console.log('NEW FILTER');
                               // $state.go('board.selection({type: ' + $scope.type + ', from: 0})');
                            }
                        });

                    }
                },
                'displayer@board': {
                    template: '<blockquote><p>Entscheiden Sie sich bitte für eine Rubrik...</p></blockquote>'
                }
            }
            })
        
        .state('favourite', {
            url: '/myFavourite',
            template: '<favourite-view></favourite-view>',
            //controller: 'FavouriteController'
        })
        
        // nested list with custom controller
        .state('board.selection', {
            url: '/selection/:type/:from/:to/:kw',
            resolve: {
                offersPromise: function ($stateParams, OfferService) {
                    console.log('here is the type :' + $stateParams.type);
                    //var keywords = $stateParams.kw.split(" ") || [];
                    var queryParams = { typ: $stateParams.type, start: $stateParams.from, anzahl: $stateParams.to - $stateParams.from, schlussel: $stateParams.kw };
                    var filteringCountryId;
                            
                    //if(angular.isDefined($stateParams.land) && $stateParams.land!==null) {
                    //    filteringCountryId = OfferService.getCountryIdByName($stateParams.land);
                    //}
                            
                    return OfferService.getFilteredOffers(queryParams)
                        .then(function (response) {
                            response.countryId = filteringCountryId;
                            console.log(response.data);
                            return response.data;
                        },
                    function (error) {
                        console.log('Access refused because of :' + error);
                    });
                }
                            
            },
            views: {
                'displayer@board': {
                    templateUrl: 'content/screen.html',
                    transclude: true,
                    //replace: true,
                    controller: ['$scope', '$stateParams', '$state', 'offersPromise', function ($scope, $stateParams, $state, offersPromise) {
                        //industrialSectors="multidata.industrialSectors" 
                        $scope.infoStyle = {
                            border: "2px solid #d5ade1",
                            backgroundColor: "#18c41a"
                        };

                        console.log('bibibi');
                        $scope.selectedOffer = {};
                        $scope.multidata = offersPromise;
                        $scope.offers = $scope.multidata.offers;
                        $scope.companies = $scope.multidata.companies;
                        $scope.nbHits = $scope.multidata.totalHits;
                        console.log($scope.offers);

                        $scope.from = $stateParams.from;//$stateParams.offset; //.$parent
                        $scope.nbEntries = 15;// other solution $stateParams.to - $stateParams.from;
                        $scope.type = $stateParams.type;
                        $scope.$parent.curPageIndex = $scope.from / $scope.nbEntries + 1;
                        
                        var loadNewPage = function(type, from, offset){
                            $state.go('board.selection({ type: ' + type + ', from:' + from + ', to: ' + offset + '})');
                        };

                        $scope.nextPage = function () {
                            loadNewPage($scope.type, $scope.from, $scope.nbEntries);
                            //$state.go('board.selection({ type: ' + $stateParams.type + ', offset:' + from + ', nbEntries: ' + $stateParams.nbEntries + '})');
                        };

                        $scope.prevPage = function () {
                            loadNewPage($scope.type, $scope.from, $scope.nbEntries);
                        }
                    }]
                }
            }
        })

});


mainApp.service('utilsService', [
    function () {
        this.capitalize = function (str) {
            if (input != null && anngular.isString(input))
            return str.charAt(0).toUpperCase() + str.slice(1);
        };
    }
]);

mainApp.filter('capitalize', ['utilsService', function (utilsService) {
    return function(input) {
        utilsService.capitalize(input);
    }
}]);


menu.directive('profileView', function () {
    return {
        scope: {
            user: '='
        },
        templateUrl: 'login/profile.html',
        /*controller: function ($scope) {
            $scope.user = user;
        },*/
        restrict: 'E',
        link: function (scope, element, attrs) {
        }
    };
});