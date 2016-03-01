'use strict';

/**
 * Das Modul verantwortlich für allgemeinen Schlüsselwörter Behandlung.
 */
var keyword = angular.module('keywordModule', ['Menu', 'Login', 'Offer', 'Aside', 'ui.bootstrap', 'ui.router']);

keyword.factory('KeywordService', ['$http', function ($http) {
    var server = {};
    server.keywordsList = []; //[1, 2, 3]

    server.addKeyword = function (word) {
        if (server.keywordsList.indexOf(word) == -1) {
            server.keywordsList.push(word);
            return true;
        }
        return false;
    };

    server.removeKeyword = function (word) {
        var index = -1;
        if ((index = server.keywordsList.indexOf(word)) != -1) {
            server.keywordsList.splice(index, index+1);
            return true;
        }
        return false;
    };

    return {
        addKeyword: function (word) {
            return server.addKeyword(word);
        },
        removeKeyword: function (word) {
            return server.removeKeyword(word);
        },
        keywords: server.keywordsList
    }
}]);