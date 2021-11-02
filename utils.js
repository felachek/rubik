export function getArrayRandomElement(arr) {
    if (arr && arr.length) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
}