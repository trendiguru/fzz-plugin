export default function Selector (whitelist, blacklist) {
    return whitelist.map(white => {
        return `${white},
        ${white} > *${blacklist.map(black => `:not(${black})`).join('')},
        ${white} *${blacklist.map(black => `:not(${black})`).join('')} *`;
    }).join(', ');
}
