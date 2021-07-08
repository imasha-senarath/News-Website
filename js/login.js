document.getElementById('login').addEventListener('submit', URLChecking);

var URL1 = 'http://192.168.8.103:3000/login';
var URL2 = 'http://192.168.8.103:3001/login';


function URLChecking(e) 
{
    e.preventDefault();

    fetch(URL1,{method:'POST'})
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
            login(URL)
        } 
        else 
        {
            //Not responsive
            login(URL2)
        }
    }

request.send()

}



function login(URL) 
{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch(URL,{
        method:'POST',
        headers: {
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            email: email,
	        password: password,
        })
    })
    .then((res) => res.json())
    .then((data) => {
        const result = JSON.stringify(data.message);
        if(result=='"Authentication failed"')
        {
            alert(result);
        }
        else
        {
            window.location.href = "admin.html";
        }
    })
} 