var links = document.getElementsByClassName("nav-link");
var searchInp = document.getElementById("searchInp");
var news ;
var term;
var category = 'general';
var country = 'eg';

getNews();


searchInp.addEventListener("keydown" , function(){

    term  = searchInp.value;

    globalSearch();
})

for(var i=0 ; i <links.length ; i++)
    {
        links[i].addEventListener("click" , function(e){
            category = e.target.innerHTML;
            getNews();
        })
    }






function getNews()
{

    var req ; // IE5 , IE6 

    if(window.XMLHttpRequest) // modern browsers 
        {
                req = new XMLHttpRequest();
        }
    else // IE5 ,IE6
        {
               req = new ActiveXObject("Microsoft.XMLHTTP") 
        }    

    var url =`https://newsapi.org/v2/top-headlines?country=`+country+`&category=`+category+`&apiKey=d34d49ce3a794aca80d1ae821239b0eb`
    req.open("GET",url )

    req.onreadystatechange =function()
    {
        if(req.status == 200 &&  req.readyState == 4)
            {

            news =  JSON.parse (req.response );
            news = news.articles;
            displayNews();
            }
    }

    req.send();

}
function displayNews()
{
    var temp = "";
    for(var i=0 ; i < news.length ; i++)
    {
        var title =news[i].title
        var titleSub = title.substring(0,30)
        var desc = news[i].description
        temp +=` <div class="col-lg-3 sm-12">
        <div class="new bg-warning text-center  justify-content-center">
        <a href=`+news[i].url+`>
        <div class="imgNews">
        <img src="`+news[i].urlToImage+`" alt="NewsImg" class="img-fluid"/></div>
                <h5 class="">`+titleSub+`...</h5></a>
                <p class="text-muted">`+desc+`...</p>
        </div>
        <br/>
    </div>`
    }
    document.getElementById("newsRow").innerHTML = temp;   
}

function globalSearch()
{
  
  
    var req ; // IE5 , IE6 

    if(window.XMLHttpRequest) // modern browsers 
        {
                req = new XMLHttpRequest();
        }
    else // IE5 ,IE6
        {
               req = new ActiveXObject("Microsoft.XMLHTTP") 
        }    

    var url =`https://newsapi.org/v2/everything?q=`+term+`&from=2019-08-26&sortBy=publishedAt&apiKey=d60d4a9603414b1088ac0fc47f91e7da

    `
    req.open("GET",url )

    req.onreadystatechange =function()
    {
        if(req.status == 200 &&  req.readyState == 4)
            {

            news =  JSON.parse (req.response );
            news = news.articles;
            displayNews();
            }
    }

    req.send();


}



