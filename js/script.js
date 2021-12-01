const baseUrl = "https://manhwaindo-api.herokuapp.com/";
const baseEndpoin = `${baseUrl}All/:page`;
const latestEndpoin = `${baseUrl}latest`;
const popularEndpoin = `${baseUrl}popular`;
const genreEndpoin = `${baseUrl}genre`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
 const fetchHeader ={
    headers:{
             'X-Auth-Token': ""
     }
 }

function getlistlatest(){
    title.innerHTML= "Latest Comic Chapter";
    fetch (latestEndpoin,fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.manhwas);
            let manhwas = "";
            resJson.manhwas.forEach(manhwa => {
                manhwas += `
                <div class="col s6" >
                  <div class="card row " >
                    <div class="card-image col s4"  >
                    <img src="${manhwa.thumbnail}" style="width:100px; height:125px;">
                    </div>
                    <h5 class="truncate title col s7" >${manhwa.title}</h5>
                    <span class= "col s6" style="margin-top: 10px;">${manhwa.chapter}</span>           
                  </div>
                  
                </div>
              
                `
            });
            contents.innerHTML = '<ul class="collection">'+manhwas+'</ul>'
        }).catch (err => {
            console.error(err);
        })
}

function getlistpopular(){
    title.innerHTML= "Most Popular Comic";
    fetch (popularEndpoin,fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.manhwas);
            let manhwas = "";
            resJson.manhwas.forEach(manhwa => {
                manhwas += `
                <div class="col s6" >
                  <div class="card row " >
                    <div class="card-image col s4"  >
                    <img src="${manhwa.thumbnail}" style="width:100px; height:125px;">
                    </div>
                    <h5 class="truncate title col s7" >${manhwa.title}</h5>          
                  </div>
                </div>
              
                `
            });
            contents.innerHTML = '<ul class="collection">'+manhwas+'</ul>'
        }).catch (err => {
            console.error(err);
        })
}

function getlist(){
    title.innerHTML= "Comic list";
    fetch (baseEndpoin,fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.manhwas);
            let manhwas = "";
            resJson.manhwas.forEach(manhwa => {
                manhwas += `
                <div class="col s6" >
                  <div class="card row " >
                  
                    <div class="card-image col s4"  >
                    <img src="${manhwa.thumbnail}" style="width:100px; height:120px;">

                    </div>
                    <a href=""  class="truncate title col s7" >${manhwa.title}</a>
                 
                    <span class= "col s6" style="margin-top: 10px;">${manhwa.latest_chapter}</span>
                    
                 
                  </div>
                  
                </div>
              
                `
            });
            contents.innerHTML = '<ul class="collection">'+manhwas+'</ul>'
            


        }).catch (err => {
            console.error(err);
        })
}

function loadPage(page){
    switch(page){
        case "all":
            getlist();
            break;
        case "latest":
            getlistlatest();
            break;
        case "popular":
            getlistpopular();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click",evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if(page === ""||page==="!") page = "all";
    loadPage (page);
    
});