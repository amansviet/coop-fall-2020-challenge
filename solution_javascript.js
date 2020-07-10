class EventSourcer {
  constructor() {
    this.value = 0;
    this.stackOfValues = [];
    this.top = 0;
    this.redoPossible = false;
    this.valueBeforeUndo = 0;
    this.stackOfValues.push(0);
  }

  add(num) {
    this.value += num;
    // push the new value to top of the stack
    this.push(this.value);
    this.redoPossible = true;
    this.value = this.peek();
  }

  subtract(num) {
    this.value -= num;
    // push the new value to top of the stack
    this.push(this.value);
    this.redoPossible = true;
    this.value = this.peek();
  }

  undo() {
    // Allow undo only if the stack is not empty
    if(!this.isEmpty()){
      this.valueThatWasUndo = this.peek();
      this.pop();
      this.value = this.peek();
      this.redoPossible = true;
    }
  }

  redo() {
    // allow redo only after alteast one operation has changed the value
    if(this.redoPossible) {
      this.push(this.valueThatWasUndo);
      this.value = this.peek();
      this.redoPossible = false;
    }
  }

  bulk_undo(num) {
    for (var i = 0; i < num; i++) {
      this.undo();
    }

  }

  bulk_redo(num) {
    for (var i = 0; i < num; i++) {
      this.redo();
      this.redoPossible = true;
    }
    this.redoPossible = false;

  }

  push(element) {
    this.stackOfValues[this.top] = element;
    this.top = this.top + 1;
  }

  length() {
    return this.top;
  }

  peek() {
    return this.stackOfValues[this.top-1];
  }

  isEmpty() {
    if (this.top === 0) {
      // setting to initial value of 0 when all undo/redo are left with no more actions
      this.value = 0;
      return true;
    }
    return false;
  }

  pop() {
    if( this.isEmpty() === false ) {
      this.top = this.top -1;
      return this.stackOfValues.pop(); // removes the last element
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
