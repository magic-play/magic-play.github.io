
const TOKEN="https://script.google.com/macros/s/AKfycbyABkk0kTD-cAIMc3jdVPk0e7Bn1Jb4S1IX7_8Et0048rO9ZQ/exec";
function islogin(){
t = getCookie("login");
if(t){
return t;
}else{logout_dash(); return false;}
}
function login(email,pass){
  $("#cd-login > form > p:nth-child(5) > input").css("background","rgb(140, 136, 154)");
  $("#cd-login > form > p:nth-child(5) > input").css("cursor","not-allowed");
$.post(TOKEN+"?f=l&tp=1&email="+encodeURI(email)+"&pass="+encodeURI(md5(pass)), function( data ) {
if(data=="oklogin"){
setCookie("login","&email="+encodeURI(email)+"&pass="+encodeURI(md5(pass)),365)
Frlogin(false);
window.location.replace("/dash/");
}else{
  //login error message
  $('.cd-user-modal').find('#cd-login').find('input[type="email"]').addClass('has-error').next('span').addClass('is-visible');
  $('.cd-user-modal').find('#cd-login').find('input[type="password"]').addClass('has-error');
  setTimeout(function(){
  Frlogin(false);
  $("#cd-login > form > p:nth-child(5) > input").css("background","rgb(47, 136, 154)");
      $("#cd-login > form > p:nth-child(5) > input").css("cursor","pointer");
  }, 5000);
  
  
}
  
  
});
  
}
function Frlogin(st){if(st){$('.cd-user-modal').find('#cd-login').find('input[type="submit"]').prop("disabled", true);}else{$('.cd-user-modal').find('#cd-login').find('input[type="submit"]').prop("disabled", false);}}
function Frsingup(st){if(st){$('#cd-signup > form > p:nth-child(6) > input').prop("disabled", true);}else{$('#cd-signup > form > p:nth-child(6) > input').prop("disabled", false);}}
function Frreset(st){if(st){$('#cd-reset-password > form > p:nth-child(3) > input').prop("disabled", true);}else{$('#cd-reset-password > form > p:nth-child(3) > input').prop("disabled", false);}}

function singup(uname,email,pass,ref){

  $("#cd-signup > form > p:nth-child(6) > input").css("background","rgb(140, 136, 154)");
  $("#cd-signup > form > p:nth-child(6) > input").css("cursor","not-allowed");
if(ref){
  ref = "&ref="+encodeURI(ref);
}else{ref = ""}
$.post(TOKEN+"?f=l&tp=0&email="+encodeURI(email)+"&pass="+encodeURI(md5(pass))+"&uname="+encodeURI(uname)+ref, function( data ) {
if(data=="okregistar"){
$('#cd-signup > div.alert').removeClass("d-none");
eraseCookie("ref");
}else{
$('.cd-user-modal').find('#cd-signup').find('input[type="email"]').addClass('has-error').next('span').addClass('is-visible');
  setTimeout(function(){
  Frsingup(false);
  $("#cd-signup > form > p:nth-child(6) > input").css("background","rgb(47, 136, 154)");
      $("#cd-signup > form > p:nth-child(6) > input").css("cursor","pointer");
  }, 5000);
  
}
  

});

}

function PassReset(email,pass){
  $("#cd-reset-password > form > p:nth-child(3) > input").css("background","rgb(140, 136, 154)");
  $("#cd-reset-password > form > p:nth-child(3) > input").css("cursor","not-allowed");
$.post(TOKEN+"?f=l&tp=2&email="+encodeURI(email)+"&pass="+encodeURI(md5(pass)), function( data ) {
if (data == "okreset"){
  $('#cd-reset-password > div.alert').removeClass("d-none");
}else{
//noreset
  $('.cd-user-modal').find('#cd-reset-password').find('input[type="email"]').addClass('has-error').next('span').addClass('is-visible');
  setTimeout(function(){
  Frreset(false);
  $("#cd-reset-password > form > p:nth-child(3) > input").css("background","rgb(47, 136, 154)");
      $("#cd-reset-password > form > p:nth-child(3) > input").css("cursor","pointer");
  }, 5000);
  
}
});
}

