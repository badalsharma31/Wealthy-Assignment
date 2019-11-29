module.exports = {
  getScreenHeight(){
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  },
  getScreenWidth(){
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  },
}