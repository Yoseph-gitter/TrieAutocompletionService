//implementing Trie
class TrieNode {
    constructor(val) {
        this.value = val || "";
        this.prevValue = "";
        this.isDeletable = false;
        this.pointers = [];
    }
}

class TrieTree {
    constructor() {
        this.root = null;
        /**
         * 
         * @param {This method is responsible to inserting in builk } arr 
         */
        this.insertInBulk = function(inputArr){
            let arr = JSON.parse(inputArr);
            console.log("Input Arr is:" + arr) ;
            if(!arr){
                return false;
            }
            for(let index in arr){
               if( this.insert(arr[index])  == false ){
                   console.log("Unable to Insert!");
               }
            
            }
            return true;
        }


        this.insert = function (val) {
            if (this.root == null) {
                this.root = new TrieNode("");
            }
            var newVal = val.toLowerCase();
            var runner = this.root;
            var prev = this.root;
            for (var i = 0; i < newVal.length; i++) {
                let index = newVal.charCodeAt(i) - 97;
                if (!runner.pointers[index]) {
                    var word = runner.value + newVal[i];
                    var trieNode = new TrieNode(word);
                    trieNode.prevValue = runner.value;
                    runner.pointers[index] = trieNode;
                    if (i == newVal.length - 1) {
                        return false;
                    }
                }
                prev = runner;
                runner = runner.pointers[index];
            }
            return true;
        };
        this.contains = function (val) {
            if (this.root == null) {
                return false;
            }
            var runner = this.root;
            var newValue = val.toLowerCase();
            for (var k = 0; k < newValue.length; k++) {
                var index = newValue.charCodeAt(k) - 97;
                if (!runner.pointers[index]) {
                    return false;
                }
                else {
                    runner = runner.pointers[index];
                }
            }
            return true;
        };
        this.first = function (val) {
            if (this.root == null) {
                return this.root.value;
            }
            var runner = this.root;
            var prev = this.root;
            var newVal = val.toLowerCase();
            for (let j = 0; j < newVal.length; j++) {
                let index = newVal.charCodeAt(j) - 97;
                if (!runner.pointers[index]) {
                    return "";
                }
                else {
                    prev = runner;
                    runner = runner.pointers[index];
                }
            }
            return prev.value;
        };
        this.last = function (val) {
            if (!this.root)
                return this.root.value;
            let runner = this.root;
            let newValue = val.toLowerCase();
            let prev = runner;
            for (let i = 0; i < newValue.length; i++) {
                let index = newValue.charCodeAt(i) - 97;
                if (!runner.pointers[index]) {
                    return "";
                }
                else {
                    prev = runner;
                    runner = runner.pointers[index];
                }
            }
            //once we find the word lets find the last word on the same lavel
            let count = 25;
            while (count >= 0) {
                if (prev.pointers[count]) {
                    return prev.pointers[count].value;
                }
                count--;
            }
        };
        this.remove = function (val) {
            //for each char in val starting from the last
            if (!this.contains(val)) {
                return false;
            }
            for (var i = val.length; i >= 1; i--) {
                var sub = val.slice(0, i);
                this.removeOnce(sub);
            }
            return true;
        };
        this.find = function (val) {
            if (this.root == null) {
                return null;
            }
            var runner = this.root;
            var newValue = val.toLowerCase();
            var prev = this.root;
            for (var k = 0; k < newValue.length; k++) {
                var index = newValue.charCodeAt(k) - 97;
                if (!runner.pointers[index]) {
                    return null;
                }
                else {
                    prev = runner;
                    runner = runner.pointers[index];
                }
            }
            return runner;
        };
        this.removeOnce = function (val) {
            if (this.root == null) {
                return null;
            }
            var runner = this.root;
            var newValue = val.toLowerCase();
            var prev = this.root;
            var index;
            for (var k = 0; k < newValue.length; k++) {
                index = newValue.charCodeAt(k) - 97;
                if (!runner.pointers[index]) {
                    return false;
                }
                else {
                    prev = runner;
                    runner = runner.pointers[index];
                }
            }
            if (runner && isEmpty(runner.pointers)) {
                prev.pointers[index] = undefined;
            }
            else {
                runner.value = "";
            }
            return true;
        };
        debugger;
        this.size = function () {
            debugger;
            var that = this.root;
            return size(that);
        };
        debugger;
        var size = function (runner) {
            if (runner && isEmpty(runner.pointers)) {
                return 1;
            }
            var count = 0;
            for (var i = 0; runner && i < runner.pointers.length; i++) {
                if (runner.pointers[i]) {
                    count += size(runner.pointers[i]);
                }
            }
            return count;
        };
        debugger;
        this.autocomplete = function (str, size) {
            var theSize = size || 0 ;
            var autocompletions = [];
            var found = this.find(str);
            autocompleteLists(found, autocompletions);
            return autocompletions.slice(0, theSize );
        };
        debugger;

        var autocompleteLists = function (found, complitions) {
            if (found && isEmpty(found.pointers)) {
                complitions.push(found.value);
            }
            for (var i = 0; found && i < found.pointers.length; i++) {
                if (found.pointers[i]) {
                    autocompleteLists(found.pointers[i], complitions);
                }
            }
            return;
        };
        var isEmpty = function (arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    return false;
                }
            }
            return true;
        };

        this.clear = function(){
            this.root = null ;
        }
    }
}

const trieTree = new TrieTree();


// trieTree.insert("abc") ;
// trieTree.insert("arc") ;
// trieTree.insert("art") ;
// trieTree.insert("arsenal") ;
// debugger ;
// console.log("" + trieTree.size()) ;
// trieTree.autocomplete("a") ;

// //export const module = TrieTree ;

module.exports  = trieTree ;
