const streetImgArr = [
    "https://images.unsplash.com/photo-1552819686-25b0c726045d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZWV0fGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1617564112851-8dc6d3f4ec34?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3RyZWV0fGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1593940836716-38a8ee2c5eb4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3RyZWV0fGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1548930776-9680c40bbd95?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHN0cmVldHxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHN0cmVldHxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1620888836251-0204241bef7b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHN0cmVldHxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
];

var container = document.getElementsByClassName("container")[0];
var containerImg = document.createElement('img');
containerImg.src = streetImgArr[0];
container.append(containerImg);
var i = 0;
for(i = 0; i < 6; i++) {
    var newPic = document.createElement('div');
    newPic.className = 'column';
    var row = document.getElementsByClassName("row")[0];
    row.append(newPic);
    var newPicImg = document.createElement('img');
    newPicImg.src = streetImgArr[i];
    newPic.append(newPicImg);
}
