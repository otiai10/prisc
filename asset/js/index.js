$(function(){
  var view = Prisc.Router.resolve();
  $('div#main').append(
      view.render().$el
  );
  $('title').text(view.title + ' - Prisc!');
});
