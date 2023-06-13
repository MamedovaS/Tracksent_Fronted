$(document).ready(function(){
    loadMenu();
});

var loadMenu = function(){
    console.log('header');
    $('#header-menu').load('public/header.html');
}