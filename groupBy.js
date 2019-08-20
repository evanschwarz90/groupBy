// Evan Schwarz
// evanschwarz90@gmail.com

// groupBy takes an array and splits it into sets, grouped by the 
// result of running each value through the predicate. If the 
// predicate is a string instead of a function, it groups by the 
// property named by the predicate on each of the values. 

function groupBy(collection, predicate){ 
    
  var resultObj = {};
  
  
  // initial solution
  
  // if (typeof predicate === 'string') {
  //   for (var i = 0; i < collection.length; i++) {
  //     var currentValue = collection[i]
  //     var result = currentValue[predicate]
  //     if (result in resultObj) {
  //       resultObj[result].push(currentValue);
  //     } else {
  //       resultObj[result] = [currentValue];
  //     }
  //   }
  // } else {
  //   for (var i = 0; i < collection.length; i++) {
  //     var currentValue = collection[i]
  //     var result = predicate(currentValue)
  //     if (result in resultObj) {
  //       resultObj[result].push(currentValue);
  //     } else {
  //       resultObj[result] = [currentValue];
  //     }
  //   }
  // }
  
  
  // Michael refactor
  
  // for (var i = 0; i < collection.length; i++) {
    
  //   var result
  //   var currentValue = collection[i]
  //   if (typeof predicate === "string") {
  //     result = currentValue[predicate]
  //   } else {
  //     result = predicate(currentValue)
  //   }
    
  //   if (result in resultObj) {
  //       resultObj[result].push(currentValue);
  //     } else {
  //       resultObj[result] = [currentValue];
  //     }
    
  // }
  
  
  // Evan refactor with forEach
  
  // collection.forEach(function(curr) {
  //   var result;
  //   if (typeof predicate === "string") {
  //     result = curr[predicate];
  //   } else {
  //     result = predicate(curr);
  //   }

  //   if (result in resultObj) {
  //     resultObj[result].push(curr);
  //   } else {
  //     resultObj[result] = [curr];
  //   }
  // })
  
  
  // Evan refactor with reduce
    
  collection.reduce(function(acc, curr, ind, src) {
    var property;
    if (typeof predicate === 'string') {
      property = curr[predicate];
    } else {
      property = predicate(curr);
    }
    
    if (property in acc) {
      acc[property].push(curr);
    } else {
      acc[property] = [curr];
    } 
    return acc;
  }, resultObj)
  
  
  
  console.log(resultObj);
  return resultObj;
}


var firstLetter = function(word) { return word.charAt(0); };

groupBy(['apple', 'cat', 'boat', 'card', 'bond'], firstLetter);
// returns { 'a': ['apple'], 'c': ['cat', 'card'], 'b': ['boat', 'bond'] }

groupBy(['apple', 'cat', 'boat', 'card', 'bond'], 'length');
// returns { '5': ['apple'], '3': ['cat'], '4': ['boat', 'card', 'bond'] }

groupBy([1.4, 5.6, 3.6, 1.8, 3.4], function(val) { 
  return Math.floor(val); 
});
// returns { 1: [1.4, 1.8], 5: [5.6], 3: [3.6, 3.4] }