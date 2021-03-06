const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const jsonfile = Promise.promisifyAll(require('jsonfile'));
import path from 'path';
const DataStore = (path.dirname(require.main.filename)+'/dapp/data/');
const ContractStore = DataStore+'.contractstore';
const child = require('child_process').fork(__dirname+'/dapp/utilities/Contract/compile.js');
import async from 'async';
import { web3 } from '../../ethereum/index';
// console.log(__dirname);

// export function deploy(abi, code, address){
//   return new Promise((resolve, reject) => {
//     // general deploy method for contracts without instantiating variables...
//
//     web3.eth.contract(JSON.parse(abi)).new({from: address, data : code, gas : 3141592},
//       (error, deployed) => {
//         if(error){reject(error);}
//         if(!deployed.address){
//           console.log('Waiting for contract transaction '+deployed.transactionHash+' to be mined...');
//         } else {
//           console.log('Contract mined! Contract Address: '+deployed.address);
//           resolve(deployed);
//         }
//       });
//   });
// }

// export function details(contract){
//   return new Promise((resolve, reject) => {
//     Promise.join(
//       fs.readFileAsync(contractsPath+contract+'/abi.json', 'utf8'),
//       fs.readFileAsync(contractsPath+contract+'/bytecode.txt', 'utf8'),
//       fs.readFileAsync(contractsPath+contract+'/address.txt', 'utf8'),
//       (abi, code, address) => {
//         resolve({abi : abi, code : code, address : address});
//       }).catch((error) => {
//         reject(error);
//       });
//   });
// }

// export function saveAddress(contract, address){
//   return new Promise((resolve, reject) => {
//     fs.writeFileAsync(contractsPath+contract+'/address.txt', address).then((data) => {
//       resolve(data);
//     }).catch((error) => {
//       reject(error);
//     });
//   })
// }
let PreCompiled = {
  DAV : {},
  DI : {}
};

let { DAV, DI } = PreCompiled;

export function Compile(contracts){
  return new Promise((resolve, reject) => {
    console.log(typeof contracts);
    console.log(contracts);
    let DI_RegExp = new RegExp("DirectorIndex");

    if(typeof contracts == 'object'){
      console.log("OBJECT FOUND DURING COMPILATION");
      if(Object.keys(contracts.sources).indexOf('Directorate.sol') != -1){
        if(Object.keys(DAV).length != 0){
          resolve(DAV);
        }
      }
    } else if(typeof contracts == 'string'){
      console.log("STRING FOUND DURING COMPILATION")
      if(contracts.match(DI_RegExp)){
        if(Object.keys(DI).length != 0){
          resolve(DI);
        }
      }
    }


    child.send(contracts);

    child.on('message', (compiled) => {
      if(!compiled.sources){reject(compiled);}

      if(typeof contracts == 'object'){
        if(Object.keys(contracts.sources).indexOf('Directorate.sol') != -1){
          if(Object.keys(DAV).length == 0){
            DAV = compiled;
            resolve(compiled);
          }
        }
      } else if(typeof contracts == 'string'){
        if(contracts.match(DI_RegExp)){
          if(Object.keys(DI).length == 0){
            DI = compiled;
            resolve(compiled);
          }
        }
      }

    });

    child.setMaxListeners(Infinity);



  });
}


function checkContractStore() {
  return new Promise((resolve, reject) => {
    fs.readdirAsync(DataStore).then((files) => {
      files.forEach((file) => {
        if(file == '.contractstore') {
            resolve(true);
        }
      });
      resolve(false);
    }).catch((error) => {
      reject(error);
    });
  })
}

export function getContractStore() {
  return new Promise((resolve, reject) => {
    checkContractStore().then((exists) => {
      if(!exists){
        resolve({})
      } else {
        return jsonfile.readFileAsync(ContractStore);
      }
    }).then((contractstore) => {
      resolve(contractstore);
    }).catch((error) => {
      reject(error);
    })
  })
}




// function saveCompiled(Contract, compiled){
// 	return new Promise(function(resolve, reject){
// 		fs.writeFileAsync(contractsFolder+'/'+Contract+'/'+'abi.json', compiled.contracts[Contract].interface).then(function(data){
// 			return fs.writeFileAsync(contractsFolder+'/'+Contract+'/'+'bytecode.txt', compiled.contracts[Contract].bytecode);
// 		}).then(function(){
// 			resolve({abi : JSON.parse(compiled.contracts[Contract].interface), code : compiled.contracts[Contract].bytecode});
// 		}).catch(function(error){
// 			reject(error);
// 		});
// 	});
// }
//
// function compileAndSave(Contract){
// 	return new Promise(function(resolve, reject){
// 		compile(Contract).then(function(compiled){
// 			return saveCompiled(Contract, compiled);
// 		}).then(function(compiled){
// 			resolve(compiled);
// 		}).catch(function(error){
// 			reject(error);
// 		});
// 	});
// }
