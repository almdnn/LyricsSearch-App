const form = document.querySelector('#form');
const search = document.querySelector('#search');
const result = document.querySelector('#result');
const more = document.querySelector('#more');

const apiURL = 'https://api.lyrics.ovh';

//Search songs or artists
async function searchSongs(term){
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
    console.log(data);

    showData(data);
    
};

//Show songs and artits in DOM
function showData(data){
    result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          song => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
        )
        .join('')}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
      ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
    `;
  } else {
    more.innerHTML = '';
  }

   
}

//Get prev and next songs
async function getMoreSongs(url){
    const res = await fetch(`https://cors.bridged.cc/${url}`);
    const data = await res.json();
  
    showData(data);

}

//Event Listeners
form.addEventListener('submit', e =>{
    e.preventDefault();
    const searchTerm = search.value.trim();
    
    if(!searchTerm){
        alert('You must enter song or artist!')
    } else {
        searchSongs(searchTerm);
    }
});