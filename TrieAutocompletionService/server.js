const path = require('path');
const bodyParser = require("body-parser") ;
const express = require('express') ;
const app = new express();
const TrieTree = require('./Libraries/src/trieImplementation') ;
const TrieTreeTest = require('./Libraries/test/trieTreeTest') ;

//const trieImpl = TrieTree.;

app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/new", function(req, res){
    
    TrieTree.insert(req.body["K"]) ;
    let word = req.body["K"] ;
    res.json(TrieTree.find(word).value ) ;
});

app.get("/api/trie/autocomplete", function(req, res){
    let limit = req.query.limit;
    let prefix = req.query.prefix ;
    let autocompletes = TrieTree.autocomplete(prefix !== "all" ? prefix  : "", limit) ;
    res.json(autocompletes) ;
})

app.get("/api/trie/size", (req, res)=>{
    res.json(TrieTree.size()) ;
})

app.delete("/api/trie/remove/:word", function(req, res){
    let deleted = TrieTree.remove(req.params.word) ;
    res.json(deleted) ;
})

app.get("/api/trie/test", (req, res)=>{
    console.log(TrieTreeTest.run()) ;
    res.json(TrieTreeTest.run()) ;
})

app.get("/api/trie/clear", function(req, res){
    res.json(TrieTree.clear()) ;
})

app.post("/api/trie/bulk", (req,res)=>{
    console.log(req.body) ;
    res.json(TrieTree.insertInBulk(req.body)) ;
})


app.listen(8000 , function(){
    console.log("Listening On port 8000") ;
});