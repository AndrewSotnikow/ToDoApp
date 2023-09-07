function getNumbersFromArray (value: string){
  const numbers:string[] = value.split('').filter(item => typeof +item === 'number')
  return numbers.map(item => +item)
}

export default getNumbersFromArray

console.log(getNumbersFromArray('dasd123dsad')); // 'dasd123dsad' -> 123


// func(string): number
// getNumberFromString, extractNumberFromString

// string -> number
// string -> number -> string -> number
// string -> numbers

function getNumberFromString (str: string): number | null {
  // if (typeof str === 'number') {
  //   return str;
  // }
  //
  // if (typeof str !== 'string') {
  //   return null;
  // }

  const result = Number(str
    .split('')
    .filter(symbol => "0123456789".includes(symbol))
    .join('') || 's');

  return isNaN ? null : result
}
