/**
 *  Copyright (c) 2010 Alethia Inc,
 *  http://www.alethia-inc.com
 *  Developed by Travis Tidwell | travist at alethia-inc.com 
 *
 *  License:  GPL version 3.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.

 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
(function(a){jQuery.media=jQuery.media?jQuery.media:{};jQuery.media.defaults=jQuery.extend(jQuery.media.defaults,{shuffle:false,loop:false,pageLimit:10});jQuery.media.ids=jQuery.extend(jQuery.media.ids,{prev:"#mediaprev",next:"#medianext",loadPrev:"#medialoadprev",loadNext:"#medialoadnext",prevPage:"#mediaprevpage",nextPage:"#medianextpage"});jQuery.fn.mediapager=function(b){return new (function(c,d){d=jQuery.media.utils.getSettings(d);this.display=c;var e=this;this.activeIndex=-1;this.currentIndex=-1;this.activePage=0;this.currentPage=0;this.numPages=0;this.numItems=10;this.activeNumItems=10;this.loadState="";this.enabled=false;this.prevButton=c.find(d.ids.prev).medialink(d,function(){if(e.enabled){e.loadPrev(false);}});this.nextButton=c.find(d.ids.next).medialink(d,function(){if(e.enabled){e.loadNext(false);}});this.loadPrevButton=c.find(d.ids.loadPrev).medialink(d,function(){if(e.enabled){e.loadPrev(true);}});this.loadNextButton=c.find(d.ids.loadNext).medialink(d,function(){if(e.enabled){e.loadNext(true);}});this.prevPageButton=c.find(d.ids.prevPage).medialink(d,function(){if(e.enabled){e.loadState="click";e.prevPage();}});this.nextPageButton=c.find(d.ids.nextPage).medialink(d,function(){if(e.enabled){e.loadState="click";e.nextPage();}});this.setTotalItems=function(f){if(f&&d.pageLimit){this.numPages=Math.ceil(f/d.pageLimit);if(this.numPages==1){this.numItems=f;}}};this.setNumItems=function(f){this.numItems=f;};this.reset=function(){this.activePage=0;this.currentPage=0;this.activeIndex=-1;this.currentIndex=-1;this.loadState="";};this.loadIndex=function(h){var f=h?"activeIndex":"currentIndex";var g=this[f];switch(this.loadState){case"prev":this.loadState="";this.loadPrev(h);return;case"first":g=0;break;case"last":g=(this.numItems-1);break;case"rand":g=Math.floor(Math.random()*this.numItems);break;default:break;}this.loadState="";if(g!=this[f]){this.loadState="";this[f]=g;this.display.trigger("loadindex",{index:this[f],active:h});}};this.loadNext=function(g){if(this.loadState){this.loadIndex(g);}else{if(d.shuffle){this.loadRand();}else{var f=g?"activeIndex":"currentIndex";if(g&&(this.activePage!=this.currentPage)){if((this.activeIndex==(this.activeNumItems-1))&&(this.activePage==(this.currentPage-1))){this.currentIndex=this.activeIndex=0;this.activePage=this.currentPage;this.display.trigger("loadindex",{index:0,active:true});}else{this.currentPage=this.activePage;this.loadState="";this.display.trigger("loadpage",{index:this.activePage,active:g});}}else{this[f]++;if(this[f]>=this.numItems){if(this.numPages>1){this[f]=(this.numItems-1);this.loadState=this.loadState?this.loadState:"first";this.nextPage(g);}else{if(!g||d.loop){this[f]=0;this.display.trigger("loadindex",{index:this[f],active:g});}}}else{this.display.trigger("loadindex",{index:this[f],active:g});}}}}};this.loadPrev=function(g){var f=g?"activeIndex":"currentIndex";if(g&&(this.activePage!=this.currentPage)){this.currentPage=this.activePage;this.loadState="prev";this.display.trigger("loadpage",{index:this.activePage,active:g});}else{this[f]--;if(this[f]<0){if(this.numPages>1){this[f]=0;this.loadState=this.loadState?this.loadState:"last";this.prevPage(g);}else{if(!g||d.loop){this[f]=(this.numItems-1);this.display.trigger("loadindex",{index:this[f],active:g});}}}else{this.display.trigger("loadindex",{index:this[f],active:g});}}};this.loadRand=function(){var f=Math.floor(Math.random()*this.numPages);if(f!=this.activePage){this.activePage=f;this.loadState=this.loadState?this.loadState:"rand";this.display.trigger("loadpage",{index:this.activePage,active:true});}else{this.activeIndex=Math.floor(Math.random()*this.numItems);this.display.trigger("loadindex",{index:this.activeIndex,active:true});}};this.nextPage=function(h){var f=h?"activePage":"currentPage";var g=false;if(this[f]<(this.numPages-1)){this[f]++;g=true;}else{if(d.loop){this.loadState=this.loadState?this.loadState:"first";this[f]=0;g=true;}else{this.loadState="";}}this.setPageState(h);if(g){this.display.trigger("loadpage",{index:this[f],active:h});}};this.prevPage=function(h){var f=h?"activePage":"currentPage";var g=false;if(this[f]>0){this[f]--;g=true;}else{if(d.loop){this.loadState=this.loadState?this.loadState:"last";this[f]=(this.numPages-1);g=true;}else{this.loadState="";}}this.setPageState(h);if(g){this.display.trigger("loadpage",{index:this[f],active:h});}};this.setPageState=function(f){if(f){this.currentPage=this.activePage;}else{this.activeNumItems=this.numItems;}};})(this,b);};})(jQuery);