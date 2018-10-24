package TrieApiTestFramework;

public class TrieApiBuilder {

    private static final BaseUrlBuilder baseUrlBuilder = BaseUrlBuilder.getInstance() ;

    private TrieApiBuilder(){}

    private static TrieApiBuilder trieApiBuilder ;

    public static TrieApiBuilder getInstance(){
        if(trieApiBuilder == null){
            trieApiBuilder = new TrieApiBuilder();
        }
        return trieApiBuilder ;
    }


}
