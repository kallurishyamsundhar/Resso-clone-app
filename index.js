
//intialize the varibles
let songindex=0;
let audio=new Audio("./calm.mp3");
let masterplay=document.getElementById("masterplay");
let myprogressbar=document.getElementById("myprogressbar");
let gif=document.getElementById("gif");
let mastersongname=document.getElementById("mastersongname");
let songitem=Array.from(document.getElementsByClassName("songitem"));

//
let songs=[
    {songname:"harley in hawai",filePath:"./harley.mp3",coverPath:"./harley.jpg"},
    {songname:"calmdown",filePath:"./calm.mp3",coverPath:"./calmdown.jpg"},
    {songname:"closer",filePath:"./closer.mp3",coverPath:"./closer.png"},
    {songname:"levitating",filePath:"./levitating.mp3",coverPath:"./levitating.jpeg"},
    {songname:"blindinglights",filePath:"./blinding.mp3",coverPath:"./blindinglights.jpeg"},
    {songname:"Perfect",filePath:"./perfect.mp3",coverPath:"./perfect.jpeg"},
    ]
songitem.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText=songs[i].songname;
})




//Handle play,pause click
masterplay.addEventListener("click",()=>{
    if (audio.paused|| audio.currentTime<=0){
        audio.play();
        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }
    else{
        audio.pause();
        masterplay.classList.remove("fa-pause-circle");
        masterplay.classList.add("fa-circle-play");
        gif.style.opacity=0;
    }

})
// listen to events
audio.addEventListener("timeupdate",()=>{
    console.log("timeupdate");
    //update seekbar
    progress=parseInt((audio.currentTime/audio.duration)*100);
    console.log("progress");
    myprogressbar.value=progress;

})
myprogressbar.addEventListener("change",()=>{
    audio.currentTime=myprogressbar.value*audio.duration/100;
})
const makeAllplays=()=>{
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-circle-play");
    })
}
Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
    makeAllplays();
    songindex=parseInt(e.target.id);
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-pause-circle");
    audio.src = songs[songindex].filePath;
    mastersongname.innerText=songs[songindex].songname;
    gif.style.opacity=1;
    audio.currentTime=0;
    audio.play();
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-circle-pause");
    
    })
})
document.getElementById("next").addEventListener("click",()=>{
    if(songindex>=5){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audio.src = songs[songindex].filePath;
    mastersongname.innerText=songs[songindex].songname;
    audio.currentTime=0;
    audio.play();
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-circle-pause");
    
})
document.getElementById("previous").addEventListener("click",()=>{
    if(songindex<=0){
        songindex=5;
    }
    else{
        songindex-=1;
    }
    audio.src = songs[songindex].filePath;
    mastersongname.innerText=songs[songindex].songname;
    audio.currentTime=0;
    audio.play();
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-circle-pause");
    
})