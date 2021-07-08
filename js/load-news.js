const verfiednews = document.getElementById('verified-news-list')
const fakenews = document.getElementById('fake-news-list')

const verifiedNewsContainer = document.createElement('div')
verifiedNewsContainer.setAttribute('class', 'container')

const fakeNewsContainer = document.createElement('div')
fakeNewsContainer.setAttribute('class', 'container')

verfiednews.appendChild(verifiedNewsContainer)
fakenews.appendChild(fakeNewsContainer)


var URL1 = 'http://192.168.8.103:3000/getnews'; //Main API
var URL2 = 'http://192.168.8.103:3001/getnews'; //Backup API

URLChecking();

function URLChecking() 
{
    fetch(URL1,{method:'GET'})
    .then(function(resp) {
        //URL working
        ResponseChecking(URL1);
    })
    .catch(function(err) {
        //URL not working
        ResponseChecking(URL2);
    });
}


function ResponseChecking(URL) 
{
    var request = new XMLHttpRequest()
    request.open('GET', URL, true)
    request.onload = function() 
    {
        var data = JSON.parse(this.response)

        if(request.status >=200 && request.status < 400) 
        {
            //Responsiveed
            GetVerifiedNews (URL);
            getFakeNews(URL);
        } 
        else 
        {
            //Not responsive
            GetVerifiedNews (URL2);
            getFakeNews(URL2);
        }
    }

request.send()

}



function GetVerifiedNews (URL) 
{
    var request = new XMLHttpRequest()
    request.open('GET', URL, true)
    request.onload = function() 
    {
        var data = JSON.parse(this.response)

        if(request.status >=200 && request.status < 400) 
        {
            data.forEach(news => {

                const type = news.newstype;
                if(type == 'verified')
                {
                    const card = document.createElement('div')
                    card.setAttribute('class', 'card')
    
                    const title = document.createElement('h1')
                    title.setAttribute('class', 'title')
                    title.textContent = news.title
        
                    const date = document.createElement('h1')
                    date.setAttribute('class', 'date')
                    date.textContent = news.date

                    const description = document.createElement('h1')
                    description.setAttribute('class', 'description')
                    description.textContent = news.description
        
        
                    verifiedNewsContainer.appendChild(card)
                    card.appendChild(title)
                    card.appendChild(date)
                    card.appendChild(description)
                }
            })
        } 
        else 
        {
            console.log('error')
        }
    }

request.send()

}


function getFakeNews(URL) 
{
    var request = new XMLHttpRequest()
    request.open('GET', URL, true)
    request.onload = function() 
    {
        var data = JSON.parse(this.response)

        if(request.status >=200 && request.status < 400) 
        {
            data.forEach(news => {

            const type = news.newstype;
            if(type == 'fake')
            {
                const card2 = document.createElement('div')
                card2.setAttribute('class', 'card')
    
                const title = document.createElement('h1')
                title.setAttribute('class', 'title')
                title.textContent = news.title
    
                const date = document.createElement('h1')
                date.setAttribute('class', 'date')
                date.textContent = news.date

                const description = document.createElement('h1')
                description.setAttribute('class', 'description')
                description.textContent = news.description
    
    
                fakeNewsContainer.appendChild(card2)
                card2.appendChild(title)
                card2.appendChild(date)
                card2.appendChild(description)
            }
          })
    } 
    else 
    {
        console.log('error')
    }
}

request.send()

}