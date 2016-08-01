// whitelist and blacklist is an array of CSS selectors
// returns selector string
export default function Selector (whitelist, blacklist) {
    let not = blacklist.map(black => `:not(${black})`).join('');
    return whitelist.map(white => {
        return `${white},
        ${white} > *${not},
        ${white} *${not} *${not}`;
    }).join(',\n');
}
