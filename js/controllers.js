angular.module('flicker_viewer.controllers',['ngDialog'])


.factory('Flickr', function($rootScope, $http){

  return {
      getImages:function(handler, id){
        var data = { "photos": { "page": 1, "pages": "13111", "perpage": 12, "total": "157330", 
    "photo": [
      { "id": "15270358780", "owner": "53731740@N07", "secret": "542b1a8659", "server": "5597", "farm": 6, "title": "Nikon D810 HDR Photos Malibu Sea Cave Sunset, Dr. Elliot McGucken Fine Art Photography!  14-24mm Nikkor Wide Angle F\/2.8 Lens!", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
      { "id": "15457019245", "owner": "53731740@N07", "secret": "60d79e267e", "server": "5597", "farm": 6, "title": "Nikon D810 HDR Photos Malibu Sea Cave Sunset, Dr. Elliot McGucken Fine Art Photography!  14-24mm Nikkor Wide Angle F\/2.8 Lens!", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
      { "id": "15456997165", "owner": "53731740@N07", "secret": "d24015060e", "server": "2945", "farm": 3, "title": "Nikon D810 HDR Photos Malibu Sea Cave Sunset, Dr. Elliot McGucken Fine Art Photography!  14-24mm Nikkor Wide Angle F\/2.8 Lens!", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
      { "id": "15270376767", "owner": "53731740@N07", "secret": "2f4bfbde10", "server": "5601", "farm": 6, "title": "Nikon D810 HDR Photos Malibu Sea Cave Sunset, Dr. Elliot McGucken Fine Art Photography!  14-24mm Nikkor Wide Angle F\/2.8 Lens!", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
      { "id": "15456488652", "owner": "53731740@N07", "secret": "cc7e5274aa", "server": "3927", "farm": 4, "title": "Nikon D810 HDR Photos Malibu Sea Cave Sunset, Dr. Elliot McGucken Fine Art Photography!  14-24mm Nikkor Wide Angle F\/2.8 Lens!", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
      { "id": "15456474402", "owner": "53731740@N07", "secret": "3500b76e10", "server": "3933", "farm": 4, "title": "Nikon D810 HDR Photos Malibu Sea Cave Sunset, Dr. Elliot McGucken Fine Art Photography!  14-24mm Nikkor Wide Angle F\/2.8 Lens!", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
      { "id": "15270158727", "owner": "53731740@N07", "secret": "9acf968003", "server": "2947", "farm": 3, "title": "Nikon D810 HDR Photos Malibu Sea Cave Sunset, Dr. Elliot McGucken Fine Art Photography!  14-24mm Nikkor Wide Angle F\/2.8 Lens!", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
      { "id": "15269966360", "owner": "66806895@N04", "secret": "e14c905219", "server": "2947", "farm": 3, "title": "Pink Bath", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
      { "id": "15269908809", "owner": "66806895@N04", "secret": "a592ccf55b", "server": "3928", "farm": 4, "title": "Vertigo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
      { "id": "15270099357", "owner": "66806895@N04", "secret": "f1f84f239b", "server": "2948", "farm": 3, "title": "Light Streaks", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
      { "id": "15269908449", "owner": "66806895@N04", "secret": "c260664f06", "server": "3936", "farm": 4, "title": "Peace Pagoda", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
      { "id": "15456614875", "owner": "127518515@N02", "secret": "cf1515b897", "server": "3933", "farm": 4, "title": "Need Assistance With Social Networking? Read These Guidelines", "ispublic": 1, "isfriend": 0, "isfamily": 0 }
    ] }, "stat": "ok" };

        handler(data);
        /*
        $http.get('')
        .success(function(data){
          handler(data);
        }); 
        */
      }
      
    }


})

.controller('homeCtrl', function($scope, $http, ngDialog, Flickr) {

  $scope.pages = []  

  Flickr.getImages(function(data){
    $scope.images = data.photos;
    paginator();
  })


  
  function paginator(){
    var currentPage = $scope.images.page;
    var pages = [];


    if(currentPage > 1){
      pages.push({number: currentPage-1, class: ''});
    }
    pages.push({number: currentPage, class: 'active'});

    if(currentPage < $scope.images.pages){
      pages.push({number: currentPage+1, class: ''},{number: '...', class: ''});
    }

    if($scope.images.pages > 1){
      pages.push({number: $scope.images.pages, class: ''});
    }

    $scope.pages = pages;
  }

  $scope.openPic = function($event){
    console.log($event.target.parentElement.dataset.href);
    a = $event;
    ngDialog.open({
      template: '<img src="'+$event.target.parentElement.dataset.href+'">',
      plain: true
    });
  }
  
});