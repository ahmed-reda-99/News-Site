          /* declarition Variables*/

          var links = document.getElementsByClassName("nav-link");
          var searchInp = document.getElementById("searchInp");
          var news;
          var category = 'general';
          var country = 'eg';



          getNews();

          for (var i = 0; i < links.length; i++) {
              links[i].addEventListener("click", function (e) {
                  category = e.target.innerHTML;
                  getNews();
              })
          }





          /*getNews*/


          function getNews() {

              var req; // IE5 , IE6 

              if (window.XMLHttpRequest) // modern browsers 
              {
                  req = new XMLHttpRequest();
              } else // IE5 ,IE6
              {
                  req = new ActiveXObject("Microsoft.XMLHTTP")
              }

              var url = `https://newsapi.org/v2/top-headlines?country=` + country + `&category=` + category + `&apiKey=d34d49ce3a794aca80d1ae821239b0eb`
              req.open("GET", url)

              req.onreadystatechange = function () {
                  if (req.status == 200 && req.readyState == 4) {

                      news = JSON.parse(req.response);
                      news = news.articles;
                      displayNews();
                  }
              }

              req.send();

          }


          /*displayNews*/


          function displayNews() {
              var temp = "";
              for (var i = 0; i < news.length; i++) {
                  var title = news[i].title;
                  var titleSub = title.substring(0, 40);
                  var desc = news[i].description;
                  if(desc!==null){
                  var descSub= desc.substring(0,60)
                  }
                 
        temp += ` <div class="col-lg-3 md-6 sm-12">
    <div class="new bg-warning text-center  justify-content-center">
        <a href=` + news[i].url + `>
        <div class="imgNews">
<img src="` + news[i].urlToImage + `" alt="NewsImg" class="img-fluid"/></div>
         <div class="p-2"><h5 class="">` + titleSub + `...</h5></a>
                <p class="text-muted">` +descSub+ `...</p></div>
        </div>
        <br/>
    </div>`
              }
              document.getElementById("newsRow").innerHTML = temp;
          }
