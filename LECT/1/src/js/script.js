import { a, b, someFunction } from './values.js'; //деструктуризация

export default () => {
    someFunction();
    console.log(a.value + b.value);
}


// export default  function () {
//     console.log('Hello User');
//     console.log(a.value + b.value);
// }

// function hello () {
//     console.log('Hello User');
//     console.log(a.value + b.value);
// }

// export default hello