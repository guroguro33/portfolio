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

  // フロートヘッダーメニュー
  var targetHeight = $('.js-float-menu-target').height();
  $(window).on('scroll', function(){
    $('.js-float-menu').toggleClass('float-active', $(this).scrollTop() > targetHeight);
  })

  // スムーズスクロール
  $('a[href^="#"').on('click',function(){
    
    var href = $(this).attr('href'),
        target = $((href == '#' || href == '')? 'html': href),
        position = target.offset().top + 50;
    
    $('html,body').animate({scrollTop: position}, 500);
    return false; //aタグの機能無効
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

  // slick.js

  let slicktype = "";
  const breakPoint = 480;

  function slickPc(){
    $('.slider').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      prevArrow: '<img src="../img/arrow-prev.svg" class="slide-arrow prev-arrow">',
      nextArrow: '<img src="../img/arrow-next.svg" class="slide-arrow next-arrow">',
      dots: true,
    });
  }

  function slickSmt(){
    $('.slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      prevArrow: '<img src="../img/arrow-prev.svg" class="slide-arrow prev-arrow">',
      nextArrow: '<img src="../img/arrow-next.svg" class="slide-arrow next-arrow">',
      dots: true,
    });
  }

  $(function(){
    if( window.innerWidth < breakPoint ){
      slickSmt();
      slicktype = "smt";
    }else{
      slickPc();
      slicktype = "pc";
    }
  $(window).on('resize',function(){
    if( window.innerWidth < breakPoint && slicktype == "pc"){
      $('.slider').slick('unslick');
      slickSmt();
      slicktype = "smt";
    }else if( window.innerWidth >= breakPoint && slicktype == "smt" ){
      $('.slider').slick('unslick');
      slickPc();
      slicktype = "pc";
    }
  });
  });
});