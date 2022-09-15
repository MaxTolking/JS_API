let url = new URL(window.location.href);
let page = url.searchParams.get('page');

let characters = [];
let episodes = {};

fetch('https://rickandmortyapi.com/api/character/?page=15')
    .then(result => result.json())
    .then(function(data) {
        let episodeIds = [];
        data.results.forEach(character => {
            characters.push(character);
            episodeIds.push(getIdFromUrl(character.episode[0]));
        });
        console.log([...new Set(episodeIds)].join(','));
        return fetch('https://rickandmortyapi.com/api/episode/' + [...new Set(episodeIds)].join(','));
    })
    .then(result => result.json())
    .then(function(data) {
        let characterHtml = '';
        data.forEach(episode => {
            episodes[episode.id] = episode
        })
        console.log(episodes)
        console.log(characters)

        characterHtml += '<div class="information__table">'
        characters.forEach(character => {
            characterHtml += '<div class="information__table-items">'
                characterHtml += '<div class="information__table-item-logo">'
                    characterHtml += '<img src="' + character.image + '">'
                characterHtml += '</div>'
                characterHtml += '<div class="information__table-item">'
                    characterHtml += '<div class="name"><a href="character.html?character_id='+ getIdFromUrl(character.url) +'"> '+ character.name +'</a>' + character.status + ' - ' + character.species + '</div>'
                    characterHtml += '<div class="location"> Last known location: <br> <a href="'+ character.location.url +'">' + character.location.name + '</a>' + '</div>'
                    characterHtml += '<div class="appearance"> First seen in: <a href="episode.html?episode_id='+ getIdFromUrl(character.episode[0]) +'">' + episodes[getIdFromUrl(character.episode[0])].name + '</a>' + '</div>'
                characterHtml += '</div>'
            characterHtml += '</div>'            
        });
        characterHtml += '</div>'

        let html = document.getElementById('characterHtml')
        html.insertAdjacentHTML('beforeend', characterHtml)
    })

function getIdFromUrl(url) {
    let n = url.lastIndexOf('/');
    return url.substring(n + 1);
}