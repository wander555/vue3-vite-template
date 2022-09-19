const formatdate = (time) => {
  let date = new Date(time);
  let y = date.getFullYear();
  let m =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let second = date.getMinutes();
  return y + "-" + m + "-" + d + " " + h + ":" + min + ":" + second;
};

export default formatdate;
