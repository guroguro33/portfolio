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

  // SKILLのカードがフェードイン
  $(window).scroll(function(){ //スクロールした時、onメソッド不可
    $('.js-fadeIn').each(function(){
      var elemPos = $(this).offset().top,
          scroll = $(window).scrollTop(),
          windowHeight = $(window).height();
      if(scroll > elemPos -windowHeight + 200){
        $(this).addClass('fadeIn');
      }

    });
  });

  // （Ajaxの練習）ヒーロービューのタイトルクリックで記述変更
  $('.js-change-word').on('click', function(e){
    // e.preventDefault();

    $.ajax({
      type: 'post',
      url: './js/ajax.php',
      dataType: 'json',
      data: {
        name: 'Welcome!',
        msg: 'MyPortfolio！'
      }
    }).then(function(data){
      console.log('Ajax_success!');
      $('.js-get-name').text(data['name']);
      $('.js-get-title').text(data['msg']);
    }).fail(function(jqXHR, textStatus, errorThrown, data){
      console.log("ajax通信に失敗しました");
      console.log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
      console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
      console.log("errorThrown    : " + errorThrown.message); // 例外情報
    });


  });

});