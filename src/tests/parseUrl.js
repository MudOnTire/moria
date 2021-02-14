function parseLink(link, data) {
  if (!link) return '';
  let parsed = '';
  let cursor = 0;
  while (cursor < link.length) {
    const char = link[cursor];
    if (char === ':') {
      if (cursor > 0 && link[cursor - 1] === '/') {
        const match = link.slice(cursor + 1).match(/[^\/\?]*/);
        if (match) {
          const param = match[0];
          const value = data[param] || '';
          parsed += value;
          cursor += param.length;
        }
      } else {
        parsed += char;
      }
    } else if (char === '{') {
      const match = link.slice(cursor + 1).match(/[^}]*/);
      if (match) {
        const param = match[0];
        const value = data[param] || '';
        parsed += value;
        cursor += param.length;
      }
    } else if (char === '}') {

    } else {
      parsed += char;
    }
    cursor++;
  }
  console.log('parsed', parsed);
}

const link = '/user-detail/:id/:name?age={age}&gender={gender}';
const data = { id: '123456', name: 'bruce_zhang', age: 30, gender: 'male' }

parseLink(link, data);