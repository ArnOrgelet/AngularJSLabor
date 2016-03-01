'use strict';

/**
 * Das Modul fuer den Mensa-Zugriff.
 */
var offer = angular.module('Offer', ['base64']);


offer.factory('TypeService', ['$http', 'RestParams', 'UserParams', function ($http, RestParams, UserParams) {
    var server = {};

    server.getOfferTypes = function () {
        var url = RestParams.url.path;
        url += 'joboffer/offertypes/all';
        //if (UserParams.active) {
        return $http.get(url);
        //}
       // return RestParams.typeSet;
    };

    server.getFriendlyNames = function (nativeData) {
        var result = new Array();
        angular.forEach(nativeData, function(elmt){
            result.push(elmt.shortname);
        })
        result.sort();
        return result;
    }
/*    
    server.setSelectType = function (arr, clearPrev) {
        if(angular.isArray(arr) && typeSet.isBoolean(clearPrev)) {
            if(clearPrev)
                typeSet = arr;
            else
                angular.forEach(arr, function(elmt){
                    typeSet.push(elmt);
                });
        }
    };

    server.addSelectType = function (entry) {
        if(angular.isString(entry) && typeSet.indexOf(entry) > -1)
            typeSet.push(entry);
    };

    server.removeSelectType = function (index) {
        if(angular.isNumber(entry) && index < typeSet.length)
            typeSet.splice(entry, 1);
    };

    server.getSortedTypeSet = function () {
        var copy = typeSet.slice(0);
        copy.sort();
        return copy;
    }
    */
    server.toto = "toto";

    return server;
}]);


offer.factory('OfferService', ['$http', 'RestParams', '$base64', function ($http, RestParams, $base64) {
    var server = {};
    server.offerType = '';

    server.getFilteredOffers = function (kriterien) {
        var url = RestParams.url.path + 'joboffer/offers';
        console.log("kriterien");
        console.log(kriterien);/*
        if (!angular.isDefined(kriterien))
            return null;
        if (angular.isString(kriterien)) {
            url += kriterien;
            console.log(url);
            return $http.get(url);
        }*/
        if (angular.isDefined(kriterien.typ)) {
            //if (RestParams.offerTypes.indexOf(kriterien.typ) > -1)
            {
                url += '/' + kriterien.typ; // || ''
                server.offerType = kriterien.typ;
            }
        }
        else { /* by default we are looking for offers with the same type as before */
           /* if(server.offerType)
                url += server.offerType;
            else
                return null;*/
        }
        if (angular.isDefined(kriterien.schlussel)) {
            url += '/' + kriterien.schlussel;
            /*
            if (angular.isObject(kriterien.schlussel)) {
                if (angular.isArray(kriterien.schlussel)) {
                    angular.forEach(kriterien.keywords, function (word) {
                        url += ' ' + word;
                    });
                }
            }
            else if (angular.isString(kriterien.schlussel))
                url += '/' + kriterien.schlussel;
            */
        }
        kriterien.start = parseInt(kriterien.start, 10);
        if (angular.isNumber(kriterien.start) && kriterien.start > -1)
            url += '/' + (kriterien.start || 0);
        kriterien.anzahl = parseInt(kriterien.anzahl, 10);
        if (angular.isNumber(kriterien.anzahl) && kriterien.anzahl > 0)
            url += '/' + (kriterien.anzahl || 0);

        console.log(url);
        return $http.get(url);
    };

    return server;
}]);

offer.factory('UIService', [function(){
    var server = {};

    server.getNavIndexes = function(val, nbElmts){
        var start = -1;
        var arr = [];
        if (val <= (nbElmts + 1) / 2)
            start = 1;
        else
            start = val - (nbElmts + 1) / 2;
        for (var i = 0; i < nbElmts; i++)
            arr.push(i + start);
        return arr;
    }

    return server;
}]);


/**
 * Controller fuer Ausgabe der Mahlzeiten.
 */
