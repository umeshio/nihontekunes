import '@babel/polyfill';

jQuery(function ($) {
  console.log('gens.jsが読みこまれた');
  $('body').addClass('jquery-add-class');
});
