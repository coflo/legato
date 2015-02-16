/*

::State Keeping Objects Explained::

-------

mainVideo - var is the state keeper of the movie, we dump the state of where we are at in playing the main movie in here.  The following values tell us what is happening:

	chapterX - this says that we are starting that section of the main video, each chapter will have a choice segment, which can lead to a dance video or to carry on to the next chapter.
	
	chapterXChoice - this tells us that we are playing X chapter and the choice is valid at the predetermined time marker as to when we choose a dance video or move onto the next chapter.
	
	chapterXDance - this tells us that the video we are going to play is a dance video, so at the end of video playback we can move on

-------	



*/

var mainVideo =
					{
						'name': 'chapter1',
						'time': 0

					};

var danceVideosSkipped = [];


var mainVideoYTid = 'qcDadaQjbvY';
var danceVideo1YTid = 'sGitYScar2k';
var danceVideo2YTid = '4jxSY8sWp_w';
var danceVideo3YTid = '';
var danceVideo4YTid = '';
var danceVideo5YTid = '';

var playerState; //keep playback state of the player



/* ALL CLICK ACTIONS */

$('#startLegato').click(
	function () {
		$('#startContainer').hide();
		$('.mastfoot').hide();
		$('.masthead').hide();
		$('#movieContainer').css('width', '100%');
		$('#movieContainer').css('height', '100%');


		startTheShow();
	}
);


$('.chapterButtonsDance').click( //click actions for dance choices
	function () {
		if (mainVideo.name == 'chapter2Choice') {
			mainVideo.name = 'chapter3Dance'; //there is no chapter 1 dance
			ytplayer.loadVideoById(danceVideo1YTid, 0, 'large'); //first dance video
			changeControls(2);
			console.log('loading first dance video');
		}

		else if (mainVideo.name == 'chapter3Choice') {
			mainVideo.name = 'chapterDanceFinal';
			ytplayer.loadVideoById(danceVideo2YTid, 0, 'large'); //first dance video
			changeControls(3);
			console.log('loading second dance video');
		}

		else {
			console.log('trying to load something not correct...broken!');
		}

	}
);



$('.chapterButtonsSkip').click( //click action for skip choices
	function () {
		if (mainVideo.name == 'chapter2Choice') {
			mainVideo.name = 'chapter3Choice';
			danceVideosSkipped.push(danceVideo1YTid);
			playVideo();
			changeControls(2);
			console.log('Skipping and carrying onto' + mainVideo.name);
		}

		else if (mainVideo.name == 'chapter3Choice') {
			mainVideo.name = 'chapterFinal';
			danceVideosSkipped.push(danceVideo2YTid);
			playVideo();
			changeControls(3);
			console.log('Skipping and carrying onto' + mainVideo.name);
		}

		else {
			console.log('trying to load something not correct...broken!');
		}

	}
);

/*Click actions end */

function changeControls(chapter) { //maintaing the DOM for the controls
	$('.chapterControls').hide(); //hide the controls

	if (chapter == 2) {
		$('.chapterButtonsDance').html('Lets Dance Again..');
		$('.chapterButtonsSkip').html('Lets Skip Again..');
	} else if (chapter == 3) {	//not used right now
		$('.chapterButtonsDance').html('Lets Dance Again Again..');
		$('.chapterButtonsSkip').html('Lets Skip Again Again..');
	}

}

function checkTime() {

	if (Math.round(ytplayer.getCurrentTime()) == 4 && mainVideo.name == 'chapter1') { //checking for chapter 1 choice
		mainVideo.time = 4;
		mainVideo.name = 'chapter2Choice';
		pauseVideo();
		$('.chapterControls').show();
	}

	else if (Math.round(ytplayer.getCurrentTime()) == 10 && (mainVideo.name == 'chapter3Choice' || mainVideo.name == 'chapter3Dance')) {
		mainVideo.name = 'chapter3Choice';
		mainVideo.time = 10;
		pauseVideo();
		$('.chapterControls').show();
	}

	else if (mainVideo == 'chapter1') {
		console.log('Chapter 1 player...');
	}
}

function pauseVideo() {
	ytplayer.pauseVideo();
}

function playVideo() {
	ytplayer.playVideo();
}

function playerStateChange(newState) {
	playerState = newState;
	console.log('Players new state: ' + playerState);

	if (playerState == 0 & mainVideo.name == 'chapter3Dance') {
		ytplayer.loadVideoById(mainVideoYTid, mainVideo.time + 1, 'large'); //first dance video
	}

	else if (playerState == 0 & mainVideo.name == 'chapterDanceFinal') {
		ytplayer.loadVideoById(mainVideoYTid, mainVideo.time + 1, 'large');
		mainVideo.name = 'chapterFinal';
	}

	else if (playerState == 0 & mainVideo.name == 'chapterFinal') {

		window.location = 'theend.html?list=' + danceVideosSkipped;

	}

}

function onYouTubePlayerReady(playerId) {
	ytplayer = $('#myytplayer')[0];
	ytplayer.addEventListener('onStateChange', 'playerStateChange');
	ytplayer.playVideo();

	setInterval(checkTime, 1000);

	console.log('DEBUG: Player ready', playerId);


}

function startTheShow() {    // start things up

	var params = { allowScriptAccess: 'always' };
	var atts = { id: 'myytplayer' };
	swfobject.embedSWF('http://www.youtube.com/v/' + mainVideoYTid + '?enablejsapi=1&playerapiid=ytplayer&version=3',
										 'player', '100%', '100%', '8', null, null, params, atts);
}


