package TrieApiTestFramework;


import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.json.simple.JSONArray;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

/**
 * Unit test for simple App.
 */
public class AppTest 
{
    private static final List<String> deletableWords = new ArrayList<>() ;
    /**
     * Rigorous Test :-)
     */
    @BeforeTest
    public void BeforTestCleanUp()
    {
        BaseUrlBuilder builder = BaseUrlBuilder.getInstance();
        String url = builder.withClear();
        given().auth().basic("", "")
                .then()
                .when().get(url).then()
                .statusCode(200)
                .assertThat().body(equalTo("")) ;
        System.out.println("Before Test Executed!");

    }

    @Test
    public void trieApiInsertsAwordSuccessfully(){

        BaseUrlBuilder urlBuilder = BaseUrlBuilder.getInstance();
        String url= urlBuilder.withNew();
        String payload = "{ \"K\" : \"abash\"}";

        RequestSpecBuilder requestSpecBuilder = new RequestSpecBuilder();
        requestSpecBuilder.setBody(payload);
        requestSpecBuilder.setContentType("application/json" );
        RequestSpecification requestSpecification = requestSpecBuilder.build();
        given().spec(requestSpecification)
                .when().post(url)
                .then()
                .assertThat()
                .statusCode(200)
                .equals(equalTo("abash") );

        url = urlBuilder.withSize();
        System.out.println("Size is "+ url);
        given().when().get(url)
                .then()
                .assertThat()
                .statusCode(200)
                .body(equalTo("1")) ;

        //CLEAN up
        url = urlBuilder.withDelete() ;
        String wordToDelete = "abash" ;
        url = url + wordToDelete ;
        System.out.println(url);
        given().when().delete(url)
                .then().statusCode(200)
                .assertThat()
                .equals(true) ;

    }

    @Test
    public void verifyUnableToInsertDuplicateValues(){
        BaseUrlBuilder urlBuilder = BaseUrlBuilder.getInstance();
        String url  = urlBuilder.withNew();
        RequestSpecBuilder builder = new RequestSpecBuilder();
        builder.setContentType(ContentType.JSON);
        builder.setBody( "{\"K\": \"abomination\"}" ) ;
        RequestSpecification specification = builder.build() ;

        given().spec(specification).when().post(url)
                .then()
                .assertThat()
                .statusCode(200)
                .equals("abomination") ;
        given().spec(specification).when().post(url)
                .then()
                .assertThat()
                .statusCode(200)
                .equals("abomination") ;

        //find the created WOrD
        given().when().get(urlBuilder.withSize())
                .then()
                .assertThat()
                .statusCode(200)
                .body(equalTo("1"));


    }

    @Test
    public void verifyApiDeletsAword(){
        RequestSpecBuilder  builder = new RequestSpecBuilder();
        builder.setContentType(ContentType.JSON);
        String word = "molla" ;
        builder.setBody("{\"K\" : \"" + word + "molla\"}") ;

        BaseUrlBuilder urlBuilder = BaseUrlBuilder.getInstance();
        //lets create a word to delete
        String url = urlBuilder.withNew() ;
        given().auth().basic("", "").spec(builder.build())
                .when().post(url)
                .then().statusCode(200)
                .assertThat().equals(word.toLowerCase()) ;
        //lets delete same word
        url = urlBuilder.withDelete() ;
        String wordToDelete = word ;
        url = url + wordToDelete ;
        System.out.println(url);
        given().when().delete(url)
                .then().statusCode(200)
                .assertThat()
                .equals(true) ;
    }

    @Test
    public void verifyAutoComplitionWorks(){

        String[] words = {"TEST_1", "TEST_2" , "TEST_3" , "TEST_4" , "TEST_5" } ;
        BaseUrlBuilder builder = BaseUrlBuilder.getInstance();
        RequestSpecBuilder specBuilder = new RequestSpecBuilder();
        specBuilder.setContentType(ContentType.JSON);
        specBuilder.setBody(arryToJson(words));

        String url = builder.withBulk() ;
        System.out.println(url);
        given().spec(specBuilder.build())
                .when().post(url)
                .then().statusCode(200).assertThat()
                .equals(true) ;

        //lets confirm
        specBuilder = new RequestSpecBuilder();
       // specBuilder.setBaseUri() ;
       // specBuilder.addParam("prefix=TEST").addParam("limit=7");
        String autoCompliteURl = builder.withAutocomplete("TEST", 7) ;

        given().when().get(autoCompliteURl).then()
                .statusCode(200)
                .assertThat()
                .body("", equalTo(words));

    }
    private JSONArray arryToJson(String[] myArray){
        JSONArray jsArray = new JSONArray();
        for (int i = 0; i < myArray.length; i++) {
            jsArray.add(myArray[i]);
        }
        System.out.println(jsArray);
        return jsArray ;

    }

    @AfterMethod
    public void asterClass()
    {
        BaseUrlBuilder builder = BaseUrlBuilder.getInstance();
        String url = builder.withClear();
        given().auth().basic("", "")
                .then()
                .when().get(url).then()
                .statusCode(200)
                .assertThat().body(equalTo("")) ;
        System.out.println("After Method Test Executed!");

    }

}
