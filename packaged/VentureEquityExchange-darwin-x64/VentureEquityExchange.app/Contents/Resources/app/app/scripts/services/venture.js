'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.Venture
 * @description
 * # Venture
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('Venture', function (registrar, Contract, ethereum, $q) {
    // Service logic
    // ...

    

    // Public API here
    return {
      create: function () {
        return $q(function(resolve, reject){
          // Contracts.get('Venture').then(function(contract){
          //   return Contracts.deploy(contract);
          // }).then(function(deployed){
          //   resolve(deployed);
          // }).catch(function(error){
          //   reject(error);
          // });
        });
      }
    };
  });
