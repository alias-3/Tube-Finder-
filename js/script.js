$(function() {
    $("form").submit(function(e) {
        e.preventDefault();
        //take query from user input
        var t = $("#squery").val();
        //clear the previous console log taken for testing
        console. clear();
        search(t);

    })
})


function search(e) {
    $('#search-results').html(' ');
    $('#nav-buttons').html(' ');  
    
    //brief get request made to the youtube data api
    $.getJSON("https://www.googleapis.com/youtube/v3/search/",{
        part: "snippet",
        key: "AIzaSyDPZyHPbSzP13beJ-81xwrfzo-W8Sl1I_Q",
        maxResults: 8,
        type:'video',
        q: e
    }, function(data) {
       var nextPageToken = data.nextPageToken;
    var prevPageToken = data.prevPageToken;
    var prevnext = buildButton(nextPageToken,prevPageToken);
    $('#nav-buttons').append(prevnext);

    //iterate on the acquired number of json objects and append to output    
    $.each(data.items, function(i, item) {
        var individual_result = jsonResults(item);
        $('#search-results').append(individual_result);
        });
        //test the response recieved with console.log
        console.log(data.items);
    })
    
 
}

//single result format
function jsonResults(e) {

        var title = e.snippet.title,
            vidId = e.id.videoId,
            desc = e.snippet.description,
            thumbnail = e.snippet.thumbnails.medium.url,
            published = e.snippet.publishedAt;  
            channelTitle = e.snippet.channelTitle;
            var single_item='<li id="result-card">'+'<a class="afterglow" href="#vid">'+'<img id="img" class="col-md-4" style="border-radius: 15px;" src="'+thumbnail+'">'+'<div class="col-md-8">'+'<ul id="item-desc" style="list-style: none;">'+'<li id="title">'+title+'</li>'+'<li>'+channelTitle+'</li>'+'<li>'+desc+'</li>'+'<li>'+published+'</li>'+'</ul>'+'</div>'+'</a>'+'</li>';
            return single_item;
}
    
function buildButton(nextPageToken,prevPageToken){
    if(!prevPageToken)
        var validButtons = '<div>'+'<img align="right" width="50px" height="50px" src="img/next.png" onClick>'+'</div>';
    else if(!nextPageToken)
        var validButtons = '<div>'+'<img align="left" width="50px" height="50px" src="img/previous.png">'+'</div>';
    else
        var validButtons = '<div>'+'<img align="left" width="50px" height="50px" src="img/previous.png">'+'<img align="right" width="50px" height="50px" src="img/next.png">'+'</div>';
    return validButtons;
}
