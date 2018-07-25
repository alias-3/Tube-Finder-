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
        maxResults: 10,
        type:'video',
        q: e
    }, function(data) {
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
            var single_item='<li id="result-card">'+'<img id="img" class="col-md-4" style="border-radius: 15px;" src="'+thumbnail+'">'+'<div class="col-md-8">'+'<ul id="item-desc" style="list-style: none;">'+'<li id="title">'+title+'</li>'+'<li>'+desc+'</li>'+'<li>'+published+'</li>'+'</ul>'+'</div>'+'</li>';
            return single_item;
}

