var clicks = 0;//clicks
function submit(){
    clicks += 1;

    $('section').append('<div class="box'+clicks+'" id="Thebox"><button onclick="remove('+clicks+')">rm</button><a id="tekst'+clicks+'"></a></div>')
    $('#tekst'+clicks).html('<img src=gif.gif>');
    var ceneoURL = $('#linkinput').val();
    var productID = ceneoURL.substring(ceneoURL.lastIndexOf("/") + 1);


    var i = 0;
    
    avoidCORS(ceneoURL);


     window.setTimeout(function(){
         if($('.value').html() == null){
            $('#tekst'+clicks).html('error loading resoruce');
             console.log('error loading resoruce');
         }else{
             checkprice(productID, ceneoURL)
            }
         }, 8000);


}

var theString = ''
function checkprice(productID, ceneoURL){
    $('#tekst'+clicks).html('');
    let lowestPrice = $('a[data-lowestprice]').data();
    if (lowestPrice == null){                           //if there's just one record different approach needed
        let a = $('.value').html()
        let b = $('.penny').html()
        lowestPrice = a+b;
    }else{
        lowestPrice = lowestPrice.lowestprice;  
    }
    console.log(lowestPrice);
    let name = $("h1").html()
    let productName = name;
    var date = new Date;
    date = convertDate(date)
    theString = lowestPrice+' zł'

    var tempName = getImageName(name);

    console.log(tempName)
    var img = 'http://image.ceneostatic.pl/data/products/'+productID+'/f-'+tempName+'.jpg'
    
    $('#tekst'+clicks).append('<img src="'+img+'" class="contentIMG"></img>'+clicks);
    $('#tekst'+clicks).append('<br><br><a class ="pName">'+productName+'</a><br>Current Price: '+theString);
    $('#tekst'+clicks).append('<br>'+date+'<br><a href="'+ceneoURL+'" target="_blank"><img src="ceneo.png"></a><br>');
    

    $('#inlineFrameExample').html('')
    window.alert(theString)
}
function remove(cl){
    console.log('#box'+cl)
    $('.box'+cl).remove()
}
function convertDate(date){
    let tempDay = date.getDate();
    let tempMonth = date.getMonth() + 1;
    let tempYear = date.getYear() + 1900;
    let tempHour = date.getHours();
    let tempMinutes = date.getMinutes();

    if(tempMinutes<10) tempMinutes = "0"+tempMinutes;
    if(tempHour<10) tempHour = "0"+tempHour;

    date = tempHour+":"+tempMinutes+" | "+tempDay+"."+tempMonth+"."+tempYear;
    console.log(date)
    return date;
}

function getImageName(tempName){
    console.log(tempName,'x')
    //replacing pl char
    tempName.toLowerCase()
    tempName= name.replace(/ /g,"-")
    tempName = tempName.replace(":","-")
    tempName = tempName.replace("ś","s")
    tempName = tempName.replace("ł","l")
    tempName = tempName.replace("ż","z")
    tempName = tempName.replace("ź","z")
    tempName = tempName.replace("ę","e")
    tempName = tempName.replace("ó","o")
    tempName = tempName.replace("ń","n");
    return tempName;
}

function avoidCORS(ceneoURL){
//https://stackoverflow.com/questions/15005500/loading-cross-domain-endpoint-with-jquery-ajax
console.log('runnging CORS')
    url = ceneoURL; // TEST URL
    let s;
    $.get("https://images"+~~(Math.random()*33)+"-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=" + encodeURI(url), function(data) {
        $('#inlineFrameExample').append(data)
        console.log(data)
    });
}
