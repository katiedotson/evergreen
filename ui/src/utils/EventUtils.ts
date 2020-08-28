export default {
  keyboardEvent(event: KeyboardEvent, cb: Function, element: Vue) {
    if (event.keyCode === 13) {
      event.preventDefault();
      cb.bind(element);
      cb();
    }
  },
};
