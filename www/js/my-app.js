// Initialize your app
var myApp = new Framework7({

	material: true,
	// enables hash navigation
	pushState: true,
	cache: true,
	// Default title for modals
	modalTitle: 'MNG App',
	router: true
});

// Export selectors engine
var $$ = Dom7;


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar

});


myApp.onPageInit('page-name-here',function(page){
   $$(".mylink").on("click",function(e){
      var myUrl = $$(this).data('myurl');
      var popupHTML = "";

      $$.ajax({
         type:'GET',
         url:myUrl,
         dataType:'html',
         success:function(data){
               popupHTML = '<div class="popup">'+
                    '<div class="content-block">'+
                      '<p>' + data + '.</p>'+
                      '<p><a href="#" class="close-popup">Close me</a></p>'+
                    '</div>'+
                  '</div>'

               myApp.popup(popupHTML);
            }
         });
   });
});
