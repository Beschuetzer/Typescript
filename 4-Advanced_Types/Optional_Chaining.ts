//using '?' when trying to access properties you aren't sure exist

// document.querySelector('#unknownELement')?.textContent?.match(/id/i)

// '??' means null or undefined
const unknownThing = null;
// const unknownThing = 'unknownThing not null or undefined'

//instead of using '||', which will handle '' (empty strings) and 0 the same as null and undefined, you can use '??' which just means 'null || undefined'
const nullishCoalescing = unknownThing ?? 'unKnownThing is null or undefined'

console.log('nullishCoalescing =', nullishCoalescing);