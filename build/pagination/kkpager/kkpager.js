!function(a){if("function"==typeof require&&"object"==typeof exports&&"object"==typeof module){var b=module.exports||exports;a(b)}else"function"==typeof define&&define.amd?define("pagination/kkpager/kkpager",[],a):a(window.kkpager={})}(function(a){var a=window.kkpager={pagerid:"kkpager",mode:"link",pno:1,total:1,totalRecords:0,isShowFirstPageBtn:!0,isShowLastPageBtn:!0,isShowPrePageBtn:!0,isShowNextPageBtn:!0,isShowTotalPage:!0,isShowCurrPage:!0,isShowTotalRecords:!1,isGoPage:!0,isWrapedPageBtns:!0,isWrapedInfoTextAndGoPageBtn:!0,hrefFormer:"",hrefLatter:"",gopageWrapId:"kkpager_gopage_wrap",gopageButtonId:"kkpager_btn_go",gopageTextboxId:"kkpager_btn_go_input",lang:{firstPageText:"首页",firstPageTipText:"首页",lastPageText:"尾页",lastPageTipText:"尾页",prePageText:"上一页",prePageTipText:"上一页",nextPageText:"下一页",nextPageTipText:"下一页",totalPageBeforeText:"共",totalPageAfterText:"页",currPageBeforeText:"当前第",currPageAfterText:"页",totalInfoSplitStr:"/",totalRecordsBeforeText:"共",totalRecordsAfterText:"条数据",gopageBeforeText:"&nbsp;转到",gopageButtonOkText:"确定",gopageAfterText:"页",buttonTipBeforeText:"第",buttonTipAfterText:"页"},getLink:function(a){return 1==a?this.hrefFormer+this.hrefLatter:this.hrefFormer+"_"+a+this.hrefLatter},click:function(a){return!1},getHref:function(a){return"#"},focus_gopage:function(){var a=$("#"+this.gopageButtonId);$("#"+this.gopageTextboxId).attr("hideFocus",!0),a.show(),a.css("left","10px"),$("#"+this.gopageTextboxId).addClass("focus"),a.animate({left:"+=30"},50)},blur_gopage:function(){var a=this;setTimeout(function(){var b=$("#"+a.gopageButtonId);b.animate({left:"-=25"},100,function(){b.hide(),$("#"+a.gopageTextboxId).removeClass("focus")})},400)},keypress_gopage:function(){var b=arguments[0]||window.event,c=b.keyCode||b.charCode;return 8==c||(13==c?(a.gopage(),!1):!(!b.ctrlKey||99!=c&&118!=c)||!(c<48||c>57))},gopage:function(){var a=$("#"+this.gopageTextboxId).val();if(isNaN(a))return void $("#"+this.gopageTextboxId).val(this.next);var b=parseInt(a);b<1&&(b=1),b>this.total&&(b=this.total),"click"==this.mode?this._clickHandler(b):window.location=this.getLink(b)},selectPage:function(a){this._config.pno=a,this.generPageHtml(this._config,!0)},generPageHtml:function(a,b){!b&&this.inited||this.init(a);var c="",d="",e="",f="";this.isShowFirstPageBtn&&(c=this.hasPrv?"<a "+this._getHandlerStr(1)+' title="'+(this.lang.firstPageTipText||this.lang.firstPageText)+'">'+this.lang.firstPageText+"</a>":'<span class="disabled">'+this.lang.firstPageText+"</span>"),this.isShowPrePageBtn&&(d=this.hasPrv?"<a "+this._getHandlerStr(this.prv)+' title="'+(this.lang.prePageTipText||this.lang.prePageText)+'">'+this.lang.prePageText+"</a>":'<span class="disabled">'+this.lang.prePageText+"</span>"),this.isShowNextPageBtn&&(e=this.hasNext?"<a "+this._getHandlerStr(this.next)+' title="'+(this.lang.nextPageTipText||this.lang.nextPageText)+'">'+this.lang.nextPageText+"</a>":'<span class="disabled">'+this.lang.nextPageText+"</span>"),this.isShowLastPageBtn&&(f=this.hasNext?"<a "+this._getHandlerStr(this.total)+' title="'+(this.lang.lastPageTipText||this.lang.lastPageText)+'">'+this.lang.lastPageText+"</a>":'<span class="disabled">'+this.lang.lastPageText+"</span>");var g="",h='<span class="spanDot">...</span>',i='<span class="totalText">',j='<span class="totalInfoSplitStr">'+this.lang.totalInfoSplitStr+"</span>";this.isShowCurrPage?(i+=this.lang.currPageBeforeText+'<span class="currPageNum">'+this.pno+"</span>"+this.lang.currPageAfterText,this.isShowTotalPage?(i+=j,i+=this.lang.totalPageBeforeText+'<span class="totalPageNum">'+this.total+"</span>"+this.lang.totalPageAfterText):this.isShowTotalRecords&&(i+=j,i+=this.lang.totalRecordsBeforeText+'<span class="totalRecordNum">'+this.totalRecords+"</span>"+this.lang.totalRecordsAfterText)):this.isShowTotalPage?(i+=this.lang.totalPageBeforeText+'<span class="totalPageNum">'+this.total+"</span>"+this.lang.totalPageAfterText,this.isShowTotalRecords&&(i+=j,i+=this.lang.totalRecordsBeforeText+'<span class="totalRecordNum">'+this.totalRecords+"</span>"+this.lang.totalRecordsAfterText)):this.isShowTotalRecords&&(i+=this.lang.totalRecordsBeforeText+'<span class="totalRecordNum">'+this.totalRecords+"</span>"+this.lang.totalRecordsAfterText),i+="</span>";var k="";if(this.isGoPage&&(k='<span class="goPageBox">'+this.lang.gopageBeforeText+'<span id="'+this.gopageWrapId+'"><input type="button" id="'+this.gopageButtonId+'" onclick="kkpager.gopage()" value="'+this.lang.gopageButtonOkText+'" /><input type="text" id="'+this.gopageTextboxId+'" onfocus="kkpager.focus_gopage()"  onkeypress="return kkpager.keypress_gopage(event);"   onblur="kkpager.blur_gopage()" value="'+this.next+'" /></span>'+this.lang.gopageAfterText+"</span>"),this.total<=8)for(var l=1;l<=this.total;l++)g+=this.pno==l?'<span class="curr">'+l+"</span>":"<a "+this._getHandlerStr(l)+' title="'+this.lang.buttonTipBeforeText+l+this.lang.buttonTipAfterText+'">'+l+"</a>";else if(this.pno<=5){for(var l=1;l<=7;l++)g+=this.pno==l?'<span class="curr">'+l+"</span>":"<a "+this._getHandlerStr(l)+' title="'+this.lang.buttonTipBeforeText+l+this.lang.buttonTipAfterText+'">'+l+"</a>";g+=h}else{g+="<a "+this._getHandlerStr(1)+' title="'+this.lang.buttonTipBeforeText+"1"+this.lang.buttonTipAfterText+'">1</a>',g+="<a "+this._getHandlerStr(2)+' title="'+this.lang.buttonTipBeforeText+"2"+this.lang.buttonTipAfterText+'">2</a>',g+=h;var m=this.pno-2,n=this.pno+2;n>this.total?(n=this.total,m=n-4,this.pno-m<2&&(m-=1)):n+1==this.total&&(n=this.total);for(var l=m;l<=n;l++)g+=this.pno==l?'<span class="curr">'+l+"</span>":"<a "+this._getHandlerStr(l)+' title="'+this.lang.buttonTipBeforeText+l+this.lang.buttonTipAfterText+'">'+l+"</a>";n!=this.total&&(g+=h)}var o="<div>";o+=this.isWrapedPageBtns?'<span class="pageBtnWrap">'+c+d+g+e+f+"</span>":c+d+g+e+f,o+=this.isWrapedInfoTextAndGoPageBtn?'<span class="infoTextAndGoPageBtnWrap">'+i+k+"</span>":i+k,o+='</div><div style="clear:both;"></div>',$("#"+this.pagerid).html(o)},init:function(a){if(this.pno=isNaN(a.pno)?1:parseInt(a.pno),this.total=isNaN(a.total)?1:parseInt(a.total),this.totalRecords=isNaN(a.totalRecords)?0:parseInt(a.totalRecords),a.pagerid&&(this.pagerid=a.pagerid),a.mode&&(this.mode=a.mode),a.gopageWrapId&&(this.gopageWrapId=a.gopageWrapId),a.gopageButtonId&&(this.gopageButtonId=a.gopageButtonId),a.gopageTextboxId&&(this.gopageTextboxId=a.gopageTextboxId),void 0!=a.isShowFirstPageBtn&&(this.isShowFirstPageBtn=a.isShowFirstPageBtn),void 0!=a.isShowLastPageBtn&&(this.isShowLastPageBtn=a.isShowLastPageBtn),void 0!=a.isShowPrePageBtn&&(this.isShowPrePageBtn=a.isShowPrePageBtn),void 0!=a.isShowNextPageBtn&&(this.isShowNextPageBtn=a.isShowNextPageBtn),void 0!=a.isShowTotalPage&&(this.isShowTotalPage=a.isShowTotalPage),void 0!=a.isShowCurrPage&&(this.isShowCurrPage=a.isShowCurrPage),void 0!=a.isShowTotalRecords&&(this.isShowTotalRecords=a.isShowTotalRecords),a.isWrapedPageBtns&&(this.isWrapedPageBtns=a.isWrapedPageBtns),a.isWrapedInfoTextAndGoPageBtn&&(this.isWrapedInfoTextAndGoPageBtn=a.isWrapedInfoTextAndGoPageBtn),void 0!=a.isGoPage&&(this.isGoPage=a.isGoPage),a.lang)for(var b in a.lang)this.lang[b]=a.lang[b];this.hrefFormer=a.hrefFormer||"",this.hrefLatter=a.hrefLatter||"",a.getLink&&"function"==typeof a.getLink&&(this.getLink=a.getLink),a.click&&"function"==typeof a.click&&(this.click=a.click),a.getHref&&"function"==typeof a.getHref&&(this.getHref=a.getHref),this._config||(this._config=a),this.pno<1&&(this.pno=1),this.total=this.total<=1?1:this.total,this.pno>this.total&&(this.pno=this.total),this.prv=this.pno<=2?1:this.pno-1,this.next=this.pno>=this.total-1?this.total:this.pno+1,this.hasPrv=this.pno>1,this.hasNext=this.pno<this.total,this.inited=!0},_getHandlerStr:function(a){return"click"==this.mode?'href="'+this.getHref(a)+'" onclick="return kkpager._clickHandler('+a+')"':'href="'+this.getLink(a)+'"'},_clickHandler:function(a){var b=!1;return this.click&&"function"==typeof this.click&&(b=this.click.call(this,a)||!1),b}};return a});