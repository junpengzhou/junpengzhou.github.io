var posts=["article/2c13306e.html","article/eeaa9f96.html","article/5617d93b.html","article/82d0f8f4.html","article/6b8e949c.html","article/fbb9694d.html","article/4defb0f4.html","article/85fa82d5.html","article/d56aa5a7.html","article/aff50f08.html","article/67e7adac.html","article/abefaec9.html","article/74d1e41b.html","article/cff57d86.html","article/89eb1b81.html","article/430e01bd.html"];function toRandomPost(){pjax.loadUrl("/"+posts[Math.floor(Math.random()*posts.length)])}var friend_link_list=[{name:"Roozen",link:"https://roozen.top/",avatar:"https://roozen.top/upload/touxiang.jpg",descr:"技术宅男拯救世界！"},{name:"福福不服",link:"https://ffbf.top/",avatar:"https://ffbf.top/upload/logo3.jpeg",descr:"服就是不服"},{name:"杀死一只知更鸟",link:"https://www.shangjidong.com/",avatar:"https://www.shangjidong.com/usr/uploads/2023/07/1002399499.gif",descr:"前端技术分享、前端学习记录"},{name:"张洪Heo",link:"https://blog.zhheo.com/",avatar:"https://bu.dusays.com/2022/12/28/63ac2812183aa.png",descr:"分享设计与科技生活"},{name:"三钻",link:"https://tridiamond.tech/",avatar:"https://res.cloudinary.com/tridiamond/image/upload/v1625037705/ObsidianestLogo-hex_hecqbw.png",descr:"分享设计与科技生活",color:"vip",tag:"技术"},{name:"张洪Heo",link:"https://blog.zhheo.com/",avatar:"https://bu.dusays.com/2022/12/28/63ac2812183aa.png",descr:"分享设计与科技生活",color:null,tag:"设计"},{name:"安知鱼",hundredSuffix:"",link:"https://blog.anheyu.com",avatar:"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg",descr:"生活明朗，万物可爱",color:"speed",tag:"技术"},{name:"Akilarの糖果屋",link:"https://akilar.top/",avatar:"https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/Akilar%E3%81%AE%E7%B3%96%E6%9E%9C%E5%B1%8B%E7%BD%91%E7%AB%99%E6%88%AA%E5%9B%BE-snapshot.webp",descr:"Akilarの糖果屋技术博客",siteshot:"https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/akilar.top.png",color:"speed",tag:"技术"},{name:"Tianli",link:"https://tianli-blog.club",avatar:"https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/Tianli%E7%BD%91%E7%AB%99%E5%A4%B4%E5%83%8F-avatar.webp",descr:"惟其不可能，所以才相信。",siteshot:"https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/tianli-blog.club.png",color:null,tag:"技术"},{name:"贰猹的小窝",link:"https://noionion.top/",avatar:"https://pub-noionion.oss-cn-hangzhou.aliyuncs.com/head.jpg",descr:"用这生命中的每一秒，给自己一个不后悔的未来",siteshot:"https://pub-noionion.oss-cn-hangzhou.aliyuncs.com/noionion.top.png",tag:"技术",color:"vip"},{name:"Ethan.Tzy",link:"https://fe32.top/",avatar:"https://bu.dusays.com/2022/05/02/626f92e193879.jpg",descr:"古今之成大事者，不惟有超世之才，亦必有坚忍不拔之志",screenshot:"https://bu.dusays.com/2023/07/16/64b400bf8e546.jpg",tag:"技术",color:"vip"},{name:"轻笑Chuckle",link:"https://www.qcqx.cn",avatar:"https://www.qcqx.cn/img/head.webp",descr:"漫天倾尘,风中轻笑",siteshot:"https://www.qcqx.cn/img/qcqx.webp",tag:"技术",color:"vip"}],refreshNum=1;function friendChainRandomTransmission(){const t=Math.floor(Math.random()*friend_link_list.length),{name:a,link:n}=friend_link_list.splice(t,1)[0];Snackbar.show({text:"点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「"+a+"」",duration:8e3,pos:"top-center",actionText:"前往",onActionClick:function(t){t.style.opacity=0,window.open(n,"_blank")}})}function addFriendLinksInFooter(){var t=document.getElementById("footer-random-friends-btn");if(!t)return;t.style.opacity="0.2",t.style.transitionDuration="0.3s",t.style.transform="rotate("+360*refreshNum+++"deg)";const a=[];let n=0;for(;friend_link_list.length&&n<3;){const t=Math.floor(Math.random()*friend_link_list.length),{name:o,link:e,avatar:i}=friend_link_list.splice(t,1)[0];a.push({name:o,link:e,avatar:i}),n++}let o=a.map((({name:t,link:a})=>"<a class='footer-item' href='"+a+"' target='_blank' rel='noopener nofollow'>"+t+"</a>")).join("");o+="<a class='footer-item' href='/link/'>更多</a>",document.getElementById("friend-links-in-footer").innerHTML=o,setTimeout((()=>{t.style.opacity="1"}),300)}