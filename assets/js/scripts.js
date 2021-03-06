/* Get elements */
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.list');
let items = JSON.parse(localStorage.getItem('items')) || [];
const clearAllBtn = document.querySelector('#clear');

/* Functions */
function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(items = [], itemsList) {
    itemsList.innerHTML = items.map((item, i) => {
        return `
        <li class="item">
          <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''} />
          <label for="item${i}" class="item-text">${item.text}</label>
        </li>
      `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;

    const el = e.target;

    const index = el.dataset.index;

    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
    console.log(e.target.dataset);
}

function clearAll() {
    itemsList.innerHTML = '';
    localStorage.removeItem('items');
    items = [];
}

/* Hook up listeners */
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
clearAllBtn.addEventListener('click', clearAll);

populateList(items, itemsList);
