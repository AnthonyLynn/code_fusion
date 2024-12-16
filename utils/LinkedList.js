export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(item) {
    let node = new Node(item);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    return node;
  }

  remove(node) {
    if (this.head === node) {
      this.head = node.next;
      return;
    }

    if (this.tail === node) {
      this.tail = node.prev;
      return;
    }

    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  getElements() {
    let array = [];
    let current = this.head;
    while (current) {
      array.push(current.item);
    }
    return array;
  }
}

class Node {
  constructor(item) {
    this.item = item;
    this.prev = null;
    this.next = null;
  }
}
