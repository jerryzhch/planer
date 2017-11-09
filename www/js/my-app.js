// Initialize your app
var planix = new Framework7({
  // Default title for modals
  modalTitle: 'PlaniX',

  // If it is webapp, we can enable hash navigation:
  pushState: true,

  // Hide and show indicator during ajax requests
onAjaxStart: function (xhr) {
    planix.showIndicator();
},
onAjaxComplete: function (xhr) {
    planix.hideIndicator();
},

swipeBackPage: true,
swipeBackPageThreshold: 0,
swipeBackPageActiveArea: 30,
swipeBackPageAnimateShadow: false,
swipeBackPageAnimateOpacity: false,

swipePanel: 'left'
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = planix.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    domCache: true
});


$$('.notification-default').on('click', function () {
    planix.addNotification({
        title: 'PlaniX',
        message: 'This is a simple notification message with title and message'
    });
});
function unknown() {
  // HTML Content of the new Semester Grades Page
  var newSemester = '<div class="page cached" data-page="semtest" id="demopage">'+
                    '<div class="accordion-list">'+
                      '<div class="content-block-title">Subjects</div>'+
                        '<div class="list-block inset accordion-list">'+
                          '<ul>'+

                          '</ul>'+
                        '</div>'+
                      '</div>'+

                      '<div class="toolbar tabbar tabbar-labels">'+
                        '<div class="toolbar-inner">'+
                          '<a href="#" class="tab-link back">'+
                            '<i class="f7-icons">rewind</i>'+
                            '<span class="tabbar-label">Back</span>'+
                          '</a>'+
                        '</div>'+
                      '</div>'+
                    '</div>';


};
