//const clientId = "ca6139e49c5bf36";
const clientId = "a4b616e1ef60967";
var defaultAlbumId = 'Jfni3';

document.getElementById("fetchWithPromisesButton").addEventListener("click", fetchWithPromises);
document.getElementById("fetchWithAsyncAwaitButton").addEventListener("click", fetchWithAsyncAwait);

function requestAlbum() {
    let albumId = document.getElementById("albumIdField").innerText;

    if (!albumId) {
        albumId = defaultAlbumId;
    }

    fetch('https://api.imgur.com/3/album/' + albumId + '/images', {
        headers: {
            'Authorization': 'Client-ID ' + clientId
        }
    })
        .then(response => response.json())
        .then(data => {
            processAlbumRequest(data);
        })
        .catch(error => {
            console.log("Error with the imgur API:", error);
        });
}

function processAlbumRequest(respObj) {
    for (item of respObj.data.slice(0, 10)) {
        console.log(item);
        requestImage(item.id);
    }
}

function requestImage(imageHash) {
    fetch('https://api.imgur.com/3/image/' + imageHash, {
        headers: {
            'Authorization': 'Client-ID ' + clientId
        }
    })
        .then(response => response.json())
        .then(data => {
            processImageRequest(data);
        })
        .catch(error => {
            console.log("Error with the imgur API:", error);
        });
}

function processImageRequest(respObj) {
    let imgElem = document.createElement("img");
    imgElem.src = respObj.data.link;
    //imgElem.referrerpolicy="no-referrer";
    document.body.appendChild(imgElem);
}

function fetchWithPromises() {
    requestAlbum();
}

async function fetchWithAsyncAwait() {
    try {
        const response = await fetch('https://api.imgur.com/3/album/' + defaultAlbumId + '/images', {
            headers: {
                'Authorization': 'Client-ID ' + clientId
            }
        });
        const data = await response.json();
        processAlbumRequest(data);
    } catch (error) {
        console.log("Error with the imgur API:", error);
    }
}

window.addEventListener("load", requestAlbum);
