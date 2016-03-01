'use strict';

var login = angular.module('Login', ['ui.bootstrap', 'ui.router', 'base64']);

/*
login.factory('logEventNotifier', ['UserParams', function (UserParams) {
    var observerCallbacks = [{LogIn : [], logOut : []}];
    var server = {};

    //register an observer than 
    server.registerObserverCallback = function (callbackIn, allbackOut) {
        var action = { logIn: function () { }, logOut: function () { } };
        if (angular.isFunction(callbackIn)) {
            action.logIn = callbackIn;
        }
            
        if (angular.isFunction(callbackOut)) {
            action.logOut = callbackOut;
        }

        observerCallbacks.push(action);
    };

    //call this when you know 'foo' has been changed
    var notifyObservers = function (isIn) {
        if (angular.isUndefined(isIn))
            isIn = true;
        angular.forEach(observerCallbacks, function (callback) {
            if (isIn)
                callback.logIn();
            else
                callback.logOut();
        });
    };

    server.triggerLogedIn = function(){
        this.notifyObservers(true);
    }

    server.triggerLogedOut = function () {
        this.notifyObservers(false);
    }

    server.testConnection = function (username, password) {
        return $http.get(RestParams.url.path + 'credential/check/' + username + '/' + password).then(
            function (response) {
                if (response) {
                    server.triggerLogedIn();
                    console.log(response);
                    return true;
                }
            },
            function (error) {
                // server.triggerLogedOut();
                return false;
            });
    };

    return server;
}]);
*/

login.factory('logInOut', ['$http', '$base64', 'RestParams', 'UserParams', function ($http, $base64, RestParams, UserParams) { // 'logEventNotifier'
    var server = {};

    var setHeaderAuthorization = function (authorizer) {
        if (authorizer == true)
            $http.defaults.headers.common.Authorization = 'Basic ' + UserParams.userAccess;
        else if (authorizer == false)
            $http.defaults.headers.common.Authorization = 'Basic ';
        console.log($http.defaults.headers.common.Authorization);
    };

    // a mettre commme callback de logEventNotifier
    server.successFn = function (response, username, password) {
        //if (response) {
            console.log(response);
            UserParams.userInfos = response.data;
            UserParams.userAccess = $base64.encode(username + ':' + password);
            console.log(UserParams.userAccess);
            UserParams.active = true;
            //logEventNotifier.triggerLogedIn();
            setHeaderAuthorization(true);
            $http.defaults.headers.common.Authorization = 'Basic ' + UserParams.userAccess;
            console.log(UserParams);
        //}
    }

    server.login = function (username, password) {
        return $http.get(RestParams.url.path + 'credential/check/' + username + '/' + password);       
    };

    server.credential = function () {
        return $http.get(RestParams.url.path + 'credential/info');       
    };

    server.logout = function () {
        $http.get(RestParams.url.path + username + '/' + password)
            .then(function (response) {
                UserParams.name = response.data;
                UserParams.active = false;
                UserParams.userAccess = null;
                setHeaderAuthorization(false);
            }, function (error) {
                console.log('Access refused because of :' + error);
            });
    };

    server.logIn = function () {
        if (UserParams.user != null) {
            UserParams.active = true;
            setHeaderAuthorization(true);
            return true;
        }
        return false;
    };

    server.logOff = function () {
        UserParams.active = false;
        setHeaderAuthorization(false);
        if (UserParams.user != null) {
            return false;
        }
        return true;
    };

    return server;

}]);

login.controller('LoginController', ['$scope', '$rootScope', '$state', 'logInOut', function ($scope, $rootScope, $state, logInOut) { //  'logEventNotifier'
    /*
    
        var loginAction = function (access) {
            $scope.$parent.loged = logEventNotifier.testConnection(access.name, access.passwort);
            LogInOut.successFn();
        };

        aService.registerObserverCallback(loginAction);
        //service now in control of updating foo
        $scope.tryConnection2 = loginAction;
*/
    $scope.tryConnection = function (access) {
        logInOut.login(access.name, access.passwort)
            .then(function (response) {
                logInOut.successFn(response, access.name, access.passwort);
                console.log(response);
                logInOut.credential().then(function (response) {
                    console.log(response);
                    $scope.user = response.data;
                    $rootScope.$broadcast('logevent', { user: $scope.user });
                    $state.go('board'); //home.inside
                });
                //$scope.$parent.loged = true; 

                //console.log($scope.$parent);
            },
            function (error) {
                console.log('Access refused because of :' + error);
                $scope.$parent.loged = false;
            });
    }

}]);

/*
login.directive("logButton", function () {
    return {
        restrict: 'A',
        compile: function (element, attrs) {
            element.
        }
    }
});
*/