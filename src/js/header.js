
/*
* 头部模块
* */
export default  function () {
  const liNodes = document.querySelectorAll('.nav li');
  const arrows = document.querySelector('.arrows');
  const ulNode = document.querySelector('#content>ul');
  const contentNode = document.querySelector('#content');


//  滚动条
  document.onmousewheel = wheel;
  document.addEventListener('DOMMouseScroll',wheel)

let whellTimer = null;
//  缓存高度
let contentHeight = contentNode.offsetHeight;
//  代表li下标
let nowIndex = 0;
  function wheel(event) {
    event = event || window.event;
    //清除定时器
    clearTimeout(whellTimer);
    whellTimer = setTimeout(() => {
      let flag = '';
      if (event.wheelDelta) {
        //ie/chrome
        if (event.wheelDelta > 0) {
          flag = 'up';
        } else {
          flag = 'down'
        }
      } else if (event.detail) {
        //firefox
        if (event.detail < 0) {
          flag = 'up';
        } else {
          flag = 'down'
        }
      }

      switch (flag) {
        case 'up' :
          if(nowIndex>0){
            nowIndex -- ;
            move(nowIndex);
          }
          break;
        case 'down' :
          if(nowIndex<4){
            nowIndex++;
            move(nowIndex);
          }
          break;
      }

    },200);


    //禁止默认行为
    event.preventDefault && event.preventDefault();
    return false;
  }

  //封装函数
  function move(nowIndex) {
    for (var j = 0; j < liNodes.length; j++) {
      liNodes[j].className = '';
    }
    liNodes[nowIndex].className = 'active';
    arrows.style.left = liNodes[nowIndex].getBoundingClientRect().left + liNodes[nowIndex].offsetWidth/2 - arrows.offsetWidth/2+'px';
    ulNode.style.top = - nowIndex * contentHeight + 'px';
  }

  //绑定事件，导航
  for (let i = 0; i <liNodes.length; i++) {
    liNodes[i].onclick = function () {
      //同步
      nowIndex = i;
      move(i)
    };
    //开始让小箭头到第一个li下面
    arrows.style.left = liNodes[0].getBoundingClientRect().left + liNodes[0].offsetWidth/2 - arrows.offsetWidth/2+'px';

    //  绑定窗口事件
    window.onresize = function () {
      //重置小箭头的位置
      arrows.style.left = liNodes[nowIndex].getBoundingClientRect().left + liNodes[nowIndex].offsetWidth/2 - arrows.offsetWidth/2+'px';
      //重置ul的位置
      contentHeight = contentNode.offsetHeight;
      ulNode.style.top = - nowIndex * contentHeight + 'px';
    }
  }











}