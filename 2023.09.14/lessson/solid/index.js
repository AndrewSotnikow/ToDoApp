// SOLID

// Single Responsibility
fetch('https://google.com').then((response) => response.json()).then((result) => console.log(result));

// Open-Closed Principle

// Liskov
// Animal -> Dog
// Button -> ToggleButton -> PlayPauseButton

// I Interfese segregation
interface Seriazeible {
  toString() {}
}
interface Iterable {
  next() {}
}

interface SerIter {
  toString() {}
  next() {}
}
class MyArray extends SerIter

const myArray = new MyArray();
String(myArray); // '{}'
[...myArray] // [1,2,3]

class MyObject extends SerIter {}

// D Depency Inversion
// DI Dependency Injection
const num2 = 3;


function sum(num) {
  return num + num2;
}

// react
import { useGoogleAds } from './hook';

const Button = (props) => {
  const analytics = useGoogleAds();

  return (
    <button
      onClick={(e) => {
        props.onClick?.(e);
        analytics('clicked!');
      }}
    >
      Button
    </button>
  );
};

// <Provider useGoogleAds>  (string) => {};



