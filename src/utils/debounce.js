const debounce = (fn, ms) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        timer = null;
        fn();
    },ms);
  };
};

export default debounce;