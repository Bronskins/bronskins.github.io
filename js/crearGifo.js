// <--------------------------------------- VARIABLES --------------------------------------->

let buttonDark = document.getElementById('darkTheme')
let body = document.getElementsByTagName('body')
let imagenContainer = document.getElementById('gif-container')
let apiKey = 'xv6GpRhmfOnrLuxc4mqGQFxne2fvtdQ1'
let input = document.getElementById('inputText')
let suggestions = document.getElementById('suggestions')
let lupa = document.getElementById('iconSearch')
let resultados = document.getElementById('resultados')
let trending = document.getElementsByClassName('trending')
let right = document.getElementById('right')
let left = document.getElementById('left')
let download = document.getElementsByClassName('download')
let resultadosTitle = document.getElementById('resultados-title')
let h1Title = document.getElementById('h1-title')
let h1Border = document.getElementById('h1-border')
let midCtn = document.getElementById('midCtn')
let verMas = document.getElementById('verMas')
let noResults = document.getElementById('noResults')
let inputContainer = document.getElementById('input-container')
let iconClose = document.getElementById('iconClose')
let favs = document.getElementsByClassName('favorito')
let gifContainer = document.getElementById('crearGif-container')
let crearGifText = document.getElementById('crearGif-text')
let crearGifDescription = document.getElementById('crearGif-description')
let crearGifDescription2 = document.getElementById('crearGif-description2')
let uno = document.getElementById('uno')
let dos = document.getElementById('dos')
let grabar = document.getElementById('grabar')
let comenzar = document.getElementById('comenzar')
let videoContainer = document.getElementById('video-container')
let finalizar = document.getElementById('finalizar')
var n = 0;
let favIcons = [];
let aux = 1;
let aux2 = 12
let aux3 = 24
let aux4 = 0;

// <--------------------------------------- FUNCIONES --------------------------------------->


// Agregar al DOM el GIF

function AddtoDOM(data, container, additionalClass){

    newDiv = document.createElement('div')
    newDiv.className = "imagen-container"
    newImg = document.createElement('img')
    newImg.className = "imagen-imagen"
    newImg.className += " " + additionalClass
    titleText = document.createElement('h3')
    titleText.id = "titleText"
    titleText.innerHTML = data.title
    userText = document.createElement('h4')
    userText.id = "userText"
    if (data.username == ""){
    userText.innerHTML = "User"
    } else {
    userText.innerHTML = data.username
    }
    newHover = document.createElement('div')
    newHover.className = "imagen-hover"
    newFeatures = document.createElement('div')
    newFeatures.className = "featureCtn"
   
    fav = document.createElement('img')
    fav.className = "favorito"
    fav.id = `favorito${aux4}`
    fav.style.width = "32px"
    fav.style.height = "32px"
    if (localStorage.getItem(`ID${data.id}`) === null) {
        fav.setAttribute ("src", "../assets/icon-fav.svg")

    } else {
        fav.setAttribute ("src", "../assets/icon-fav-active.svg")
    }
    favIcons.push(fav)
    newImg.setAttribute('src', "https://media3.giphy.com/media/" + data.id + "/giphy.gif")
    download = document.createElement('img')
    download.className = "descarga"
    download.setAttribute("src", "../assets/icon-download.svg")
    maximize = document.createElement('img')
    maximize.className = "maximizar"
    maximize.setAttribute('src', "../assets/icon-max-normal.svg")
    container.appendChild(newDiv)
    newDiv.appendChild(newImg)
    newDiv.appendChild(newHover)
    newHover.appendChild(newFeatures)
    newFeatures.appendChild(fav)
    newFeatures.appendChild(download)
    newFeatures.appendChild(maximize)
    newHover.appendChild(userText)
    newHover.appendChild(titleText)

    download.addEventListener('click', () => {
        fetch("https://media3.giphy.com/media/" + data.id + "/giphy.gif")
        .then(response => response.blob().then( giphy =>{
            saveURL = URL.createObjectURL(giphy)
            Object.assign( link = document.createElement('a'), { 
                href: saveURL, 
                download: "myGif.gif"
            }	)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        } 	)	)
    });
    
    
    newImg.addEventListener('click', () => {
        location.href = data.embed_url
    })
    maximize.addEventListener('click', () => {
        location.href = data.embed_url
    });

    let favy = document.getElementById(`favorito${aux4}`)
    favy.addEventListener('click', () => {
        if(favy.src.includes("icon-fav.svg")){
        localStorage.setItem(`ID${data.id}`, `${data.id}`)
        favy.setAttribute('src', "../assets/icon-fav-active.svg")
        favy.style.width = "32px";
        favy.style.height = "32px"
        } else {
            favy.setAttribute("src", "../assets/icon-fav.svg")
            localStorage.removeItem(`ID${data.id}`, `${data.id}`)
        }
    })
    
    aux4++;
}

// Fetch TRENDING

function fetchTrending(i){
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        AddtoDOM(data.data[i], imagenContainer, "trendingGif")
    })
};    

for (let i = 0; i < 3; i++){
    fetchTrending(i)
}


// <--------------------------------------- EVENT LISTENERS --------------------------------------->

// DARK THEME

buttonDark.addEventListener('click', () =>{
    body[0].classList.toggle('dark')
}
);

// CREATE GIF 

