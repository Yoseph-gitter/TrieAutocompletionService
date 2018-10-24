package TrieApiTestFramework;

public class BaseUrlBuilder {

    private static  final  String BASE_URL = "http://localhost:8000" ;
    private static BaseUrlBuilder baseRestApi ;

    private BaseUrlBuilder(){

    }
    public static BaseUrlBuilder getInstance(){
        if(baseRestApi == null){
            baseRestApi = new BaseUrlBuilder();
        }
        return baseRestApi ;
    }

    public String withNew(){
        return BASE_URL.concat(Using.NEW.getValues()) ;
    }

    public String withTest(){
        return BASE_URL.concat(Using.TEST.getValues()) ;
    }

    public String withAutocomplete(String prefix , int limit ){
        String url  = BASE_URL + Using.AUTOCOMPLETE.getValues()
                + "?prefix=" + prefix + "&limit=" + limit ;
        return  url;
    }

    public  String withSize(){ return BASE_URL + Using.SIZE.getValues() ;
    }

    public String withDelete (){
        return  BASE_URL + Using.DELETE.getValues() ;
    }

    public String withClear(){
        return  BASE_URL + Using.CLEAR.getValues() ;
    }
    public String withBulk(){
        return  BASE_URL + Using.BULK.getValues() ;
    }

    enum Using {
        TEST("/api/trie/test"),
        NEW("/api/new"),
        SIZE("/api/trie/size"),
        AUTOCOMPLETE("/api/trie/autocomplete") ,
        DELETE("/api/trie/remove/"),
        CLEAR("/api/trie/clear"),
        BULK("/api/trie/bulk");
        private  String values ;

        Using(String values){
            this.values = values ;
        }

        public String getValues(){
            return  this.values ;
        }
    }//end of enum
}
