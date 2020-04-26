$(function(){

  var $toggle_menu = $('.js-toggle-sp-menu'),
      $menu = $('.p-menu');

  // ハンバーガーメニュー
  $toggle_menu.on('click', function(){
    $(this).toggleClass('active');
    $menu.toggleClass('active');
  });

  // ハンバーガーメニューでリンクを選択したら、メニューが消える
  $('.js-menu-link').on('click', function(){
    
    $toggle_menu.removeClass('active');
    $menu.removeClass('active');
  });
});