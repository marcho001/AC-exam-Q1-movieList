(function(){
  const dataPanel = document.querySelector('#data-panel')
  const movieList = document.querySelector('#movie-list')
  const data = []
  const list ={
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
}


  axios
  .get('https://movie-list.alphacamp.io/api/v1/movies')
  .then(res =>{
    
    data.push(...res.data.results)
    console.log(data[0])
    displayData(data)  
    displayList()  

  })

  movieList.addEventListener('click',a)

  function a(e){
    console.log(e.target.dataset.id)
    const list = document.querySelectorAll('.list-group-item')

    list.forEach(item => item.classList.remove('active'))

    if (e.target.matches('.list-group-item')) {
      e.target.classList.add('active')
    }

    let filter = data.filter(item => {
      return item.genres.includes(Number(e.target.dataset.id))
    })

    displayData(filter)

  }

  function displayData(data){
    
    let cardContent = ''
    
    data.forEach(item =>{
      cardContent +=` 
      <div class="col m-1">     
        <div class="card" >
          <img src="https://movie-list.alphacamp.io/posters/${item.image}" class="card-img-top mt-1" alt="...">
          <div class="card-body">
           <h5 class="card-title">${item.title}</h5>
           <p id="movie-type" class="card-text row">
           ${getType(item.genres)}</p>
            
          </div>
        </div>
      </div>
      `
    })    
    dataPanel.innerHTML = cardContent
  }

  // displayList
  function displayList(){
    let i = 1
    let listContent = ''

    for (item in list) {
      listContent += `
        <a href="#" class="list-group-item list-group-item-action" data-id=${i}>${list[item]}</a>
      `
      i++
    }
    movieList.innerHTML = listContent
  }
  // get movie type
  function getType(arr){
    
    let htmlContent = ''

    const a = arr.forEach(item=>{
      htmlContent +=`
      <span class="m-1 p-1 rounded" style="background-color:#00ffff; opacity:0.3; ">${list[item.toString()]}</span>
      `     
    })
    return htmlContent
  }
})()