function getAData(){
  if(!getCookie("LU")) {setCookie("LU",new Date()); DataUpdate();}else{
    oldDate = new Date(getCookie("LU"));
    nowDate = new Date();
    delta = nowDate - oldDate;
    if (delta > 300000){setCookie("LU",new Date()); DataUpdate();}else{
      $("#money").text(getCookie("MONEY"));
      $("#moneyB").text(getCookie("MONEY"));
      $("#referalCount").text(getCookie("REFERALS"));
      $("#gameW").text(getCookie("GAMEW"));
      $("#avalible-games").text(getCookie("GAMEA"));
      $("#played-games").text(getCookie("GAMEP"));
      $("#avalible-keys").text(Number(getCookie("GAMEA"))-Number(getCookie("GAMEP")));
      

    }
  }
}
function DataUpdate(aftercallback){
 
  $.get(TOKEN+"?f=gd"+islogin(),function(data){
    if(data == "nologin") {logout_dash();return}

    data = JSON.parse(data);
    setCookie("MONEY",data["money"])
    setCookie("REFERALS",data["ref"])
    setCookie("GAMEA",data["gameA"])
    setCookie("GAMEW",data["gameW"])
    setCookie("GAMEIDS",data["gameIDS"])
    setCookie("GAMEP",(data["gameIDS"]) ? data["gameIDS"].split(",").length:"0")
    getAData();
    if (typeof aftercallback == "function") aftercallback(); 
  });



}




function sendMoney(card,sum,callback) {

$.get(TOKEN+"?f=sendm"+islogin()+"&card="+card+"&sum="+sum,function(data) {
if(data == "nologin") {logout_dash();return}
callback(data)
})
}




function logout_dash(){
console.log(eraseCookie("login"));
console.log(eraseCookie("LU"));
console.log(eraseCookie("GLU"));
window.location.replace("/");
}

function setCookie(name,value) {
  $.cookie(name, value, { path: '/' });
  /*
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    */
}
function getCookie(name) {
    return $.cookie(name);
}
function eraseCookie(name) {   
    $.removeCookie(name, { path: '/' }); 
}



