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
      sites: new can.List([])
    },
    events:{
      inserted:function(){
        var scope = this.scope;
        Websites.findAll().then(function(resp){
          scope.attr('sites',resp);
        })
        .fail(function(a,b,c){
          alert(a);console.log(a);console.log(b);console.log(c)
        });
      }
    }
  });

  //new websiteList('#app');
  $('#app').html(can.view.mustache('<websites-list></websites-list>' ));

  console.log("App ready!");
  return can;
}

new app();
