
export default function () {
//获取dom元素
  const liNodes = document.querySelectorAll('.team-list li');
  const ulNode =  document.querySelector('.team-list');

  const width = liNodes[0].offsetWidth;
  const height = liNodes[0].offsetHeight;
  let timer  = null;
  let bubbleTimer  = null;
  let canvas = null;
  //li鼠标移入事件
  for (let i = 0; i < liNodes.length; i++) {
    liNodes[i].onmouseenter = function () {
      for (var j = 0; j < liNodes.length; j++) {
        liNodes[j].style.opacity = 0.5;
      }
      this.style.opacity = 1;
      addCanvas(i);
    }
  }
  //ul鼠标移出事件
  ulNode.onmouseleave = function () {
    for (let i = 0; i < liNodes.length; i++) {
      liNodes[i].style.opacity = 1;
    }
    canvas.remove();
    canvas = null;
  //  清除定时器
    clearInterval(timer);
    clearInterval(bubbleTimer)
  };

    //添加canvas

  function addCanvas(index) {
    if(!canvas){
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.style.position = 'absolute';
      canvas.style.top = 0;
      canvas.style.left = index * width +'px';
      bubble();
      ulNode.appendChild(canvas);
    }else{
      canvas.style.left = index*width +'px';
    }
  }


  function bubble() {
    const arr = [];
    timer=setInterval(function () {

  //  rgb随即色
      const r = Math.round(Math.random()*255);
      const g = Math.round(Math.random()*255);
      const b = Math.round(Math.random()*255);

  //  随机半径
      const radius = Math.round(Math.random()*5+10);
  //  随即位置
      const x = Math.round(Math.random()*width);
      const y = height;
      //随机缩放
      const s = Math.round(Math.random()*50+20);
      //初始化弧度
      const rad =0;

      arr.push({
        r,
        g,
        b,
        radius,
        x,
        y,
        s,
        rad
      });
    },50);

  //  画圆定时器
    bubbleTimer = setInterval(()=>{
      if(canvas.getContext){
        //画笔
        const ctx = canvas.getContext('2d');
        //画之前清除上一次画布
        ctx.clearRect(0,0,width,height);
        //开始画圆
        arr.forEach((item) => {
          //设置颜色
          ctx.fillStyle = `rgb(${item.r},${item.g},${item.b})`;
          //弧度递增
          item.rad += 0.1;
          //item.s决定摆动幅度
          const x = Math.round(item.x + Math.sin(item.rad) * item.s);
          const y = Math.round(item.y - item.rad * item.s);
          //开始新的路径 或者重置路径
          ctx.beginPath();
          //圆 x,y坐标,半径 起始弧度 结束弧度
          ctx.arc(x,y,item.radius,0,2*Math.PI);
          //填充画布
          ctx.fill();
        })
      }
    },1000/60)

  }

}