
/*
* 头部模块
* */
export default  function () {
  const liNodes = document.querySelectorAll('.nav li');
  const arrows = document.querySelector('.arrows');


  for (let i = 0; i <liNodes.length; i++) {
    liNodes[i].onclick = function () {
      for (var j = 0; j < liNodes.length; j++) {
        liNodes[j].className = '';
      }
      this.className = 'active';
      arrows.style.left = liNodes[i].getBoundingClientRect().left + liNodes[i].offsetWidth/2 - arrows.offsetWidth/2+'px';
    };
    arrows.style.left = liNodes[0].getBoundingClientRect().left + liNodes[0].offsetWidth/2 - arrows.offsetWidth/2+'px';
  }



}