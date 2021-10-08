const streetImgArr = [
    "https://images.unsplash.com/photo-1552819686-25b0c726045d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZWV0fGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1617564112851-8dc6d3f4ec34?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3RyZWV0fGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1593940836716-38a8ee2c5eb4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3RyZWV0fGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1548930776-9680c40bbd95?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHN0cmVldHxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHN0cmVldHxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1620888836251-0204241bef7b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHN0cmVldHxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
];
const foodAndDrinkArr = [
    "https://images.unsplash.com/photo-1422748733255-ee572fddeab0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2QlMjAlMjYlMjBkcmlua3xlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1556804335-2fa563e93aae?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZCUyMCUyNiUyMGRyaW5rfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1535140728325-a4d3707eee61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb2QlMjAlMjYlMjBkcmlua3xlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1502898664531-0564045a0da9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2QlMjAlMjYlMjBkcmlua3xlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1591735200387-c29c7d0ec3d3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGZvb2QlMjAlMjYlMjBkcmlua3xlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1625827626291-6fbd47a431ae?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGZvb2QlMjAlMjYlMjBkcmlua3xlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
]
const natureArr = [
    "https://images.unsplash.com/photo-1566704351700-da9069468d94?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1433048980017-63f162f662b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1471180625745-944903837c22?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1570030990547-f6b13f3062ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1465188035480-cf3a60801ea5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bmF0dXJlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1606318621597-c057f7d4926e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fG5hdHVyZXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
]
let currentIndex = 0;
let currentArr = streetImgArr;

let displayBoxImg = document.getElementById("displayBoxImg"),
    prevButton = document.getElementById("prevButton"),
    nextButton = document.getElementById("nextButton"),
    rowElement = document.getElementsByClassName("row")[0],
    thumbnails = document.getElementsByClassName("row")[0].children;

renderPic(streetImgArr);

function renderPic(arr) {
    currentArr = arr;
    var i = 0;
    for(i = 0; i < arr.length; i++) {
        var newPic = document.createElement('div');
        newPic.className = 'column';
        var row = document.getElementsByClassName("row")[0];
        row.append(newPic);
        var newPicImg = document.createElement('img');
        newPicImg.src = arr[i];
        newPicImg.id = i;
        newPicImg.onclick = function() {
            thumbnails[currentIndex].classList.remove("picked");
            currentIndex = Number(this.id);
            setImg(currentIndex);
        };
        newPic.append(newPicImg);
    }
    setImg(currentIndex);
}


function prev() {
    if(currentIndex > 0) {
        thumbnails[currentIndex].classList.remove("picked");
        currentIndex--;
        setImg(currentIndex);
    }
}

function next() {
    if(currentIndex < currentArr.length - 1) {
        thumbnails[currentIndex].classList.remove("picked");
        currentIndex++;
        setImg(currentIndex);   
    }
}

function setImg(index) {
    displayBoxImg.src = currentArr[index];
    thumbnails[index].classList.add("picked");
    disableCheck();
}

function disableCheck() {
    // console.log("currentIndex:", currentIndex, "currentArrLen:",currentArr.length)
    if(currentIndex === 0) {
        prevButton.classList.add("disabled");
        nextButton.classList.remove("disabled");
    }
    else if(currentIndex === currentArr.length - 1) {
        prevButton.classList.remove("disabled");
        nextButton.classList.add("disabled");
    }
    else {
        prevButton.classList.remove("disabled");
        nextButton.classList.remove("disabled");
    }
}

function switchAlbum(album) {
    rowElement.innerHTML = '';
    currentIndex = 0;
    if(album === 'street') renderPic(streetImgArr);
    else if(album === 'food') renderPic(foodAndDrinkArr);
    else if(album === 'nature') renderPic(natureArr);
    else {
        alert("此相簿為空！")
        renderPic(currentArr);
    }
}
