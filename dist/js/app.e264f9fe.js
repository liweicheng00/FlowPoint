(function(t){function e(e){for(var i,r,a=e[0],l=e[1],c=e[2],u=0,p=[];u<a.length;u++)r=a[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&p.push(o[r][0]),o[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);d&&d(e);while(p.length)p.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],i=!0,r=1;r<n.length;r++){var l=n[r];0!==o[l]&&(i=!1)}i&&(s.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},o={app:0},s=[];function r(t){return a.p+"js/"+({about:"about"}[t]||t)+"."+{about:"d133d355"}[t]+".js"}function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise((function(e,i){n=o[t]=[e,i]}));e.push(n[2]=i);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,a.nc&&l.setAttribute("nonce",a.nc),l.src=r(t);var c=new Error;s=function(e){l.onerror=l.onload=null,clearTimeout(u);var n=o[t];if(0!==n){if(n){var i=e&&("load"===e.type?"missing":e.type),s=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+i+": "+s+")",c.name="ChunkLoadError",c.type=i,c.request=s,n[1](c)}o[t]=void 0}};var u=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(e)},a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/",a.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var d=c;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"14b6":function(t,e,n){t.exports=n.p+"img/flowchart.5007418a.png"},"214a":function(t,e,n){"use strict";var i=n("2427"),o=n.n(i);o.a},2427:function(t,e,n){},"27a5":function(t,e,n){},"29ad":function(t,e,n){},"2ff9":function(t,e,n){},"3c71":function(t,e,n){"use strict";var i=n("8c32"),o=n.n(i);o.a},4127:function(t,e,n){"use strict";var i=n("27a5"),o=n.n(i);o.a},"452c":function(t,e,n){},"47ee":function(t,e,n){},"48fe":function(t,e,n){},"4da2":function(t,e,n){"use strict";var i=n("5359"),o=n.n(i);o.a},"51c0":function(t,e,n){"use strict";var i=n("e2f9"),o=n.n(i);o.a},5359:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("b-navbar",{attrs:{toggleable:"sm",type:"light",variant:"warning"}},[i("b-navbar-brand",{attrs:{href:"#",tag:"h1"}},[i("img",{staticClass:"icon-size",attrs:{src:n("14b6"),alt:"FlowPoint"}}),t._v(" FlowPoint ")]),i("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),i("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[i("b-navbar-nav",[i("b-nav-item",{attrs:{href:"#",to:"/"}},[t._v(" Flow ")]),i("b-nav-item",{attrs:{href:"#",to:"EditStyle"}},[t._v("Edit Module ")])],1),i("b-navbar-nav",{staticClass:"ml-auto"},[i("b-nav-item",[i("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal",value:"login",expression:"'login'"}],attrs:{size:"sm"}},[t._v("Login")])],1),i("b-nav-item",[i("b-button",{attrs:{size:"sm"}},[t._v("Logout")])],1)],1)],1)],1),i("b-modal",{ref:"login",attrs:{id:"login",title:"Login","hide-footer":""}},[i("div",{staticClass:"d-block text-center"},[i("GoogleLogin",{attrs:{params:t.params,renderParams:t.renderParams,onSuccess:t.onSuccess}},[t._v("Login")])],1)]),i("div",{staticClass:"view"},[i("router-view")],1),t._m(0)],1)},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v(" Icons made by "),n("a",{attrs:{href:"https://www.flaticon.com/authors/freepik",title:"Freepik"}},[t._v("Freepik")]),t._v(" from "),n("a",{attrs:{href:"https://www.flaticon.com/",title:"Flaticon"}},[t._v("www.flaticon.com")])])}],r=n("2f62"),a=(n("4160"),n("13d5"),n("a434"),n("ac1f"),n("1276"),n("159b"),n("d4ec")),l=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,n=t%e;return n>e/2?t+(e-n):t-n},c=l,u=function t(e,n,i,o){Object(a["a"])(this,t),this.type=e,this.props=n,this.event=i,this.mainPage=!1,p.commit("newID"),this.id=p.state.IdArray[p.state.IdArray.length-1],"block"==e?(this.arrows={start:[],end:[]},this.content="",this.props={mouseclickposition:[c(i.offsetX),c(i.offsetY)],styleObject:{},textObject:{}},this.childs=[],this.parent=o):"arrow"==e&&(this.position={},this.props={visable:!1,startX:null,startY:null,offsetX:null,offsetY:null,arrowstartMiddle:n.arrowstartMiddle,arrowendMiddle:null},n.arrowstartMiddle.arrows.start.push(this),this.childs=[],this.parent=null)},d=u;i["default"].use(r["a"]);var p=new r["a"].Store({strict:"debug",state:{svg:null,ctm:null,ictm:null,IdArray:[],initViewbox:[0,0],FocusingElementId:null,alldata:{id:"1",type:"block",position:{},props:{},childs:[],mainPage:!0,parent:null,arrows:{start:[],end:[]},content:""},self:{},arrowObject:null,NumOfChilds:[0],coor:[]},getters:{},mutations:{getSVG:function(t,e){t.svg=e},clearSVG:function(t){t.svg=null},setCTM:function(t){t.ctm=t.svg.svg.getCTM(),t.ictm=t.ctm.inverse()},setInitViewbox:function(t,e){t.initViewbox=e},assignBeginingNode:function(t){t.self=t.alldata},changeSelf:function(t,e){t.self.mainPage=!1,t.self=e,t.self.mainPage=!0},gobackSelf:function(t){console.log("state.self go back"),t.self.mainPage=!1,t.self=t.self.parent,t.self.mainPage=!0},addElement:function(t,e){var n=e.type,i=e.props,o=e.event,s=e.parent,r=new d(n,i,o,s);t.self.childs.push(r),"arrow"==n&&(t.arrowObject=r)},clearInitPosition:function(t,e){var n=e.data,i=e.style;n.props.mouseclickposition=null,n.props.styleObject=i},setArrowPosition:function(t,e){t.arrowObject.props.visable=!0,t.arrowObject.props.offsetX=t.ictm.a*e.event.offsetX+t.ictm.c*e.event.offsetY+t.ictm.e,t.arrowObject.props.offsetY=t.ictm.b*e.event.offsetX+t.ictm.d*e.event.offsetY+t.ictm.f,e.props.arrowendMiddle?t.arrowObject.props.arrowendMiddle=e.props.arrowendMiddle:t.arrowObject.props.arrowendMiddle=null},endLink:function(t,e){t.arrowObject.props.visable=!0,t.arrowObject.props.arrowendMiddle=e,e?e.arrows.end.push(t.arrowObject):this._mutations.cancelLink[0](),t.arrowObject=null},cancelLink:function(t){console.log("cacel link"),t.self.childs.pop()},emptyState:function(){this.replaceState({IdArray:[],FocusingElementId:null,alldata:{id:"1",type:"block",position:{},props:{},childs:[],parent:null},self:{childs:[]},arrowObject:null})},newID:function(t){var e;if(0!=t.IdArray.length){var n=parseInt(t.IdArray[t.IdArray.length-1].split("_")[1]);e="cpn_"+(n+1),t.IdArray.push(e)}else e="cpn_0",t.IdArray.push(e)},changeFocusingElement:function(t,e){console.log("change focus",e),t.FocusingElementId=e},addChildNum:function(t,e){var n=e.parentCoor.reduce((function(t,e){return t[e]}),t.coor);n[e.pkey]||n.push([]),t.NumOfChilds[e.l]?t.NumOfChilds[e.l]+=1:t.NumOfChilds.push(1)},reduceChildNum:function(t,e){t.NumOfChilds[e]-=1,t.NumOfChilds[e]||t.NumOfChilds.splice(e,e)},editContent:function(t,e){var n=e.data,i=e.content;n.content=i},resetBlockHeight:function(t,e){var n=e.data,i=e.ref;n.props.styleObject.height=i.clientHeight},setBlockPosition:function(t,e){var n=e.data,i=e.position;n.arrows.start.forEach((function(t){t.props.offsetX+=1,t.props.offsetX-=1})),n.arrows.end.forEach((function(t){t.props.offsetX+=1,t.props.offsetX-=1})),n.props.styleObject.x="".concat(c(i.x)),n.props.styleObject.y="".concat(c(i.y))}},actions:{},modules:{}}),h=n("e571"),f=n.n(h),m=n("5f5b"),v=n("b1e0"),w=(n("f9e3"),n("2dd8"),n("d06d"),n("0874"));i["default"].use(r["a"]),i["default"].use(m["a"]),i["default"].use(v["a"]),i["default"].component("v-icon",w["a"]),i["default"].prototype.$bus=new i["default"];var g={name:"app",components:{GoogleLogin:f.a},data:function(){return{params:{client_id:"422430406019-4knnkh10lgpftp3a7hhi3cd17ljdnat2.apps.googleusercontent.com"},renderParams:{width:250,height:50,longtitle:!0}}},store:p,mounted:function(){},methods:{onSuccess:function(t){console.log(t),console.log(this.$refs),this.$refs["login"].hide(),console.log("should be closed"),console.log(t.getBasicProfile())}}},b=g,y=(n("4127"),n("b0a0"),n("2877")),x=Object(y["a"])(b,o,s,!1,null,null,null),k=x.exports,O=(n("d3b7"),n("8c4f")),j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-container",{attrs:{fluid:""}},[n("b-form-row",[n("b-col",{attrs:{cols:"8"}},[n("Tool"),n("Main")],1),n("b-col",[n("All"),n("Preview"),n("Style"),n("TextEditor")],1)],1)],1)],1)},$=[],E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"block"},[n("svg",{ref:"svg",staticClass:"Svg",attrs:{id:"block",version:"2",baseProfile:"full",xmlns:"http://www.w3.org/2000/svg",width:t.props.clientWidth,height:t.props.clientHeight,viewBox:t.viewBox,preserveAspectRatio:"xMidYMid slice"},on:{contextmenu:function(t){t.preventDefault()},click:t.clickEvent,dblclick:function(e){return e.target!==e.currentTarget?null:t.dblclickEvent(e)},mousedown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.leftmousedownEvent(e)},mouseup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.leftmouseupEvent(e)},mousemove:t.mousemoveEvent,mouseleave:t.mouseleaveEvent,wheel:t.wheelEvent}},[n("g",t._l(t.childs,(function(e,i){return n("Middle",{key:i,attrs:{data:e,parent:t.self},on:{dblclick:t.middleDblClickEvent,"mousedown-right":t.middleMouseDownEvent,"mouseup-right":t.middleMouseUpEvent,"mouseup-left":t.middleMouseUpEventL,"mousedown-left":t.middleMouseDownEventL,mouseenter:t.middleMouseEnterEvent,mouseleave:t.middleMouseLeaveEvent}})})),1)])])},M=[],_=(n("99af"),n("3ca3"),n("ddb0"),n("2b3d"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{class:t.classList,on:{mousedown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.mousedownleft(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"right",39,e.key,["Right","ArrowRight"])||"button"in e&&2!==e.button?null:t.mousedownright(e)}],mouseup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.mouseupleft(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"right",39,e.key,["Right","ArrowRight"])||"button"in e&&2!==e.button?null:t.mouseupright(e)}],dblclick:t.dblclick,mouseenter:t.mouseenter,mouseleave:t.mouseleave}},["block"==t.data.type?n("Block",{attrs:{data:t.data,parent:t.parent}}):"arrow"==t.data.type?n("Arrow",{attrs:{data:t.data}}):t._e()],1)}),P=[],I=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",[n("defs",[n("marker",{attrs:{id:"arrow",markerWidth:"10",markerHeight:"10",refX:"9",refY:"3",orient:"auto"}},[n("path",{attrs:{d:"M0,0 L0,6 L9,3 z",fill:"#f00"}})])]),n("path",{attrs:{d:t.d,stroke:"#000","stroke-width":"1","marker-end":"url(#arrow)"}})])},B=[],C={props:{data:Object},data:function(){return{startSection:1,endSection:3}},computed:{startPoint:function(){if(console.log("startPoint"),this.data.props.visable){if(this.data.props.arrowstartMiddle){var t,e=parseInt(this.data.props.arrowstartMiddle.props.styleObject.y)+parseInt(this.data.props.arrowstartMiddle.props.styleObject.height)/2;return t=this.data.props.offsetX>parseInt(this.data.props.arrowstartMiddle.props.styleObject.x)?parseInt(this.data.props.arrowstartMiddle.props.styleObject.x)+parseInt(this.data.props.arrowstartMiddle.props.styleObject.width):parseInt(this.data.props.arrowstartMiddle.props.styleObject.x),[t,e]}return console.warn("something wrong!"),[0,0]}return[0,0]},endPoint:function(){var t,e;return console.log("endPoint"),this.data.props.visable?this.data.props.arrowendMiddle?(t=this.data.props.arrowendMiddle.props.styleObject.x,e=parseInt(this.data.props.arrowendMiddle.props.styleObject.y)+parseInt(this.data.props.arrowendMiddle.props.styleObject.height)/2,[t,e]):(t=this.data.props.offsetX,e=this.data.props.offsetY,[t,e]):[0,0]},d:function(){var t=this.pathCalculate(this.data.props),e="".concat(t.x1,",").concat(t.y1),n="".concat(t.x2,",").concat(t.y2);return"M".concat(e," L").concat(n)}},methods:{setNodePosition:function(t,e,n){switch(n){case 1:return t[0]-e[0]<0?t[1]-e[1]>=0?4:2:1;case 2:return t[1]-e[1]>=0?t[0]-e[0]>=0?1:3:2;case 3:return t[0]-e[0]>=0?t[1]-e[1]>=0?4:2:3;case 4:return t[1]-e[1]<0?t[0]-e[0]>=0?1:3:4}},pathCalculate:function(t){var e;if(!t.visable)return{x1:0,y1:0,x2:0,y2:0};if(e={x1:parseInt(t.arrowstartMiddle.props.styleObject.x)+parseInt(t.arrowstartMiddle.props.styleObject.width),y1:parseInt(t.arrowstartMiddle.props.styleObject.y)+parseInt(t.arrowstartMiddle.props.styleObject.height)/2,x2:t.offsetX,y2:t.offsetY},t.arrowendMiddle)switch(e.x2=t.arrowendMiddle.props.styleObject.x,e.y2=t.arrowendMiddle.props.styleObject.y,this.endSection=this.setNodePosition([e.x1,e.y1],[e.x2,e.y2],this.endSection),this.endSection){case 1:e.x2=parseInt(t.arrowendMiddle.props.styleObject.x)+parseInt(t.arrowendMiddle.props.styleObject.width),e.y2=parseInt(t.arrowendMiddle.props.styleObject.y)+parseInt(t.arrowendMiddle.props.styleObject.height)/2;break;case 2:e.x2=parseInt(t.arrowendMiddle.props.styleObject.x)+parseInt(t.arrowendMiddle.props.styleObject.width)/2,e.y2=t.arrowendMiddle.props.styleObject.y;break;case 3:e.x2=t.arrowendMiddle.props.styleObject.x,e.y2=parseInt(t.arrowendMiddle.props.styleObject.y)+parseInt(t.arrowendMiddle.props.styleObject.height)/2;break;case 4:e.x2=parseInt(t.arrowendMiddle.props.styleObject.x)+parseInt(t.arrowendMiddle.props.styleObject.width)/2,e.y2=parseInt(t.arrowendMiddle.props.styleObject.y)+parseInt(t.arrowendMiddle.props.styleObject.height);break}switch(this.startSection=this.setNodePosition([e.x2,e.y2],[e.x1,e.y1],this.startSection),this.startSection){case 1:e.x1=parseInt(t.arrowstartMiddle.props.styleObject.x)+parseInt(t.arrowstartMiddle.props.styleObject.width),e.y1=parseInt(t.arrowstartMiddle.props.styleObject.y)+parseInt(t.arrowstartMiddle.props.styleObject.height)/2;break;case 2:e.x1=parseInt(t.arrowstartMiddle.props.styleObject.x)+parseInt(t.arrowstartMiddle.props.styleObject.width)/2,e.y1=parseInt(t.arrowstartMiddle.props.styleObject.y);break;case 3:e.x1=parseInt(t.arrowstartMiddle.props.styleObject.x),e.y1=parseInt(t.arrowstartMiddle.props.styleObject.y)+parseInt(t.arrowstartMiddle.props.styleObject.height)/2;break;case 4:e.x1=parseInt(t.arrowstartMiddle.props.styleObject.x)+parseInt(t.arrowstartMiddle.props.styleObject.width)/2,e.y1=parseInt(t.arrowstartMiddle.props.styleObject.y)+parseInt(t.arrowstartMiddle.props.styleObject.height);break}return e}}},S=C,L=Object(y["a"])(S,I,B,!1,null,"46623aef",null),D=L.exports,T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{on:{focus:t.onFocus}},[n("rect",t._b({staticClass:"block",class:{focus:t.ifFocus},attrs:{id:t.data.id}},"rect",t.data.props.styleObject,!1)),n("foreignObject",{attrs:{x:t.styleObject.x,y:t.styleObject.y,width:t.data.props.styleObject.width,height:t.data.props.styleObject.height,"pointer-events":"none"}},[n("body",{attrs:{xmlns:"http://www.w3.org/1999/xhtml"}},[n("div",{ref:"content",staticClass:"fo"},[n("div",{class:[t.fo_content],domProps:{innerHTML:t._s(t.data.content)}})])])])],1)},z=[],A=(n("b0c0"),{props:{data:Object,parent:Object},data:function(){return{ifFocus:!1,allowMove:!1,styleDefault:{width:"100",height:"30",stroke:"black",rx:"3",fill:"transparent","stroke-width":"1",x:"0",y:"0"},textDefault:{},fo_content:""}},created:function(){var t=this;this.$bus.$on("TextEditor:change",(function(e,n){t.ifFocus&&t.data.id==n&&t.$store.commit("editContent",{data:t.data,content:e})})),this.$bus.$on("Style:change",(function(e){t.ifFocus&&(t.fo_content=e.name)})),this.onFocus()},updated:function(){""!=this.data.content&&this.$store.commit("resetBlockHeight",{data:this.data,ref:this.$refs.content})},watch:{focusingElementId:function(t){t==this.data.id?this.ifFocus=!0:this.ifFocus=!1},data:function(){console.log("here")}},computed:{styleObject:function(){if(this.data.props.mouseclickposition){var t=this.$store.state.ictm,e=this.data.props.mouseclickposition[0]-parseInt(this.styleDefault.width)/t.a/2,n=this.data.props.mouseclickposition[1]-parseInt(this.styleDefault.height)/t.a/2,i=t.a*e+t.c*n+t.e,o=t.b*e+t.d*n+t.f,s=Object.assign(this.styleDefault,{color:"red",x:"".concat(i),y:"".concat(o)});return this.$store.commit("clearInitPosition",{data:this.data,style:s}),s}return this.data.props.styleObject},textObject:function(){return Object.assign(this.textDefault,{})},focusingElementId:function(){return this.$store.state.FocusingElementId}},mounted:function(){},methods:{onFocus:function(){this.$store.commit("changeFocusingElement",this.data.id),this.$bus.$emit("Block:focus",this.data.content,this.data.id)},resizeBody:function(){console.log("here")},gridAttach:function(t,e){var n=t%e;return n>e/2?t+(e-n):t-n}},beforeDestroy:function(){this.$bus.$off("TextEditor:change")}}),F=A,H=(n("d921"),Object(y["a"])(F,T,z,!1,null,"3cdaa9fc",null)),N=H.exports,W={components:{Arrow:D,Block:N},props:{data:Object,parent:Object},mounted:function(){},computed:{classList:function(){var t={Middle:!0};return t[this.data.type]=!0,t}},methods:{mousedownright:function(t){this.$emit("mousedown-right",t,this.data)},mouseupright:function(t){this.$emit("mouseup-right",t,this.data)},mouseupleft:function(t){this.$emit("mouseup-left",t,this.data)},mousedownleft:function(t){this.$emit("mousedown-left",t,this.data)},mouseenter:function(t){this.$emit("mouseenter",t,this.data)},mouseleave:function(t){this.$emit("mouseleave",t,this.data)},dblclick:function(t){this.$emit("dblclick",t,this.data)}},beforeDestroy:function(){}},X=W,Y=(n("c87c"),Object(y["a"])(X,_,P,!1,null,"80e3a0e8",null)),V=Y.exports,R={components:{Middle:V},props:{},data:function(){return{canZoom:!1,canPen:!1,canDrag:!1,linkStatus:!1,props:{clientHeight:null,clientWidth:null,viewBox:{"min-x":0,"min-y":0,width:null,height:null,startPoint:[0,0]},arrowstartMiddle:null,arrowendMiddle:null}}},created:function(){var t=this;this.$nextTick((function(){t.$store.commit("getSVG",t.$refs),t.$store.commit("setCTM")})),this.$bus.$on("tool:back",(function(){t.backtoolclickEvent()})),this.$bus.$on("tool:save",(function(){console.log(t.$refs),t.savetoolclickEvent(t.$refs.svg)})),window.addEventListener("resize",(function(){t.windowresizeEvent()}))},mounted:function(){this.windowresizeEvent(),this.$store.commit("assignBeginingNode")},computed:{viewBox:{get:function(){return this.props.clientHeight?"".concat(this.props.viewBox["min-x"]," ").concat(this.props.viewBox["min-y"]," ").concat(this.props.viewBox.width," ").concat(this.props.viewBox.height):"0 0 0 0"},set:function(t){this.props.viewBox["min-x"]=t[0],this.props.viewBox["min-y"]=t[1]}},data:function(){return this.$store.state.alldata},self:function(){return this.$store.state.self},childs:function(){return this.self.childs},parent:function(){return this.self.parent}},watch:{},methods:{windowresizeEvent:function(){this.props.clientHeight=this.$el.clientHeight,this.props.clientWidth=this.$el.clientWidth,this.props.viewBox.height=this.props.clientHeight,this.props.viewBox.width=this.props.clientWidth,this.$store.commit("setInitViewbox",[this.props.clientWidth,this.props.clientHeight])},clickEvent:function(t){this.linkStatus&&(this.$store.commit("cancelLink"),this.endLink(t))},dblclickEvent:function(t){this.$store.commit("addElement",{type:"block",props:this.props,event:t,parent:this.self})},leftmousedownEvent:function(t){this.startPen(t)},leftmouseupEvent:function(t){this.endPen(t)},mousemoveEvent:function(t){t.preventDefault(),this.linkStatus?this.Link(t):this.canPen?this.pen(t):this.canDrag&&this.drag(t,this.dragData)},mouseleaveEvent:function(){},wheelEvent:function(t){this.zoom(t)},middleMouseDownEventL:function(t,e){this.startDrag(e)},middleMouseUpEventL:function(){this.endDrag()},middleMouseDownEvent:function(t,e){this.startLink(t,e)},middleMouseUpEvent:function(t,e){this.endLink(t,e)},middleDblClickEvent:function(t,e){this.initViewbox(),this.$store.commit("changeSelf",e)},middleMouseEnterEvent:function(t,e){if(this.linkStatus){var n=e.id!=this.props.arrowstartMiddle.id,i=t.target.classList.contains("block");n&&i&&(this.props.arrowendMiddle=e)}},middleMouseLeaveEvent:function(){if(this.linkStatus){var t=event.target.classList.contains("block");t&&(this.props.arrowendMiddle=null)}},backtoolclickEvent:function(){this.parent?(this.initViewbox(),this.$store.commit("gobackSelf")):console.log("no parent")},savetoolclickEvent:function(t,e){t.setAttribute("xmlns","http://www.w3.org/2000/svg");var n=t.outerHTML,i='<?xml version="1.0" standalone="no"?>\r\n',o=new Blob([i,n],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r)},initViewbox:function(){this.viewBox=[0,0]},startLink:function(t,e){var n=t.target.classList.contains("block");n&&(this.props.arrowstartMiddle||(this.linkStatus=!0,this.props.arrowstartMiddle=e))},endLink:function(){this.linkStatus=!1,this.$store.commit("endLink",this.props.arrowendMiddle),this.props.arrowstartMiddle=null,this.props.arrowendMiddle=null},Link:function(t){t.preventDefault(),this.$store.state.arrowObject?this.$store.commit("setArrowPosition",{event:t,props:this.props}):this.$store.commit("addElement",{type:"arrow",props:this.props,event:t})},startPen:function(t){var e=t.target.classList.contains("Svg");e&&(this.canPen=!0,this.props.viewBox.startPoint=[this.props.viewBox["min-x"]+t.offsetX,this.props.viewBox["min-y"]+t.offsetY])},endPen:function(){this.canPen=!1},pen:function(t){this.props.viewBox["min-x"]=this.props.viewBox.startPoint[0]-t.offsetX,this.props.viewBox["min-y"]=this.props.viewBox.startPoint[1]-t.offsetY,this.$store.commit("setCTM")},zoom:function(t){var e=this.props.viewBox.width+t.deltaY,n=this.props.viewBox.height+t.deltaY;this.props.viewBox.width=e>=0?e:0,this.props.viewBox.height=n>=0?n:0,this.$store.commit("setCTM")},startDrag:function(t){this.canDrag=!0,this.dragData=t},drag:function(t,e){if(this.canDrag){var n=this.$store.state.ictm,i=t.offsetX-parseInt(e.props.styleObject.width)/n.a/2,o=t.offsetY-parseInt(e.props.styleObject.height)/n.a/2,s=n.a*i+n.c*o+n.e,r=n.b*i+n.d*o+n.f;this.$store.commit("setBlockPosition",{data:e,position:{x:s,y:r}})}},endDrag:function(){this.canDrag=!1,this.dragData=null}},beforeDestroy:function(){this.$store.commit("clearSVG")}},U=R,G=(n("e8a5"),Object(y["a"])(U,E,M,!1,null,"73a4ecb4",null)),q=G.exports,J=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"default",on:{mouseenter:t.toggleMagnifierShow,mouseleave:t.toggleMagnifierShow}},[n("svg",{ref:"all",attrs:{id:"all",version:"1.1",baseProfile:"full",xmlns:"http://www.w3.org/2000/svg",width:t.props.clientWidth,height:t.props.clientHeight},on:{mousemove:t.mousemoveEvent}},[n("g",{ref:"g"},[n("TreeBlock",{attrs:{isBegin:!0,pkey:0,parentCoor:[],data:t.alldata,level:t.l}})],1)]),n("Magnifier",{directives:[{name:"show",rawName:"v-show",value:t.isMagnifierShow,expression:"isMagnifierShow"}],attrs:{mouse:t.mouse}})],1)},Q=[],Z=(n("4de4"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",[t.isBegin?t._e():n("path",t._b({attrs:{d:t.arrowPath}},"path",t.pathDefault,!1)),n("rect",t._b({on:{click:t.rectClick,mouseenter:function(e){return e.target!==e.currentTarget?null:t.rectMouseenter(e)},mouseleave:function(e){return e.target!==e.currentTarget?null:t.rectMouseleave(e)}}},"rect",t.styleObject,!1)),t._l(t.filtChilds,(function(e,i){return n("TreeBlock",{key:i,attrs:{pkey:i,parentCoor:t.coor,data:e,level:t.l,startPoint:t.lastPoint}})}))],2)}),K=[],tt=(n("a630"),n("a9e3"),{name:"TreeBlock",props:{data:Object,level:Number,startPoint:{type:Array,default:function(){return[0,0]}},pkey:Number,parentCoor:Array,isBegin:{type:Boolean,default:!1}},created:function(){this.$store.commit("addChildNum",{l:this.l,pkey:this.pkey,parentCoor:this.parentCoor}),this.index=this.$store.state.NumOfChilds[this.l]},data:function(){return{beginBlock:!1,defaultSpace:10,index:null,ifFocus:!1,content:"",styleDefault:{width:"20",height:"6",stroke:"black",fill:"transparent","stroke-width":"1"},pathDefault:{stroke:"#000","stroke-width":"1"},textDefault:{fill:"black","text-anchor":"middle","dominant-baseline":"middle"}}},computed:{coor:function(){var t=Array.from(this.parentCoor);return t.push(this.pkey),t},l:function(){return this.level+1},filtChilds:function(){return this.data.childs.filter((function(t){return"block"==t.type}))},connectPoint:function(){return[this.startPoint[0]+this.defaultSpace,this.index*this.defaultSpace]},lastPoint:function(){var t=this.connectPoint[0]+parseInt(this.styleDefault.width),e=this.connectPoint[1]+parseFloat(this.styleDefault.height)/2;return[t,e]},styleObject:function(){return Object.assign(this.styleDefault,{fill:this.data.mainPage?"green":"transparent",x:"".concat(this.connectPoint[0]),y:"".concat(this.connectPoint[1])})},arrowPath:function(){if("0,0"!=this.startPoint){var t="".concat(this.startPoint[0],",").concat(this.startPoint[1]),e="".concat(this.connectPoint[0],",").concat(this.connectPoint[1]+parseFloat(this.styleDefault.height)/2);return"M".concat(t," L").concat(e)}return""}},methods:{rectClick:function(){console.log("send changeSelf"),this.$bus.$emit("changeSelf"),this.$store.commit("changeSelf",this.data)},rectMouseenter:function(){this.$bus.$emit("TreeBlock:mouseenter",this.data)},rectMouseleave:function(){this.$bus.$emit("TreeBlock:mouseleave")}},destroyed:function(){this.$store.commit("reduceChildNum",this.l)}}),et=tt,nt=(n("711f"),Object(y["a"])(et,Z,K,!1,null,"1640bd7d",null)),it=nt.exports,ot=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"magnifier",style:t.positionObject},[n("svg",{ref:"svg",attrs:{version:"1.1",baseProfile:"full",xmlns:"http://www.w3.org/2000/svg",width:t.props.clientWidth,height:t.props.clientHeight,viewBox:t.viewBox}},[n("g")]),n("v-icon",{staticClass:"mouse-icon",attrs:{name:"mouse-pointer"}})],1)},st=[],rt={props:["mouse"],data:function(){return{props:{clientHeight:null,clientWidth:null}}},watch:{},computed:{viewBox:function(){return this.mouse.length?"".concat(this.mouse[0]-10," ").concat(this.mouse[1]-10," 20 20"):"0 0 10 10"},positionObject:function(){return{height:"80px",width:"80px",left:"".concat(this.mouse[0]+50,"px"),top:"".concat(this.mouse[1]+10,"px")}}},created:function(){var t=this;window.addEventListener("resize",(function(){t.windowresizeEvent()}))},mounted:function(){var t=this;this.mag=this.$refs.mag,this.$bus.$on("all:refs",(function(e){var n=t.$refs.svg.getElementsByTagName("g")[0];n.replaceWith(e)}))},methods:{windowresizeEvent:function(){this.props.clientHeight=this.$el.clientHeight,this.props.clientWidth=this.$el.clientWidth}},beforeDestroy:function(){this.$bus.$off("all:refs")}},at=rt,lt=(n("6814"),Object(y["a"])(at,ot,st,!1,null,"543ab63f",null)),ct=lt.exports,ut={components:{TreeBlock:it,Magnifier:ct},data:function(){return{l:0,isMagnifierShow:!1,mouse:[],props:{clientHeight:null,clientWidth:null,viewBox:{"min-x":0,"min-y":0,width:null,height:null,startPoint:[0,0]}}}},watch:{},computed:{filtChilds:function(){return this.alldata.childs.filter((function(t){return"block"==t.type}))},alldata:function(){return this.$store.state.alldata}},created:function(){var t=this;window.addEventListener("resize",(function(){t.windowresizeEvent()}))},mounted:function(){},beforeUpdate:function(){},updated:function(){this.$bus.$emit("all:refs",this.$refs.g.cloneNode(!0))},methods:{windowresizeEvent:function(){this.props.clientHeight=this.$el.clientHeight,this.props.clientWidth=this.$el.clientWidth,this.props.viewBox.height=this.props.clientHeight,this.props.viewBox.width=this.props.clientWidth},mousemoveEvent:function(t){this.mouse=[t.offsetX,t.offsetY]},toggleMagnifierShow:function(){this.isMagnifierShow=!this.isMagnifierShow}}},dt=ut,pt=(n("214a"),Object(y["a"])(dt,J,Q,!1,null,"6f98d040",null)),ht=pt.exports,ft=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"default"},[n("svg",{staticClass:"Svg",attrs:{version:"2",baseProfile:"full",xmlns:"http://www.w3.org/2000/svg",viewBox:t.viewBox}},[n("g",t._l(t.childs,(function(t,e){return n("Middle",{key:e,attrs:{data:t}})})),1)])])},mt=[],vt={components:{Middle:V},data:function(){return{data:{},props:{clientHeight:null,clientWidth:null,viewBox:{"min-x":0,"min-y":0,width:null,height:null,startPoint:[0,0]}}}},computed:{viewBox:function(){return"0 0 ".concat(this.initViewbox[0]," ").concat(this.initViewbox[1])},initViewbox:function(){return this.$store.state.initViewbox},childs:function(){return this.data.childs}},created:function(){var t=this;window.addEventListener("resize",(function(){t.windowresizeEvent()})),this.$bus.$on("TreeBlock:mouseenter",(function(e){t.data=e})),this.$bus.$on("TreeBlock:mouseleave",(function(){}))},mounted:function(){this.windowresizeEvent()},methods:{windowresizeEvent:function(){this.props.clientHeight=this.$el.clientHeight,this.props.clientWidth=this.$el.clientWidth,this.props.viewBox.height=this.props.clientHeight,this.props.viewBox.width=this.props.clientWidth}}},wt=vt,gt=(n("e058"),Object(y["a"])(wt,ft,mt,!1,null,"2ae4d0b8",null)),bt=gt.exports,yt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"overflow-x"},t._l(t.styles,(function(t,e){return n("StyleBlock",{key:e,attrs:{layout_style:t}})})),1)},xt=[],kt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"default",class:[t.layout_style.name],domProps:{innerHTML:t._s(t.layout_style.content)},on:{click:t.changeStyle}})},Ot=[],jt={props:["layout_style"],data:function(){return{}},created:function(){var t="";for(var e in this.layout_style.style){for(var n in t+=".".concat(this.layout_style.name," ").concat(e," {"),this.layout_style.style[e])t+="".concat(n,": ").concat(this.layout_style.style[e][n],";");t+="} "}var i=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");i.appendChild(o),o.type="text/css",o.styleSheet?o.styleSheet.cssText=t:o.appendChild(document.createTextNode(t))},computed:{},methods:{changeStyle:function(){console.log(),this.$bus.$emit("Style:change",this.layout_style)}}},$t=jt,Et=(n("51c0"),Object(y["a"])($t,kt,Ot,!1,null,"fa5ee8e8",null)),Mt=Et.exports,_t={components:{StyleBlock:Mt},data:function(){return{styles:[{name:"default_p",content:"<div><p>put something graceful</p></div>",style:{div:{padding:"5%","justify-content":"flex-start"},p:{"font-size":"1.6em","text-align":"left"}}},{name:"default_h_p",content:"<div><h2>head</h2><p>put something meaningful</p></div>",style:{div:{padding:"5%","justify-content":"flex-start"},h2:{"font-size":"2em","text-align":"left"},p:{"font-size":"1em","text-align":"left"}}},{name:"default_h_p",content:"<div><h2>head</h2><p>put something meaningful</p></div>",style:{div:{padding:"5%","justify-content":"flex-start"},h2:{"font-size":"2em","text-align":"left"},p:{"font-size":"1em","text-align":"left"}}},{name:"default_h_p",content:"<div><h2>head</h2><p>put something meaningful</p></div>",style:{div:{padding:"5%","justify-content":"flex-start"},h2:{"font-size":"2em","text-align":"left"},p:{"font-size":"1em","text-align":"left"}}},{name:"default_h_p",content:"<div><h2>head</h2><p>put something meaningful</p></div>",style:{div:{padding:"5%","justify-content":"flex-start"},h2:{"font-size":"2em","text-align":"left"},p:{"font-size":"1em","text-align":"left"}}},{name:"default_h_p",content:"<div><h2>head</h2><p>put something meaningful</p></div>",style:{div:{padding:"5%","justify-content":"flex-start"},h2:{"font-size":"2em","text-align":"left"},p:{"font-size":"1em","text-align":"left"}}}]}}},Pt=_t,It=(n("3c71"),Object(y["a"])(Pt,yt,xt,!1,null,"5f7a222a",null)),Bt=It.exports,Ct=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"default"},[n("b-button-group",{attrs:{size:"sm"}},[n("b-button",{on:{click:t.backclickEvent}},[n("v-icon",{attrs:{name:"chevron-left"}})],1),n("b-button",{on:{click:t.saveclickEvent}},[n("v-icon",{attrs:{name:"save"}})],1),n("b-button",{on:{click:t.undoclickEvent}},[n("v-icon",{attrs:{name:"undo"}})],1),n("b-button",{on:{click:t.redoclickEvent}},[n("v-icon",{attrs:{name:"redo"}})],1)],1)],1)},St=[],Lt={methods:{backclickEvent:function(){this.$bus.$emit("tool:back")},saveclickEvent:function(){this.$bus.$emit("tool:save")},undoclickEvent:function(){this.$bus.$emit("tool:undo")},redoclickEvent:function(){this.$bus.$emit("tool:redo")}}},Dt=Lt,Tt=(n("4da2"),Object(y["a"])(Dt,Ct,St,!1,null,"15fc4adb",null)),zt=Tt.exports,At=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("quill-editor",{ref:"myQuillEditor",attrs:{options:t.editorOption},on:{blur:function(e){return t.onEditorBlur(e)},focus:function(e){return t.onEditorFocus(e)},ready:function(e){return t.onEditorReady(e)},change:t.onEditorChange},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})},Ft=[],Ht=(n("a753"),n("8096"),n("14e1"),n("953d")),Nt={components:{quillEditor:Ht["quillEditor"]},data:function(){return{content:"",focusId:null,editorOption:{placeholder:"Select a element!",modules:{toolbar:["bold","italic","underline","strike"]}}}},created:function(){var t=this;this.$bus.$on("Block:focus",(function(e,n){t.content=e,t.focusId=n,t.editor.focus()}))},methods:{onEditorBlur:function(){},onEditorFocus:function(){},onEditorReady:function(){},onEditorChange:function(t){var e=t.html;this.editorOption.placeholder="Type something...",this.$bus.$emit("TextEditor:change",e,this.focusId)}},computed:{editor:function(){return this.$refs.myQuillEditor.quill}},mounted:function(){}},Wt=Nt,Xt=Object(y["a"])(Wt,At,Ft,!1,null,null,null),Yt=Xt.exports,Vt={name:"EditFlow",components:{Main:q,All:ht,Preview:bt,Style:Bt,Tool:zt,TextEditor:Yt},created:function(){this.data=this.$store.state.alldata}},Rt=Vt,Ut=(n("da92"),Object(y["a"])(Rt,j,$,!1,null,null,null)),Gt=Ut.exports,qt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},Jt=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v("edit style modules")])])}],Qt={},Zt=Object(y["a"])(Qt,qt,Jt,!1,null,null,null),Kt=Zt.exports;i["default"].use(O["a"]);var te=[{path:"/",name:"Home",component:Gt},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/Flow",name:"Flow",component:Gt},{path:"/EditStyle",name:"EditStyle",component:Kt}],ee=new O["a"]({mode:"history",base:"/",routes:te}),ne=ee;i["default"].config.productionTip=!1,new i["default"]({router:ne,store:p,render:function(t){return t(k)}}).$mount("#app")},6814:function(t,e,n){"use strict";var i=n("48fe"),o=n.n(i);o.a},"711f":function(t,e,n){"use strict";var i=n("c223"),o=n.n(i);o.a},"8c32":function(t,e,n){},a5a9:function(t,e,n){},b0a0:function(t,e,n){"use strict";var i=n("452c"),o=n.n(i);o.a},c223:function(t,e,n){},c87c:function(t,e,n){"use strict";var i=n("2ff9"),o=n.n(i);o.a},d921:function(t,e,n){"use strict";var i=n("47ee"),o=n.n(i);o.a},da92:function(t,e,n){"use strict";var i=n("f9a6"),o=n.n(i);o.a},e058:function(t,e,n){"use strict";var i=n("29ad"),o=n.n(i);o.a},e2f9:function(t,e,n){},e8a5:function(t,e,n){"use strict";var i=n("a5a9"),o=n.n(i);o.a},f9a6:function(t,e,n){}});
//# sourceMappingURL=app.e264f9fe.js.map