offer.controller('OfferController', ['$scope', 'OfferService', 'UIService', function ($scope, OfferService, UIService) {
    // current type of jobs
    var jobType = '';

    $scope.$watch("activeType", function (newValue, oldValue) {
        jobType = newValue;
        if (typeof jobType === "string" && jobType.length > 0) {
            OfferService.getFilteredOffers({ typ: jobType, schlussel: [] });
        }
    });

    $scope.display = {};

    $scope.display.lastPageIndex = 1222;
    $scope.display.curPageIndex = 1;
    $scope.display.nbPageIndexes = 6;
    $scope.display.navIndexes = UIService.getNavIndexes($scope.curPageIndex, $scope.nbPageIndexes);


    $scope.$watch("curPageIndex", function (newValue, oldValue) {
        if(oldValue > 0)
            OfferService.getFilteredOffers({typ:'internship', start:10, anzahl:15});
    });

    $scope.init = function () {

    }
}]);


offer.directive('offersView', function () {
    return {
        scope: {
            offersdata: '=',
            countriesdata: '=',
            companiesdata: '=',
            type: '@',
            activeoffer: '='
        },
        transclude: true,
        controller: function ($scope) {
            $scope.activeOffer = {};
            console.log($scope.companiesdata);
            this.getCountryById = function (id) {
                if(angular.isDefined($scope.countriesdata))
                    return $scope.countriesdata[parseInt(id)];
            },
            this.getCompanyById = function (id) {
                if (angular.isDefined($scope.companiesdata))
                    return $scope.companiesdata[parseInt(id)];
            }
            this.getIndustrialSectorById = function (id) {
                if (angular.isDefined($scope.industrialSectorsdata))
                    return $scope.industrialSectorsdata[id];
            }
        },
        templateUrl: 'offer/offersTemplate.html',
        restrict: 'E',
        link: function (scope, element, attrs) {
        }
    };
});

offer.directive('offerIntro', function () {
    return {
        scope: {
            offer: '=',
        },
        controller: function ($scope) {
        },
        require: '^offersView',
        remplace: true,
        templateUrl: 'offer/offerTemplateIntro.html',
        restrict: 'E',
        transclude: true,//
        link: function (scope, element, attrs, offersViewCtrl, transclude) {
            scope.offer.country = offersViewCtrl.getCountryById(scope.offer.countryId);
            scope.offer.company = offersViewCtrl.getCompanyById(scope.offer.companyId);
            scope.setActiveOffer = function (offer) {
                offersViewCtrl.activeOffer = offer;
                console.log(offer);
            };

            /*
            transclude(function (clone, scope) { //scope.$parent, 
                element.append(clone);
            });
            */
        }
    };
});

offer.directive('offerDetails', function () {
    return {
        scope: {
            offer: '=',
        },
        templateUrl: 'offer/offerTemplateDetails.html',
        restrict: 'E',
        require: '^offersView',
        remplace: true,
        transclude: true,//
        controller: function ($scope, SharedService) {

            $scope.changelike = function (offerId, YoN) {
                if (YoN)
                    $scope.like(offerId);
                else
                    $scope.dislike(offerId);
            };

            $scope.like = function (offerId) {
                SharedService.likeOfferById(offerId).then(function (data, status, headers, config) {
                }, function (data, status, header, config) {
                    console.log('adding offer to notepad failed:' + error);
                });
            };

            $scope.dislike = function (offerId) {
                SharedService.dislikeOfferById(offerId).then(function (response) {
                },
                function (error) {
                    console.log('deleting offer of notepad failed:' + error);
                });
            };
        },
        link: function (scope, element, attrs, offersViewCtrl, transclude) {
            transclude(function (clone, scope) { //scope.$parent, 
                element.append(clone);
            });
        }
    };
});

offer.filter('countryOn', function () {
    return function (input, country) {
        var result = [];
        for (var i = 0; i < input.length; i++) {
            if (input[i].countryId === y) {
                result.push(input[i]);
            }
        }
        return result;
    };
});


