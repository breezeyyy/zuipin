"use strict";define(function(){return function(e){var n=e.oldP,s=e.newP,c=e.url,u=e.success;ajax({url:c,type:"GET",success:function(e){u(e)},fail:function(e){console.log(e)},search:{type:"changeUserPsd",oldP:n,newP:s,username:getCookie("username")}})}});