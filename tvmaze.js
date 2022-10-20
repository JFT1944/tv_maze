/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
let newData = await axios.get(`http://api.tvmaze.com/search/shows?q=<${query}>`).then((res)=>{
// //console.log(res)
return res
})
  // searchShows()
return newData.data
// return [
  //   {
  //     id: 1767,
  //     name: "The Bletchley Circle",
  //     summary: "<p><b>The Bletchley Circle</b> follows the journey of four ordinary women with extraordinary skills that helped to end World War II.</p><p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their normal lives, modestly setting aside the part they played in producing crucial intelligence, which helped the Allies to victory and shortened the war. When Susan discovers a hidden code behind an unsolved murder she is met by skepticism from the police. She quickly realises she can only begin to crack the murders and bring the culprit to justice with her former friends.</p>",
  //     image: "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
  //   }
  // ]
}
// searchShows('girls')


/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();
  let eps = []
//console.log(shows)
  try {for (let show of shows) {
    console.log(show.show.id)
    getEpisodes(show.show.id).then((res)=>{
      console.log(res)
   
    
      let newDiv = document.createElement('div');
      newDiv.setAttribute('id', 'littleDivs')
      let newImg = document.createElement('img');
      let newH2 = document.createElement('h2');
      let newP = document.createElement('p');
      let newUl = document.createElement('ul')
      for (let r of res){
        let newLi = document.createElement('li')
        newLi.innerText = r
        newUl.append(newLi)
      }
      
      newH2.innerText = `${show.show.name}`;
      newP.innerHTML = `${show.show.summary}`;
      newImg.setAttribute('src', `${show.show.image.medium}`)
      newDiv.append(newH2);
      newDiv.append(newP)
      newDiv.append(newImg)
      newDiv.append(newUl)
  
  
      // for (let ep of newEpisodes){
      //   console.log(ep)
      //   newDiv.append(ep)
      // }
  
      $showsList.append(newDiv)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    })
    //console.log(show.show.name)
    //console.log(show.show.summary)
    //console.log(show.show.image.medium)
    // let newEpisodes = getEpisodes(show.show.id).then((res)=>{
    //   console.log(res)
    //   for (let x of res){
    //     eps.push(res)
    //     console.log(eps)
    //   }
    //   return res
    // })
// console.log(newEpisodes)
// console.log(eps)
//     console.log(newEpisodes.then((res)=>{
// console.log(res)
// return res
//     }))
   

    // let item = $(
      // `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
      //    <div class="card" data-show-id="${show.id}">
      //      <div class="card-body">
      //        <h5 class="card-title">${show.show.name}</h5>
      //        <p class="card-text">${show.show.summary}</p>
      //      </div>
      //    </div>
      //  </div>
      // `);} 

    // $showsList.append(item);
  }}catch(error){
    console.log(error)
  }}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  //console.log(query)
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);
 console.log(shows)
  populateShows(shows);


});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  let episodesArray = []
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
let episodes = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`).then((res)=>{
//console.log(res.data)
for(let x of res.data){
  // console.log(x)
  episodesArray.push(x.name)
}
})
// console.log(episodesArray)

return episodesArray
  // TODO: return array-of-episode-info, as described in docstring above
}

