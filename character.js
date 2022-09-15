let url = new URL(window.location.href);
let characterId = url.searchParams.get('character_id');

let character = {};

if(characterId) {
    fetch('https://rickandmortyapi.com/api/character/' + characterId)
    .then(result => result.json())
    .then(data => {
        characterHtml = ''
        character = data;

        return fetch(data.episode[0]);
    })
    .then(result => result.json())
    .then(episode => {
        characterHtml += '<div class="information__table">';
        characterHtml += '<div class="information__table-items">'
                characterHtml += '<div class="information__table-item-logo">'
                    characterHtml += '<img src="' + character.image + '">'
                characterHtml += '</div>'
                characterHtml += '<div class="information__table-item">'
                    characterHtml += '<div class="name"><a href="character.html?character_id='+ getIdFromUrl(character.url) +'"> '+ character.name +'</a>' + character.status + ' - ' + character.species + '</div>'
                    characterHtml += '<div class="location"> Last known location: <br> <a href="'+ character.location.url +'">' + character.location.name + '</a>' + '</div>'
                    characterHtml += '<div class="appearance"> First seen in: <a href="episode.html?episode_id='+ getIdFromUrl(character.episode[0]) +'">' + episode.name + '</a>' + '</div>'
                characterHtml += '</div>'
            characterHtml += '</div>'
        characterHtml += '</div>'

        let html = document.getElementById('characterHtml')
        html.insertAdjacentHTML('beforeend', characterHtml)
    })


    function getIdFromUrl(url) {
        let n = url.lastIndexOf('/');
        return url.substring(n + 1);
    }
}
