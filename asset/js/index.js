$(function(){
  var view = Prisc.Router.resolve();
  $('body').append(
      view.render().$el
  );
});
