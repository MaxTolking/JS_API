let page = getParameterFromUrl(window.location.href, 'page');

let characters = [];
let episodes = {};
let infos = {};

fetch('https://rickandmortyapi.com/api/character/?page=' + (page ? page: '1'))    
    .then(result => result.json())
    .then(function(data) {
        infos = data.info;
        console.log(data)
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
        characterHtml += '<div class="navigation">'
            if (getParameterFromUrl(infos.prev, 'page')) {
                characterHtml += '<a href="/?page='+ getParameterFromUrl(infos.prev, 'page') + '" class="prevPage">Prev</a>'
            }
            if (getParameterFromUrl(infos.next, 'page')) {
                characterHtml += '<a href="/?page='+ getParameterFromUrl(infos.next, 'page') + '" class="nextPage">Next</a>'
            }
        characterHtml += '</div>'  


        let html = document.getElementById('characterHtml')
        html.insertAdjacentHTML('beforeend', characterHtml)
    })

function getIdFromUrl(url) {
    let n = url.lastIndexOf('/');
    return url.substring(n + 1);
}

function getParameterFromUrl(location, param) {
    if (!location) {
        return false;
    }
    let url = new URL(location);
    return url.searchParams.get(param);
}

