
import firstView from './firstView';
/*
* 头部模块
* */
export default  function () {
  const liNodes = document.querySelectorAll('.nav li');
  const arrows = document.querySelector('.arrows');
  const ulNode = document.querySelector('#content>ul');
  const contentNode = document.querySelector('#content');
  const navLiNodes = document.querySelectorAll('.content-nav li');
  const music =document.querySelector('.header-min .music');
  const audio = document.querySelector('.music audio');


  //出入场动画DOM
  const homeCarousel = document.querySelector('.home-carousel');
  const coursePlane1 = document.querySelector('.course .course-plane1');
  const coursePlane2 = document.querySelector('.course .course-plane2');
  const coursePlane3 = document.querySelector('.course .course-plane3');
  const workPencel1 = document.querySelector('.work .work-pencel1');
  const workPencel2 = document.querySelector('.work .work-pencel2');
  const workPencel3 = document.querySelector('.work .work-pencel3');
  const aboutOne = document.querySelectorAll('.about .about-one');
  const h2 = document.querySelector('.team h2');
  const commonText = document.querySelector('.team .common-text');

//开机动画
  const maskNode =document.querySelector('#mask');
  const maskTop =document.querySelector('#mask .mask-top');
  const maskBottom =document.querySelector('#mask .mask-bottom');
  const maskMiddle =document.querySelector('#mask .mask-middle');

  let imgNum = 0;
  const imagesArr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png',/*'greenLine.png'*/]

  imagesArr.forEach((item,index) => {
    const img = new Image();
    img.onload = function () {
      imgNum++;
      maskMiddle.style.width = imgNum/imagesArr.length*100+'%'
      if(imgNum === imagesArr.length){
        maskTop.style.height = 0;
        maskBottom.style.height = 0;
        maskMiddle.style.display = 'none';
      //  绑定过度结束事件
        maskBottom.addEventListener('transitionend',function () {
          //  给第一屏加入入场动画
          animationArr[0].anIn();
          //  删除遮罩层
          maskNode.remove();
          //自动轮播
          firstView();
        })

      }
    }
  //  给每一个img加src
    img.src = `./images/${item}`;
  });





//  滚动条
  document.onmousewheel = wheel;
  document.addEventListener('DOMMouseScroll',wheel);

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

  //上一个索引
  let lastIndex = 0;
  //封装函数
  function move(nowIndex) {
    for (let j = 0; j < liNodes.length; j++) {
      liNodes[j].className = '';
      navLiNodes[j].className='';
    }
    liNodes[nowIndex].className = 'active';
    navLiNodes[nowIndex].className='active';
    arrows.style.left = liNodes[nowIndex].getBoundingClientRect().left + liNodes[nowIndex].offsetWidth/2 - arrows.offsetWidth/2+'px';
    ulNode.style.top = - nowIndex * contentHeight + 'px';
    animationArr[lastIndex].anOut();
    animationArr[nowIndex].anIn();
    lastIndex = nowIndex
  }
  //绑定事件，导航
  for (let i = 0; i <liNodes.length; i++) {
    liNodes[i].onclick = function () {
      //同步
      nowIndex = i;
      move(i);
    };
    navLiNodes[i].onclick=function () {
      nowIndex = i;
      move(i);
    }
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
  //音频事件
  music.onclick = function () {
    if(audio.paused){
    //  播放
      audio.play();
      this.style.backgroundImage = 'url("data:image/gif;base64,R0lGODlhDgAOAIABAAB8Z////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI4M0ZGM0UzNEU5NjExRTg5Nzc2QzhCNDhDNTcxM0VBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI4M0ZGM0U0NEU5NjExRTg5Nzc2QzhCNDhDNTcxM0VBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjgzRkYzRTE0RTk2MTFFODk3NzZDOEI0OEM1NzEzRUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjgzRkYzRTI0RTk2MTFFODk3NzZDOEI0OEM1NzEzRUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJKAABACwAAAAADgAOAAACHoyPqasAjBw8ksm67rMPB6x9nTOKJlmG6JmSLKu2BQAh+QQJKAABACwAAAAADgAOAAACHoyPqcvtCMCKhyobKM7S6O6BHyRKY3Saaspx7PeqBQAh+QQFKAABACwAAAAADgAOAAACHYyPqcvtDxUAcC5rcKZaBwtO3PiNYYmK5KmmK1AAADs=")';
    }else{
      audio.pause();
      this.style.backgroundImage = 'url("data:image/gif;base64,R0lGODlhDgAOAJEAAAAAAP///wB8Z////yH5BAEAAAMALAAAAAAOAA4AAAIenI+pqyKMHDySybrusw8PrH2dM4omWYbomZIsq7YFADs=")';
    }
  }

//  出入场动画效果
  const animationArr = [
    {
      anIn(){
        homeCarousel.style.transform = 'translateY(0)';
        homeCarousel.style.opacity = '1';
      },
      anOut(){
        homeCarousel.style.transform = 'translateY(-200px)';
        homeCarousel.style.opacity = '0.2';
      }
    },
    {
      anIn(){
        coursePlane1.style.transform = 'translate(0)';
        coursePlane2.style.transform = 'translate(0)';
        coursePlane3.style.transform = 'translate(0)';
      },
      anOut(){
        coursePlane1.style.transform = 'translate(-200px,-200px)';
        coursePlane2.style.transform = 'translate(-200px,200px)';
        coursePlane3.style.transform = 'translate(200px,-200px)';
      }
    },
    {
      anIn(){
        workPencel1.style.transform = 'translateY(0)';
        workPencel2.style.transform = 'translateY(0)';
        workPencel3.style.transform = 'translateY(0)'
      },
      anOut(){
        workPencel1.style.transform = 'translateY(-150px)';
        workPencel2.style.transform = 'translateY(150px)';
        workPencel3.style.transform = 'translateY(150px)';
      }
    },
    {
      anIn(){
        aboutOne[0].style.transform = 'rotate(0)'
        aboutOne[1].style.transform = 'rotate(0)'
      },
      anOut(){
        aboutOne[0].style.transform = 'rotate(30deg)'
        aboutOne[1].style.transform = 'rotate(-30deg)'
      }
    },
    {
      anIn(){
        h2.style.transform = 'translateX(0)';
        commonText.style.transform = 'translateX(0)';
      },
      anOut(){
        h2.style.transform = 'translateX(-150px)';
        commonText.style.transform = 'translateX(150px)'
      }
    }

  ]
  //默认全部为出厂动画
  for (var i = 0; i < animationArr.length; i++) {
    animationArr[i].anOut();
  }






}