comenzar.addEventListener('click', async (e) => {
comenzar.style.visibility = "hidden"
crearGifText.textContent = "¿Nos das acceso a tu cámara?"
crearGifDescription.textContent = "El acceso a tu cámara sera válido solo"
crearGifDescription2.textContent = "por el tiempo en el que estes creando el GIFO."
uno.style.backgroundColor = "#572EE5";
uno.style.color = "white"
const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
})
document.querySelector('video').srcObject = stream
crearGifText.style.display = "none"
crearGifDescription.style.display = "none"
crearGifDescription2.style.display = "none"
document.querySelector('video').style.display = "block"
uno.style.backgroundColor = "white"
uno.style.color = "#572EE5"
dos.style.backgroundColor = "#572EE5";
dos.style.color = "white"
comenzar.style.display = "none"
grabar.style.display = "block"

// Start Recording

grabar.addEventListener('click', () => {
    window.setInterval(function(){
        if(n < 10){
        timer.innerHTML = "00:00:0" + n
        } else {
            timer.innerHTML = "00:00:" + n
        }
        n++;}, 1000);
    recorder.startRecording();
    grabar.style.display = "none"
    finalizar.style.display = "block"
    var timer = document.getElementById('sw-time')
   

})

// Objeto Recorder

let recorder = RecordRTC(stream, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function() {
     console.log('started')
   },
  });

// Stop Recording

finalizar.addEventListener('click', () => {
    recorder.stopRecording();
          console.log('stopped')
          let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    myFile = form.get('file')
    console.log(form)
    var timer = document.getElementById('sw-time')
    timer.style.display = "none"
    dos.style.backgroundColor = "white"
    dos.style.color = "#572EE5"
    tres.style.backgroundColor = "#572EE5"
    tres.style.color = "white"
    var subir = document.getElementById('subir')
    finalizar.style.display = "none"
    subir.style.display = "block"
    var repetir = document.getElementById('repetir')
    repetir.style.display = "block"

    // Subir
 
subir.addEventListener('click', () => {
    let imagenHover = document.getElementById('video-hover')
    imagenHover.style.opacity = "0.5"
    imagenHover.style.display = "flex"
    fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, {
        method: "POST",
        body: form,
        json: true,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        localStorage.setItem(`CREAR${data.data.id}`, data.data.id)
        let estamos = document.getElementById('estamos')
        estamos.textContent = "GIFO subido con éxito."
        let loader = document.getElementById('loader')
        loader.id = "check"
        loader.setAttribute('src', '../assets/check.svg')
        let copyButton = document.createElement('img')
        let copyURL = document.createElement('a')
        copyURL.setAttribute('href', "https://media3.giphy.com/media/" + data.data.id + "/giphy.gif")
        copyButton.setAttribute('src', "../assets/icon-link-normal.svg")
        copyButton.style.position = "absolute"
        copyButton.style.top = "10px"
        copyButton.id = "crearCopy"
        copyButton.style.right = "100px"
        let downloadButton = document.createElement('img')
        downloadButton.setAttribute('src', "../assets/icon-download.svg")
        downloadButton.style.position = "absolute"
        downloadButton.style.cursor = "pointer"
        downloadButton.id = "crearDownload"
        downloadButton.style.top = "10px"
        downloadButton.style.right = "140px"
        videoContainer.appendChild(copyURL)
        copyURL.appendChild(copyButton)
        videoContainer.appendChild(downloadButton)

        downloadButton.addEventListener('click', () =>{
            fetch("https://media3.giphy.com/media/" + data.data.id + "/giphy.gif")
            .then(response => response.blob().then( giphy =>{
                saveURL = URL.createObjectURL(giphy)
                Object.assign( link = document.createElement('a'), { 
                    href: saveURL, 
                    download: "myGif.gif"
                }	)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            } 	)	)

        })

        copyButton.addEventListener('click', () =>{

        })
    })})

})

 

// Repetir 

repetir.addEventListener('click', () =>{
    n = 0;
    dos.style.backgroundColor = "#572EE5";
    dos.style.color = "white"   
    tres.style.backgroundColor = "white"
    tres.style.color = "#572EE5"
    subir.style.display = "none"
    repetir.style.display = "none"
    finalizar.style.display = "block"
    recorder.startRecording();
    var timer = document.getElementById('sw-time')
    timer.style.display = "block"
    window.setInterval(function(){
    if(n < 10){
    timer.innerHTML = "00:00:0" + n
    } else {
        timer.innerHTML = "00:00:" + n
    }
    n++;}, 1000);

})



});
// SLIDER

right.addEventListener('click', function(){
    fetch("https://api.giphy.com/v1/gifs/trending?api_key=xv6GpRhmfOnrLuxc4mqGQFxne2fvtdQ1")
    .then(response => response.json())
    .then(data => {
    let imagenes = document.getElementsByClassName('trendingGif')
    imagenes[0].setAttribute('src', "https://media3.giphy.com/media/" + data.data[aux].id + "/giphy.gif")
    imagenes[1].setAttribute('src', "https://media3.giphy.com/media/" + data.data[aux + 1].id + "/giphy.gif")
    imagenes[2].setAttribute('src', "https://media3.giphy.com/media/" + data.data[aux + 2].id + "/giphy.gif")
    aux++
})});

left.addEventListener('click', function(){
    fetch("https://api.giphy.com/v1/gifs/trending?api_key=xv6GpRhmfOnrLuxc4mqGQFxne2fvtdQ1")
    .then(response => response.json())
    .then(data => {
    let imagenes = document.getElementsByClassName('trendingGif')
    for(i = 0; i < imagenes.length; i++)
    imagenes[0].setAttribute('src', "https://media3.giphy.com/media/" + data.data[aux - 2].id + "/giphy.gif")
    imagenes[1].setAttribute('src', "https://media3.giphy.com/media/" + data.data[aux - 1 ].id + "/giphy.gif")
    imagenes[2].setAttribute('src', "https://media3.giphy.com/media/" + data.data[aux].id + "/giphy.gif")
    aux--
})});