function md5cycle(x, k) {
var a = x[0], b = x[1], c = x[2], d = x[3];

a = ff(a, b, c, d, k[0], 7, -680876936);
d = ff(d, a, b, c, k[1], 12, -389564586);
c = ff(c, d, a, b, k[2], 17,  606105819);
b = ff(b, c, d, a, k[3], 22, -1044525330);
a = ff(a, b, c, d, k[4], 7, -176418897);
d = ff(d, a, b, c, k[5], 12,  1200080426);
c = ff(c, d, a, b, k[6], 17, -1473231341);
b = ff(b, c, d, a, k[7], 22, -45705983);
a = ff(a, b, c, d, k[8], 7,  1770035416);
d = ff(d, a, b, c, k[9], 12, -1958414417);
c = ff(c, d, a, b, k[10], 17, -42063);
b = ff(b, c, d, a, k[11], 22, -1990404162);
a = ff(a, b, c, d, k[12], 7,  1804603682);
d = ff(d, a, b, c, k[13], 12, -40341101);
c = ff(c, d, a, b, k[14], 17, -1502002290);
b = ff(b, c, d, a, k[15], 22,  1236535329);

a = gg(a, b, c, d, k[1], 5, -165796510);
d = gg(d, a, b, c, k[6], 9, -1069501632);
c = gg(c, d, a, b, k[11], 14,  643717713);
b = gg(b, c, d, a, k[0], 20, -373897302);
a = gg(a, b, c, d, k[5], 5, -701558691);
d = gg(d, a, b, c, k[10], 9,  38016083);
c = gg(c, d, a, b, k[15], 14, -660478335);
b = gg(b, c, d, a, k[4], 20, -405537848);
a = gg(a, b, c, d, k[9], 5,  568446438);
d = gg(d, a, b, c, k[14], 9, -1019803690);
c = gg(c, d, a, b, k[3], 14, -187363961);
b = gg(b, c, d, a, k[8], 20,  1163531501);
a = gg(a, b, c, d, k[13], 5, -1444681467);
d = gg(d, a, b, c, k[2], 9, -51403784);
c = gg(c, d, a, b, k[7], 14,  1735328473);
b = gg(b, c, d, a, k[12], 20, -1926607734);

a = hh(a, b, c, d, k[5], 4, -378558);
d = hh(d, a, b, c, k[8], 11, -2022574463);
c = hh(c, d, a, b, k[11], 16,  1839030562);
b = hh(b, c, d, a, k[14], 23, -35309556);
a = hh(a, b, c, d, k[1], 4, -1530992060);
d = hh(d, a, b, c, k[4], 11,  1272893353);
c = hh(c, d, a, b, k[7], 16, -155497632);
b = hh(b, c, d, a, k[10], 23, -1094730640);
a = hh(a, b, c, d, k[13], 4,  681279174);
d = hh(d, a, b, c, k[0], 11, -358537222);
c = hh(c, d, a, b, k[3], 16, -722521979);
b = hh(b, c, d, a, k[6], 23,  76029189);
a = hh(a, b, c, d, k[9], 4, -640364487);
d = hh(d, a, b, c, k[12], 11, -421815835);
c = hh(c, d, a, b, k[15], 16,  530742520);
b = hh(b, c, d, a, k[2], 23, -995338651);

a = ii(a, b, c, d, k[0], 6, -198630844);
d = ii(d, a, b, c, k[7], 10,  1126891415);
c = ii(c, d, a, b, k[14], 15, -1416354905);
b = ii(b, c, d, a, k[5], 21, -57434055);
a = ii(a, b, c, d, k[12], 6,  1700485571);
d = ii(d, a, b, c, k[3], 10, -1894986606);
c = ii(c, d, a, b, k[10], 15, -1051523);
b = ii(b, c, d, a, k[1], 21, -2054922799);
a = ii(a, b, c, d, k[8], 6,  1873313359);
d = ii(d, a, b, c, k[15], 10, -30611744);
c = ii(c, d, a, b, k[6], 15, -1560198380);
b = ii(b, c, d, a, k[13], 21,  1309151649);
a = ii(a, b, c, d, k[4], 6, -145523070);
d = ii(d, a, b, c, k[11], 10, -1120210379);
c = ii(c, d, a, b, k[2], 15,  718787259);
b = ii(b, c, d, a, k[9], 21, -343485551);

x[0] = add32(a, x[0]);
x[1] = add32(b, x[1]);
x[2] = add32(c, x[2]);
x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
a = add32(add32(a, q), add32(x, t));
return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
txt = '';
var n = s.length,
state = [1732584193, -271733879, -1732584194, 271733878], i;
for (i=64; i<=s.length; i+=64) {
md5cycle(state, md5blk(s.substring(i-64, i)));
}
s = s.substring(i-64);
var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
for (i=0; i<s.length; i++)
tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
tail[i>>2] |= 0x80 << ((i%4) << 3);
if (i > 55) {
md5cycle(state, tail);
for (i=0; i<16; i++) tail[i] = 0;
}
tail[14] = n*8;
md5cycle(state, tail);
return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) { /* I figured global was faster.   */
var md5blks = [], i; /* Andy King said do it this way. */
for (i=0; i<64; i+=4) {
md5blks[i>>2] = s.charCodeAt(i)
+ (s.charCodeAt(i+1) << 8)
+ (s.charCodeAt(i+2) << 16)
+ (s.charCodeAt(i+3) << 24);
}
return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
var s='', j=0;
for(; j<4; j++)
s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
+ hex_chr[(n >> (j * 8)) & 0x0F];
return s;
}

function hex(x) {
for (var i=0; i<x.length; i++)
x[i] = rhex(x[i]);
return x.join('');
}

function md5(s) {
return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
return (a + b) & 0xFFFFFFFF;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
function add32(x, y) {
var lsw = (x & 0xFFFF) + (y & 0xFFFF),
msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
}



