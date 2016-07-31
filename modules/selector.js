export default function Selector (whitelist, blacklist) {
    return whitelist.map(white => `${white},
${white} > *${blacklist.map(black => `:not(${black})`).join('')},
${white} *${blacklist.map(black => `:not(${black})`).join('')} *`).join(', ');
}
