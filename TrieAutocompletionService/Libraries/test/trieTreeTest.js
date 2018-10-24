const TrieTree = require('./../src/trieImplementation') ;

const testData = {
    "a" : ["abode", "about" , "abash", "abomination"] ,
    "b" : ["bad", "bamboo", "bastard", "banana"]
}

class TrieTreeTest {
    

    constructor() {
        const PASSED = "PASSED!" ;
        const FAILED = "FAILED!" ;
        var resultsPass = [] ;

        this.run = function(){
            testInsertion();
            let arrays = this.printResult(); 
            return arrays;
        }

        const testInsertion = function(){
            resultsPass = [] ;
            let test = testData["a"].sort() ;
            for(var i in test ){
                TrieTree.insert(testData["a"][i]) ;
            }
           // assert for insertion
           let actualData = TrieTree.autocomplete("a", testData['a'].length ).sort();
           //.sort() ;
           let message ;
           

        for(var k in actualData ){
            var resultNew = {};
            if(actualData[k] !== test[k]){
                message = FAILED ;
                }
            else{
                message = PASSED ;
            }
            
            resultNew["Expected"] =test[k] ;
            resultNew["Actual"] =  actualData[k] ;
            resultNew["Result"] = message ;
            console.log("Showing:" + resultNew) ;
            resultsPass.push(resultNew) ;
        }

        //assert for size
        if(test.length === actualData.length){
            message = PASSED ;
        }
        else{
            message = FAILED ;
        }
        var result = {};
        result["Expected"] = test.length;
        result["Actual"] =  actualData.length ;
        result["Result"] = message ;

        resultsPass.push(result) ;
        }


        this.printResult = function(){
            return resultsPass ;
        }
    }
}

module.exports = new TrieTreeTest() ;
//var test = new TrieTreeTest() ;
//test.run();