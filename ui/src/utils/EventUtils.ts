export default {
  keyboardEvent(event: KeyboardEvent, cb?: Function, element?: Vue) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (cb) {
        cb.bind(element);
        cb();
      }
    }
  },
};
