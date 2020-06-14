const songList = require('./taikoRedSP.json')

function getSongs() {
    let songs = []
    for (const song of songList) {
        const category = song.category
        const name = song.name
        const level = song.level.oni
        songs.push({ category: category, name: name, level: level })
    }
    return songs
}

module.exports = getSongs