aside.directive('navigator', function () {
    return {/*
        scope: {
            filtersmapping: '=',
        },*/
        restrict: 'E',
        //replace:true,
        //transclude: true,
        templateUrl: 'content/navigator.html',
        controller: function($rootScope, $scope, $element, $attrs) { 
            $scope.filters = [];
            $scope.filters.getItemIndexByTitle = function (ttl) {
                for (var i = 0; i < $scope.filters.length; i++)
                    if ($scope.filters[i].title == ttl)
                        return i;
            };

            $scope.print = function (text) {
                console.log(text);
            }

            $scope.select = function (parent, event) {
                console.log(event);
                var index = 0;
                var targ = parent.target;
                $scope.$parent.targ = event;
                angular.forEach(event.filter, function (opt) {
                    if (opt.ngClass = title) {
                        opt.ngClass = "disabled";
                    }
                    i++;
                });

                event.disabled = true;
                //console.log("selected pane: ", pane.title);
            };

            $scope.enableEdit = function (item) {
                //item.editable = true;
                console.log($event);
                $($event).css("background-color", "yellow");
            };

            $scope.disableEdit = function (item) {
                //item.editable = false;
            };

            $rootScope.$watch("filtersmapping", function (newValue, oldValue) {
                //if (oldValue != null)
                    console.log('filters changed');
            });

            

            var countSelected = function (input) {
                var cmpt = 0;
                angular.forEach(input, function(key, value){
                    if(value == true)
                        cmpt++;
                });
                console.log(cmpt);
                return cmpt;
            }
            
            $scope.deselect = function (opt) {
                delete selected.opt;
                console.log("desekected");
            }

            var add = function (ttl, item) {
                $scope.filtersmapping[ttl].push($scope.filtersmapping[label].indexOf(option));
            };

            var discard = function (ttl, item) {
                $scope.filtersmapping[ttl].push($scope.filtersmapping[label].indexOf(option));
            };

            this.addFilter = function (filtering) {
                console.log("tete");
                //filtering.selected = [];
                /*
                filtering.change = function (label, option) {
                    if ($scope.filters[$scope.filters.getItemIndexByTitle(filtering.title)].selected[option] == false) {
                        delete $scope.filters[filtering.title].selected[option];
                        $scope.filtersmapping[label].push($scope.filtersmapping[label].indexOf(option));
                        console.log(false);
                    }
                    else if ($scope.filters[$scope.filters.getItemIndexByTitle(filtering.title)].selected[option] == true)
                        $scope.filtersmapping[label].selected.push(option);
                    
                    console.log($scope.filters[$scope.filters.getItemIndexByTitle(filtering.title)]);

                    filtering.nbSelectedItems = countSelected(filtering.selected);
                };*/

                /*
                filtering.change = function (option) {
                    if (filtering.selected[option] == true)
                        $scope.filtersmapping[filtering.title].push(option);
                    else if (filtering.selected.option == false) {
                        var index = -1;
                        if (index = $scope.filtersmapping[filtering.title].indexOf(option) > -1)
                            $scope.filtersmapping[filtering.title].pop(index);
                    }
                    filtering.nbSelectedItems = countSelected(filtering.selected);
                };
                */
                filtering.selected = [];
                $scope.filters.push(filtering);
                console.log($scope.filters);
               /* angular.forEach(filtering.options, function(opt){
                    //$scope.filters[filtering.title].push(opt);
                    $scope.filters[filtering.title][opt] = false;
                });*/
                $scope.filtersmapping[filtering.title] = [];
                console.log($scope.filters);
            };
        },/*
        link: function (scope, element, attrs) {
        }*/
    };
});

