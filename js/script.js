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
let gifMax = document.getElementById('ampliarGif')
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
    if (localStorage.getItem(`ID${data.id}`) === null) {
        fav.setAttribute ("src", "../assets/icon-fav.svg")

    } else {
        fav.setAttribute ("src", "../assets/icon-fav-active.svg")
        fav.style.width = "32px"
        fav.style.height = "32px"
    }
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
        maxGif(data.id, data.user, data.title, aux4)

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

// Agrandar Gif 

function maxGif(gifId, gifUser, gifTitle, aux4){

fav = document.createElement('img')
fav.className = "favorito"
fav.id = `favorito${aux4}`
if (localStorage.getItem(`ID${gifId}`) === null) {
    fav.setAttribute ("src", "../assets/icon-fav.svg")

} else {
    fav.setAttribute ("src", "../assets/icon-fav-active.svg")
    fav.style.width = "32px"
    fav.style.height = "32px"
}
closeMax = document.createElement('img')
closeMax.setAttribute('src', "../assets/close.svg")
closeMax.style.marginBottom = "20px"
closeMax.style.marginLeft = "675px"
closeMax.style.cursor = "pointer"
newDownload = document.createElement('img')
newDownload.className = "descarga"
newDownload.setAttribute("src", "../assets/icon-download.svg")
newDownload.style.border = "1px solid #9CAFC3"
newDownload.style.borderRadius = "6px"
newDownload.style.marginLeft = "15px"
newDownload.style.cursor = "pointer"
let featuresDiv = document.createElement('div')
let maxDiv = document.createElement('div')
let titlesDiv = document.createElement('div')
maxDiv.style.display = "flex"
maxDiv.style.width = "695px"
maxDiv.style.flexFlow = "row-reverse"
maxDiv.style.justifyContent = "space-between"
gifMax.style.display = "flex"
gifMax.style.alignItems = "center"
gifMax.style.justifyContent = "center"
gifMax.style.height = "100%"
gifMax.style.width = "100%"
gifMax.style.position = "fixed"
gifMax.style.top = "1px"
gifMax.style.zIndex = "2"
gifMax.style.flexDirection = "column"
gifMax.style.backgroundColor = "white"
let maxImg = document.createElement('img')
maxImg.style.width = "695px"
maxImg.style.height = "385px"
maxImg.setAttribute('src', "https://media3.giphy.com/media/" + gifId + "/giphy.gif")
maxImg.style.marginBottom = "10px"
let userTitle = document.createElement('h3')
userTitle.style.fontSize = "15px"
userTitle.style.color = "black"
userTitle.style.width = "31px"
userTitle.style.height = "18px"
userTitle.style.marginBottom = "10px"
userTitle.style.textAlign = "center"
userTitle.style.fontFamily = 'Roboto, sans-serif'
if (gifUser === undefined){
    userTitle.innerHTML = "User"
    } else {
    userTitle.innerHTML = gifUser.username
    }
let gifTitulo = document.createElement('h3')
gifTitulo.style.fontSize = "16px"
gifTitulo.style.textAlign = "center"
gifTitulo.style.color = "black"
gifTitulo.style.fontFamily = 'Roboto, sans-serif'
gifTitulo.style.height = "19px"
gifTitulo.style.zIndex = "2"
gifTitulo.textContent = gifTitle
fav.style.border = "1px solid #9CAFC3"
fav.style.borderRadius = "6px"
fav.style.cursor = "pointer"
gifMax.appendChild(closeMax)
gifMax.appendChild(maxImg)
gifMax.appendChild(maxDiv)
maxDiv.appendChild(featuresDiv)
maxDiv.appendChild(titlesDiv)
titlesDiv.appendChild(userTitle)
titlesDiv.appendChild(gifTitulo)
featuresDiv.appendChild(fav)
featuresDiv.appendChild(newDownload)

newDownload.addEventListener('click', () => {
    fetch("https://media3.giphy.com/media/" + gifId + "/giphy.gif")
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

let favy = document.getElementById(`favorito${aux4}`)
favy.addEventListener('click', () => {
    if(favy.src.includes("icon-fav.svg")){
    localStorage.setItem(`ID${gifId}`, `${gifId}`)
    favy.setAttribute('src', "../assets/icon-fav-active.svg")
    favy.style.width = "32px";
    favy.style.height = "32px"
    } else {
        favy.setAttribute("src", "../assets/icon-fav.svg")
        localStorage.removeItem(`ID${gifId}`, `${gifId}`)
    }
})
closeMax.addEventListener('click', () => {
gifMax.innerHTML = ""
gifMax.style.display = "none"
})

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



// Fetch BUSCAR

function fetchSearch(i, word){
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=xv6GpRhmfOnrLuxc4mqGQFxne2fvtdQ1&q=${word}&limit=50&offset=0&rating=g&lang=en`)
    .then(response => response.json())
    .then(data => {
        if(data.data.length == 0){
        noResults.style.display = "flex"
        verMas.style.display = "none"
        } else {
        AddtoDOM(data.data[i], resultados, "searchGif")
        noResults.style.display = "none"
        }
    })};

// <--------------------------------------- EVENT LISTENERS --------------------------------------->

// DARK THEME

buttonDark.addEventListener('click', () =>{
    body[0].classList.toggle('dark')
}
);

// BORRAR TEXTO

iconClose.addEventListener('click', () => {
    input.value = ""
    lupa.style.display = "block"
    lupa.style.right = "20px"
    lupa.style.left = "unset"
    iconClose.style.display = "none"
    suggestions.style.display = "none"
    inputContainer.style.height = '52px'
    input.style.borderBottom = 'none'
})

// BUSCAR SUGERENCIAS

input.addEventListener('keydown', () => {
    let term = input.value
    fetch(`https://api.giphy.com/v1/tags/related/${term}?api_key=xv6GpRhmfOnrLuxc4mqGQFxne2fvtdQ1`)
    .then(response => response.json())
    .then(data => {
        if(input.value == "" || input.value.length <= 2){
            suggestions.style.display = "none"
            inputContainer.style.height = '52px'
            input.style.borderBottom = 'none'
            iconClose.style.display = "none"
            lupa.style.right = "20px"
            lupa.style.left = "unset"
        } else {
        suggestions.style.display = "block"
        inputContainer.style.height = '360px'
        input.style.borderBottom = '1px solid #9CAFC3'
        iconClose.style.display = "block"
        lupa.style.display = "block"
        lupa.style.left = "20px"
        }
        let terms = data.data
        suggestions.innerHTML = " "
        terms.forEach(element => {
            let divSugerencia = document.createElement('div')
            let text = document.createElement('p')
            let imgLupa = document.createElement('img')
            imgLupa.setAttribute('src', '../assets/icon-search.svg')
            imgLupa.classList = "lupaSearch"
            divSugerencia.classList = "div-sugerencia"
            divSugerencia.style.display = "flex"
            divSugerencia.style.cursor = "pointer"
            text.className = "listItemP"
            text.innerHTML = element.name
            suggestions.appendChild(divSugerencia);
            divSugerencia.appendChild(imgLupa)
            divSugerencia.appendChild(text)
        });
        let sugerencias = document.getElementsByClassName('div-sugerencia')
        for(let i = 0; i < sugerencias.length; i++){
            sugerencias[i].addEventListener('click', () => {
                input.value = sugerencias[i].innerText
                suggestions.style.display = "none"
                inputContainer.style.height = '52px'
                input.style.borderBottom = 'none'
                iconClose.style.display = "none"
                lupa.style.right = "20px"
                lupa.style.left = "unset"
                verMas.style.display = "block"
                resultados.style.display = "flex" 
                resultados.innerHTML = " "
                word = input.value
                h1Border.style.display = "block"
                h1Title.innerHTML = "";
                h1Title.innerHTML = input.value
                for (let i = 0; i < 12; i++){
                    fetchSearch(i, word);
                }

            })
        }
    })
});


// BUSCAR GIF

lupa.addEventListener('click', (word) => {
    h1Title.style.display = "block"
    suggestions.style.display = "none"
    inputContainer.style.height = '52px'
    input.style.borderBottom = 'none'
    iconClose.style.display = "none"
    verMas.style.display = "block"
    resultados.style.display = "flex"
    resultados.innerHTML = " "
    word = input.value
    h1Border.style.display = "block"
    h1Title.innerHTML = "";
    h1Title.innerHTML = input.value
    for (let i = 0; i < 12; i++){
        fetchSearch(i, word);
    }
    
})

input.addEventListener('keydown', (event => {
    if (event.which === 13 || event.keyCode === 13){
        h1Title.style.display = "block"
        suggestions.style.display = "none"
        inputContainer.style.height = '52px'
        input.style.borderBottom = 'none'
        iconClose.style.display = "none"
        verMas.style.display = "block"
        resultados.style.display = "flex"
        resultados.innerHTML = " "
        word = input.value
        h1Border.style.display = "block"
        h1Title.innerHTML = "";
        h1Title.innerHTML = input.value
        for (let i = 0; i < 12; i++){
            fetchSearch(i, word);
        }
    }}));

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

// VER MAS

verMas.addEventListener('click', () => {
    for(aux2; aux2 < aux3; aux2++){
    fetchSearch(aux2, input.value)
    }
    aux3 += 12
    gifCheckOut()
});

function gifCheckOut(){
    if (aux3 >= 72) {
        verMas.style.display = "none"
        aux2 = 12;
        aux3 = 24;
    } 
}
