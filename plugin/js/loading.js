let giphies = [
    'UPAJRWATdepFK',
    'PLw7s7Ezb50OY',
    '13SHVEhqEPfSXC',
    'hLBNOS9GOBCH6',
    '7DNcclBIsgUzC',
    '5AtHzs3lLbbWg',
    'VLHmZU5YQidm8'
];

function Loading () {
    let loadingDiv = document.createElement('div');
    let video = document.createElement('video');
    let source = document.createElement('source');
    source.src = `http://i.giphy.com/${giphies[getRandomInt(0, giphies.length - 1)]}.gif`;
    video.appendChild(source);
    loadingDiv.appendChild(video);
    loadingDiv.classList.add('loading');
    return loadingDiv;
}

// from https://gist.github.com/kerimdzhanov/7529623

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
