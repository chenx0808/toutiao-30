export function getLocal(key) {
  let data = localStorage.getItem(key);

  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log(e);
  }
  return data;
}

export function setLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
