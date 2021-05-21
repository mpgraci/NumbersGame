const fills = document.querySelectorAll('.fill');
const empties = document.querySelectorAll('.empty');

// Fill listeners
for(const fill of fills){
    fill.addEventListener('dragstart', dragStart);
    fill.addEventListener('dragend', dragEnd);
}

// Loop through empty boxes and add listeners
for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
};

// Drag Functions
function dragStart(e) {
    this.className += ' hold';
    setTimeout(() => {this.className = 'invisible'}, 0);
    e.dataTransfer.setData('text', e.target.id);
};
function dragEnd() {
    this.className = 'fill';
};
function dragOver(e) {
    e.preventDefault();
};
function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
};
function dragLeave() {
    this.className = 'empty';
};
function dragDrop(e) {
    this.className = 'empty';
    let id = e.dataTransfer.getData('text');
    console.log(id)
    this.append(document.getElementById(id));
};