aside.filter('filtering', function(){
    // Just add arguments to your HTML separated by :
    // And add them as parameters here, for example:
    // return function(dataArray, searchTerm, argumentTwo, argumentThree) {
    return function (dataArray, searchArray) {
        console.log(searchArray);
        //searchArray = { company: { 3019: true }, country: { 1: true } };
        

        // If no array is given, exit.
        if (!dataArray) {
            console.log("STOP!!");
            return;
        }
            // If no search term exists, return the array unfiltered.
        else if (!searchArray) {//|| !hasFilters
            return dataArray;
        }

            // Otherwise, continue.
        else {
            var effectiveSearchArray = {};
            angular.forEach(searchArray, function (val, key) {
            //every empty filters will not be taken into account
                if (val.length == 0)
                    ;
            //every filters with canceled filter will not be taken into account
                else
                    var keepGoing = true;
                    angular.forEach(val, function (val2, key2) {
                        if(keepGoing) {
                            if(val2 == true){
                                effectiveSearchArray[key] = val;
                                keepGoing = false;
                            }
                        }
                    })


            });
            // Return the array and filter it by looking for any occurrences of the search term in each items id or name. 
            return dataArray.filter(function (item) {
                var result = [];
                var accept = true;
                //console.log(item);
                angular.forEach(effectiveSearchArray, function (val, key) {
                    var formattedKey = key + 'Id';
                    var itemVal = item[formattedKey];
                    //console.log(key);
                    //console.log(val);
                    //console.log(val[itemVal]);
                    //console.log(itemVal);
                    if (!angular.isDefined(val[itemVal]) || val[itemVal] == false) {
                        accept = false; console.log("ok!");
                    }
                });
                if (accept)
                    return item;
            });
        } 
    }    
});

aside.filter('exclusive', function () {
    return function(input, exclusive) {
        var result= [];
        //if(angular.isArray(input))
        {
            console.log(exclusive);
            angular.forEach(exclusive), function (title) {
                console.log(input);
                console.log(input[title]);
                angular.forEach(input[title]), function (inp, checked) {
                    console.log(imp);
                    if(checked == true)
                        result.push(input);
                }
            };
        }
    }
});

aside.filter('exclude', function() {
    return function(input, exclude, prop) {
        if (!angular.isArray(input))
            return input;

        if (!angular.isArray(exclude))
            exclude = [];

        if (prop) {
            exclude = exclude.map(function byProp(item) {
                return item[prop];
            });
        }

        return input.filter(function byExclude(item) {
            return exclude.indexOf(prop ? item[prop] : item) === -1;
        });
    };
})  

aside.directive('companies', function() {
  return {
    restrict: 'A',
    require: '^navigator',
    controller: function ($scope, SharedService) {
        $scope.loadCies = function () {
            return SharedService.getCompaniesWithOffers();
        }
    },
    link: function (scope, element, attrs, navigatorCtrl) {
        scope.loadCies()
            .then(function (response) {
                scope.companies = { title: 'company', options: []};//new Map()
                var result = response.data;
                console.log('ici sont les companies :');
                angular.forEach(result, function (cie) {
                    var item = {};
                    item.label = cie.companyName;
                    item.id = cie.id;
                    scope.companies.options.push(item);
                    //scope.companies.selected[cie.companyName] = false;
                });/*
                angular.forEach(scope.companies.options, function (elmt) {
                    scope.companies.selected[elmt] = false;
                });*/
                
            navigatorCtrl.addFilter(scope.companies);
            console.log('cece');
        }, function () {; });
        console.log('coco');
    }
  }
});


aside.directive('countries', function () {
    return {
        restrict: 'A',
        require: '^navigator',
        controller: function ($scope, SharedService) {
            $scope.loadCountries = function () {
                return SharedService.getAllCountries();//.getAllCountries()//get('joboffer/countries/all')//SharedService.getAllCountries()
            }
        },
        link: function (scope, element, attrs, navigatorCtrl, SharedService) {
            scope.loadCountries()
                .then(function (response) {
                    scope.countries = { title: 'country', options: [] };
                    var result = response.data;
                    angular.forEach(result, function (land) {
                        var item = {};
                        item.label = land.name;
                        item.id = land.id;
                        scope.countries.options.push(item);
                    });
                    //scope.countries.index = SharedService.getCountryIdByName('germany');
                    navigatorCtrl.addFilter(scope.countries);
                }, function () {; });
        }
    }
});

aside.filter('exclude2', function () {
    return function (input, exclude) {
        var result = [];
        for (var i = 0; i < input.length; i++) {
            if (input[i] !== exclude) {
                result.push(input[i]);
            }
        }
        return result;
    };
});

