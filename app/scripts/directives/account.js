'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:account
 * @description
 * # account
 */
angular.module('vexTradedeskApp')
  .directive('account', function (ethereum, $rootScope) {
    return {
      templateUrl: 'views/account.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.account = $rootScope.account;

        scope.selectAccount = function(){
          $rootScope.setView('select-account');
        }

        ethereum.web3.eth.getBalance(scope.account.address, function(error, balance){
          if(error){console.log(error);}
          scope.balance = Number(balance);
        });
        
      }
    };
  });
