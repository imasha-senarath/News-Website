document.getElementById('submit-as-verified').addEventListener('click', clickedVerfied);
document.getElementById('submit-as-fake').addEventListener('click', clickedFake);

var ClickedButton;
var URL1 = 'http://192.168.8.103:3001/addnews';
var URL2 = 'http://192.168.8.103:3002/addnews';

function clickedVerfied(e) 
{
    e.preventDefault();
    ClickedButton = 'verified';
    URLChecking(URL1)

}

function clickedFake(e) 
{
    e.preventDefault();
    ClickedButton = 'fake';
    URLChecking(URL1)
}


function URLChecking(URL) 
{
    fetch(URL,{method:'POST'})
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
    request.open('POST', URL, true)
    request.onload = function() 
    {
        var data = JSON.parse(this.response)

        if(request.status >=200 && request.status < 400) 
        {
            //Responsiveed
            if(ClickedButton == 'verfied')
            {
                addVerifiedNews(URL);
            }
            else
            {
                addFakeNews(URL)
            }
        } 
        else 
        {
            //Not responsive
            if(ClickedButton == 'verfied')
            {
                addVerifiedNews(URL2);
            }
            else
            {
                addFakeNews(URL2)
            }
        }
    }

request.send()

}


function addVerifiedNews(URL) 
{
    let title = document.getElementById('newstitle').value;
    let description = document.getElementById('newsdescription').value;

    fetch(URL,{
        method:'POST',
        headers: {
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            title: title,
	        description: description,
            newstype: 'verified',
            date: new Date().toLocaleString()
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        const result = JSON.stringify(data.message);
        if(result == '"News added successfully."')
        {
            alert(result);
        }
        else
        {
            alert('Submit was fail.');
        }   
    })

    document.getElementById('newstitle').value = "";
    document.getElementById('newsdescription').value = "";
} 



function addFakeNews(URL) 
{
    let title = document.getElementById('newstitle').value;
    let description = document.getElementById('newsdescription').value;

    fetch(URL,{
        method:'POST',
        headers: {
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            title: title,
	        description: description,
            newstype: 'fake',
            date: new Date().toLocaleString()
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        const result = JSON.stringify(data.message);
        if(result == '"News added successfully."')
        {
            alert(result);
        }
        else
        {
            alert('Submit was fail.');
        }   
    })

    document.getElementById('newstitle').value = "";
    document.getElementById('newsdescription').value = "";
} 