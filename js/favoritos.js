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
let favCtn = document.getElementById('sinFavoritos')
let favIcons = [];
let favArray = [];
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

// Fetch FAVORITOS

keys = Object.keys(localStorage)

keys.forEach(element => {
    if(element.includes("ID")){
        favArray.push(element)
    }
});

if(favArray.length === 0){
    resultados.style.display = "none"
    favCtn.style.display = "block"
} else {
    resultados.style.display = "flex"
    favCtn.style.display = "none"
}

favArray.forEach(element => {
    if(element.includes("ID")){

    theElement = localStorage.getItem(element)
    fetch(`https://api.giphy.com/v1/gifs/${theElement}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        AddtoDOM(data.data, resultados, "favouritesGif")
    })
}});

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

