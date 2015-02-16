
/* setup for dance videos skipped */
function listVideos(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

// Search for a given string.
function getVideos() {

	if (listVideos('list')) {
		var ids = listVideos('list');
		console.log('videos skipped: '+ids);
		
	
		gapi.client.load('youtube', 'v3', function() {
        var request = gapi.client.youtube.videos.list({
            part: 'snippet',
            id:ids,
            key:'AIzaSyDeAikv_mXaHKvVWc6JG-hqKHZnSMiGfpo'
        });
         request.execute(function(response) {
         
        var template = $('#listTemplate').html();
		var html = Mustache.to_html(template, response);
		$('.videoList').html(html);

	  //   console.log(response.result);
	  });
    });

		
		
	} else {
		$('.endMessage').html('Thank you for Watching!');
	}
	


}




// Once the api loads call enable the search box.
function googleApiClientReady() {
  console.log("GOOGLE READY!");
  getVideos();
 ////////////////////////////////////////
}




