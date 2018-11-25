
export default function () {

  const liNodes = document.querySelectorAll('.home-carousel li');
  const pointsNodex = document.querySelectorAll('.home-points li');
  const homeNode = document.querySelector('.home');

  //记录上一次下标记
  let lastIndex = 0;
  //记录当前下标；
  let nowIndex = 0;
  //记录上一次触发的时间
  let lastTime = 0;

  for (let i = 0; i < pointsNodex.length; i++) {
    pointsNodex[i].onclick = function () {
    //  函数节流
      let nowTime = Date.now();
      if(nowTime - lastTime <= 2500){
        return
      }
      nowIndex = i;
    //
      if(nowIndex ===lastIndex)return;
      if(nowIndex>lastIndex){
      //  说明点击的是右边
        liNodes[nowIndex].className = 'oneActive rightShow';
        liNodes[lastIndex].className = 'oneActive leftHide';
      }else{
        liNodes[nowIndex].className = 'oneActive leftShow';
        liNodes[lastIndex].className = 'oneActive rightHide';
      }
    //  小圆点样式更换
      pointsNodex[lastIndex].className = '';
      pointsNodex[nowIndex].className = 'active';

    //  同步更新上一次的下标
      lastIndex = nowIndex;
      lastTime =nowTime;
    }
  }


  let timer = null;
//  自动轮播
  function autoPlay() {



    timer = setInterval(() => {
      nowIndex++;
      if(nowIndex>3){
        nowIndex = 0;
      }
      liNodes[nowIndex].className = 'oneActive rightShow';
      liNodes[lastIndex].className = 'oneActive leftHide';

      pointsNodex[lastIndex].className = '';
      pointsNodex[nowIndex].className = 'active';

      lastIndex = nowIndex;
    },3000)
  }
  autoPlay();
  homeNode.onmouseenter = function () {
    clearInterval(timer)
  };
  homeNode.onmouseleave = function () {
    autoPlay();
  }


}