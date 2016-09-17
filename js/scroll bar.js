var	sccrollBarObj={
	createScrollBar:function(scrollBar) {
		var scroll=document.getElementById(scrollBar.scroll),
			body=document.getElementById(scrollBar.body),
			bar=document.getElementById(scrollBar.bar),
			warp=document.getElementById(scrollBar.warp),
			warpH=warp.clientHeight,
			bodyH=body.offsetHeight,
			speed=scrollBar.speed,
			barMinH=scrollBar.barMinH,
			scrollH=scroll.offsetHeight,
			flag=scrollBar.flag,
			barH=((bodyH-warpH)/8)>(scrollH-barMinH)?barMinH:(scrollH-(bodyH-warpH)/8),
			curY,
			curBarPos,
			newPos=0;
		bar.style.height=barH+'px';	
		scroll.onmousedown=function(e){
			flag=1;
			var e=e||window.event;
			curBarPos=bar.offsetTop;
			curY=e.clientY;
			document.body.onselectstart = function(){return false};
		}
		window.onmousemove=function(e){
			if(flag==1){
				var e=e||window.event,
					newY=e.clientY;
				newPos=newY-curY+curBarPos;
				 moveBar(newPos);
			}
			document.body.onselectstart = function(){return false};
		}
		window.onmouseup=function(){
			flag=0;
			document.body.onselectstart = function(){return false};
		}

		if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
			document.addEventListener("DOMMouseScroll",function(e){wheel(e);},false);
		}
		else{
			warp.onmousewheel=function(e){wheel(e);}
		}	

		function wheel(e){
			var e=e||window.event;
			if(e.wheelDelta>0&&e.wheelDelta%120==0||e.detail===-3){
				newPos=newPos-5<0?0:newPos-5;
			}
			else if(e.wheelDelta<0&&e.wheelDelta%120==0||e.detail===3){
				newPos=newPos+5>scrollH-barH?(scrollH-barH):newPos+5;
			}
			moveBar(newPos);
		}
		function moveBar(newPos){
			var pos=parseInt(bar.style.marginTop);
			if(newPos<0){
				newPos=0;
			}
			else if(newPos>scrollH-barH){
				newPos=scrollH-barH;
			}
			bar.style.marginTop=newPos+'px';
			body.style.marginTop=(-1)*newPos*(bodyH-warpH)/(scrollH-barH)+'px';
		}
	}
}  
var scrollBar=Object.create(sccrollBarObj);
scrollBar.createScrollBar({
	scroll:'scroll',//滚动栏的ID
	body:'body',//滚动内容的ID
	warp:'warp',//滚动区的ID
	bar:'bar',//滚动条的ID
	barMinH:40,//滚动条的最小高度
	speed:5,
	flag:0
});
	