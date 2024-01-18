
// and this is how react render function works 
function customElement(reactElement, container) {
    const elem = document.createElement(reactElement.type);

    // and we try to make it more dynamic for number of attributes
    // so we will add a loop here

    for (const prop in reactElement.attrs) {
        elem.setAttribute(prop, reactElement.attrs[prop]);
    }
    
    elem.innerHTML = reactElement.text;

    container.appendChild(elem);
}


// ! -- this is how react create a tree object from any html tag passed in behind the scenes
// ! -- these are all terminology, this not the exact proprties react creates
const reactElement = {
    type: 'a', // first property is tag name 
    attrs: {
        href: 'http://google.com',
        target: '_blank'
    },
    text: 'Hello this is custom react element'
}

const reactContainer = document.querySelector('#root');

customElement(reactElement, reactContainer)