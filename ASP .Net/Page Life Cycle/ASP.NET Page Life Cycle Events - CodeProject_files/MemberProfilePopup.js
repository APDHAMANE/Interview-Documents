(function($){var useFriendlyUrl=false;var memberProfileViewUrl="/script/Membership/View.aspx";var turnoffUrl="/script/Membership/Ajax/SetPreference.aspx";$.fn.MemberProfilePopup=function(options){var settings={memberSummariesUrl:"/API/Membership/Summary/",missingMemberImageUrl:"/script/Membership/Images/member_unknown.gif"};if(useFriendlyUrl)settings.memberSummariesUrl="/API/Member/Summary/";if(options)$.extend(settings,options);$("<div id=\"MemberProfilePopupDiv\" class='raised box'></div>").css({"display":"none",
"position":"absolute"}).appendTo("body");var hoverConfig={sensitivity:7,interval:250,timeout:250,over:function(e){$target=$(this);var url=$target.attr("href");var memberIdStr=GetQueryStringParameter("mid",url);var requestUrl=settings.memberSummariesUrl;requestUrl=requestUrl+memberIdStr;var sendData="{ 'memberId' : "+memberIdStr+" }";$.ajax({url:requestUrl,data:sendData,type:"POST",dataType:"json",contentType:"application/json; charset=utf-8",success:function(data){var profile=data;if(!profile.ImageUrl||
profile.ImageUrl.length==0)profile.ImageUrl=settings.missingMemberImageUrl;$("#MemberProfilePopupDiv").empty();$("<table class='member-popup'><tr valign='top'>"+"<td><img /></td>"+"<td><div class='name'>"+profile.Name+"</div>"+"<div class='title'>"+profile.Title+(profile.Title&&profile.Company?" at ":"")+profile.Company+"</div>"+"<div class='location'>"+profile.Country+"</div>"+"<div class='rep'>"+formatNumber(profile.RepPoints)+" points</div>"+"</td></tr></table>").appendTo("#MemberProfilePopupDiv");
$("#MemberProfilePopupDiv img").error(function(){$this=$(this);$this.unbind("error");$this.attr("src",settings.missingMemberImageUrl);var divHeight=$("#MemberProfilePopupDiv").height();$("#MemberProfilePopupDiv").css({"left":$target.offset().left+20,"top":$target.offset().top-(divHeight+16)})}).attr("src",profile.ImageUrl);var divHeight=$("#MemberProfilePopupDiv").height();$("#MemberProfilePopupDiv").css({"left":$target.offset().left+20,"top":$target.offset().top-(divHeight+16)}).show()}})},out:function(){$("#MemberProfilePopupDiv").hide()}};
if(this.hoverIntent)this.hoverIntent(hoverConfig);else this.hover(hoverConfig.over,hoverConfig.out);function formatNumber(number){var comma=",",string=Math.max(0,number).toFixed(0),length=string.length,end=/^\d{4,}$/.test(string)?length%3:0;return(end?string.slice(0,end)+comma:"")+string.slice(end).replace(/(\d{3})(?=\d)/g,"$1"+comma)}function GetQueryStringParameter(key,url){if(key.charAt(key.length-1)!="=")key=key+"=";var startPos=url.toLowerCase().indexOf(key);if(startPos<0||startPos+key.length==
url.length)return"";var endPos=url.indexOf("&",startPos);if(endPos<0)endPos=url.length;var queryString=url.substring(startPos+key.length,endPos);queryString=queryString.replace(/%20/gi," ");queryString=queryString.replace(/\+/gi," ");queryString=queryString.replace(/%22/gi,"");queryString=queryString.replace(/\"/gi,"");return queryString}return this};$(function(){$(".qa-info a[href*='"+memberProfileViewUrl+"']").MemberProfilePopup();$(".qa-list a[href*='"+memberProfileViewUrl+"']").MemberProfilePopup();
$(".author a[href*='"+memberProfileViewUrl+"']").MemberProfilePopup()})})(jQuery);