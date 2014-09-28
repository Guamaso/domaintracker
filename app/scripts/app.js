var app = function(){
  //load json
  var Websites = can.Model.extend({
      findAll: 'GET /websites.json'
    },{});
window.websiteModel = Websites;
  //app component
  var websiteList = can.Component.extend({
    tag:'websites-list',
    template:can.view('website-list'),
    scope:{
      sites: new can.List([]),
      toggle_visibility:function($el){
        console.log($el);
        var state = $el.parent('li').find('.item-content').is(":visible");
        if (state){
          $el.parent('li').find('.item-content').hide();
        }else{
          $el.parent('li').find('.item-content').show();
        }
      }
    },
    events:{
      inserted:function(){
        var scope = this.scope;
        Websites.findAll().then(function(resp){
          scope.attr('sites',resp);
          $('.toggle-site-visibility h2').each(scope.toggle_visibility);
        })
        .fail(function(a,b,c){
          alert(a);console.log(a);console.log(b);console.log(c)
        });

      },
      '.toggle-site-visibility click':function($el){
        this.scope.toggle_visibility($el);
      }
    }
  });

  //new websiteList('#app');
  $('#app').html(can.view.mustache('<websites-list></websites-list>' ));

  console.log("App ready!");
  return can;
}

new app();
