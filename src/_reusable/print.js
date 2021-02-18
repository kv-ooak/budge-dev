const timestamp = () => {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  return (
    `${now.toLocaleDateString('en-DE')} ${hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec} :`
  );
};

const print = ((console) => ({
  log: (text) => {
    console.log(timestamp(), text);
  },
  info: (text) => {
    console.info(timestamp(), text);
  },
  warn: (text) => {
    console.warn(timestamp(), text);
  },
  error: (text) => {
    console.error(timestamp(), text);
  },
}))(console);

export default print;
