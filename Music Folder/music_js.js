let now_playing = document.querySelector(".now-playing");                  /*here names in double inverted quotes are same as class names those mentioned in html file*/
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let prev_btn = document.querySelector(".prev-track");
let next_btn = document.querySelector(".next-track");


let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");

let track_index = 0;
let isPlaying = false;
let updateTimer;


//creating audio element for the player
let curr_track =  document.createElement('audio');

//now here is the list of all the songs along with their name, artist, image, path

let track_list = [
{
	name : "Tune Mere Jana",
	artist : "Gajendra Verma",
	image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWeVZXwg4arjSDyq32cJyICw3QLhpRl9UBfw&usqp=CAU.jpg",
	path : "Tune Mere Jaana.mp3",
},
{
  name : "Waalian",
  artist : "Harnoor",
  image : "https://www.quirkybyte.com/wp-content/uploads/2020/10/9-9.jpg",
  path : "Waalian.mp3",
},
{
  name : "Kya Mujhe Pyaar Hai",
  artist : "Pritam, KK",
  image : "https://i.ytimg.com/vi/1DGNn0GslLQ/sddefault.jpg",
  path : "Kya Mujhe Pyaar Hai.mp3",
},
{
  name : "Jannat",
  artist : "B Praak",
  image : "https://i.pinimg.com/564x/27/43/0a/27430ade797d43123342e914d1938d61.jpg",
  path : "Jannat.mp3",
},
{
  name : "Soniyo",
  artist : "Raju Singh, Sonu Nigam, Shreya Ghoshal",
  image : "https://www.glamsham.com/wp-content/uploads/2020/02/1527681983.jpeg",
  path : "Soniyo.mp3",
},
{
  name : "Butterfly",
  artist : "Jass Manak",
  image : "http://www.mrstatus.in/wp-content/uploads/2020/09/Butterfly-Mp3-Song-Download-.jpg",
  path : "Butterfly.mp3",
},
{
  name : "Uska Hi Bana",
  artist : "Chirrantan Bhatt, Arijit Singh",
  image : "https://c-cl.cdn.smule.com/rs-s78/arr/3d/63/5c5dceb1-9a53-46a3-a35c-5602128f6783.jpg",
  path : "Uska Hi Bana.mp3",
},
{
  name : "Raataan Lambiyan",
  artist : "Asees Kaur, Jubin Nautiyal",
  image : "https://images.mid-day.com/images/images/2021/jul/sidsong_d.jpg",
  path : "Raataan Lambiyan.mp3",
},
{
  name : "Aye Khuda",
  artist : "Salim Merchant",
  image : "https://i.ytimg.com/vi/qH3Y-lOFiG0/maxresdefault.jpg",
  path : "Aye Khuda.mp3",
},
{
  name : "Ranjha",
  artist : "B Praak, Jasleen Royal",
  image : "https://www.glamsham.com/wp-content/uploads/2021/08/Shershaah-Ranjha-Song-Lyrics-starring-Sidharth-Malhotra-and-Kiara-Advani.png",
  path : "Ranjha.mp3",
},
{
  name : "Mann Bharryaa 2.0",
  artist : "B Praak",
  image : "https://i.ytimg.com/vi/DwxqN5GmbCk/mqdefault.jpg",
  path : "Mann Bharryaa 2.0.mp3",
},

];

function loadTrack(track_index)
{
  clearInterval(updateTimer);           /*is used to clear the previous seek timer*/
  resetValues();


// ,loading a new track from the  list
curr_track.src=track_list[track_index].path;
curr_track.load();

//updating the details of the newly loaded track
track_art.style.backgroundImage="url(" + track_list[track_index].image + ")";
track_name.textContent=track_list[track_index].name;
track_artist.textContent=track_list[track_index].artist;
now_playing.textContent="PLAYING "+(track_index+1)+" OF "+ track_list.length;


// set an interval of 1000ms for updating the seek slider
updateTimer=setInterval(seekUpdate, 1000);

//command for playing the next track, when current track duration finishes using 'ended' event, for this here we are adding eventListener
curr_track.addEventListener("ended", nextTrack);

//adding random background colors for different tracks, here this is a function, it's body is made below
random_bg_color();
}

//creating a function for random color
function random_bg_color()
{

  //Get a random number between 64 to 256 for getting lighter colors
  /*let first=Math.floor(Math.random()*256)+64;
  let second=Math.floor(Math.random()*256)+64;
  let third=Math.floor(Math.random()*256)+64;
  //let fourth=Math.floor(Math.random()*256)+64;

  //Construct a color with the given values
  let bgcolor= "rgb(" +first+ "," +second+ "," +third+ ")";
*/
 let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  
  // Construct a color withe the given values
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
  
  // Set the background to the new color
  document.body.style.background = bgColor;
}

// Function to reset all values of seek timer , duration to their default
function resetValues()
{
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack()
{
  // Switch between playing and pausing depending on the current state
  if(!isPlaying)
    playTrack();
  else
    pauseTrack();
}

//playing the loaded track
function playTrack()
{
  curr_track.play();
  isPlaying=true;
  //Replace the play icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

//pausing the loaded track
function pauseTrack()
{
  curr_track.pause();
  isPlaying=false;
//changing the pause icon with play icon
playpause_btn.innerHTML='<i class="fa fa-play-circle fa-5x"></i>';
}

//function for next track
function nextTrack()
{
  //condition for checking index of next track, if smaller than the last in the track list, then go to the first track
  if(track_index<track_list.length-1)
    track_index+=1;
  else
    track_index=0;

  //loading the desired index track
  loadTrack(track_index);
  playTrack();
}



//not working previous track
//function for previous track,
function prevTrack()
{
  //condition for checking if track_index is greater than 0, then it's value is decremented by -1 else if cuurrent index if 0 i.e., first track then control goes to last track
  if(track_index>0)
    track_index=track_index - 1;
  else
    track_index=track_list.length-1;
//loading the new track and playing it
  loadTrack(track_index);
  playTrack();
}

function seekTo()
{
  //Calculating the seek position by the percentage of the seek slider and get the relative duration to the track
  seekto=curr_track.duration*(seek_slider.value/100);
  //Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}

function setVolume()
{
  //Set the volume according to the percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate()
{
  let seekPosition=0;
  if(!isNaN(curr_track.duration))
  {
    seekPosition=curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

     // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
  
    // Add a zero to the single digit time values
    if (currentSeconds < 10) 
      { 
        currentSeconds = "0" + currentSeconds; 
      }
    if (durationSeconds < 10) 
      { 
        durationSeconds = "0" + durationSeconds; 
      }
    if (currentMinutes < 10) 
      { 
        currentMinutes = "0" + currentMinutes; 
      }
    if (durationMinutes < 10) 
      { 
        durationMinutes = "0" + durationMinutes; 
      }
  
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Load the first track in the tracklist
loadTrack(track_index);




