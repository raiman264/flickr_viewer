angular.module('flicker_viewer.controllers',['ngDialog'])


.factory('Flickr', function($http){
  var url = "https://api.flickr.com/services/rest/?api_key=a08f75b9e6e3d05fa80ba2f90037ea46&media=photos&per_page=12&format=json&nojsoncallback=1";

  return {
      getImages:function(params, handler){
        
        $http.get(url+"&method=flickr.photos.search&extras=url_c&content_type="+params.type+"&text="+params.search+"&page="+params.page)
        .success(function(data){
          handler(data);
        }); 
        
      },

      getTypes:function(current){
        // 1 for photos only.
        // 2 for screenshots only.
        // 3 for 'other' only.
        // 4 for photos and screenshots.
        // 5 for screenshots and 'other'.
        // 6 for photos and 'other'.
        // 7 for photos, screenshots, and 'other' (all).

        return [
          {text: 'All', value:7, class: (current==7 ? 'active' : '')},
          {text: 'Photos', value:1, class: (current==1 ? 'active' : '')},
          {text: 'screenshots', value:2, class: (current==2 ? 'active' : '')},
          {text: 'Other', value:3, class: (current==3 ? 'active' : '')}
        ];
      }
      
    }


})

.controller('homeCtrl', function($scope, $http, ngDialog, Flickr, $routeParams) {

  $scope.params = $routeParams;
  $scope.types = Flickr.getTypes($routeParams.type);

  $scope.pages = []  

  Flickr.getImages($routeParams,function(data){
    $scope.images = data.photos;
    paginator();
  })

  $scope.openPic = function($event){
    ngDialog.open({
      template: '<img src="'+$event.target.parentElement.dataset.href+'">',
      plain: true
    });
  }

  $scope.search = function(){
    window.location.hash = '#/'+$routeParams.type+'/'+$scope.params.search;
  }
  
  function paginator(){
    var currentPage = $scope.images.page;
    var pages = [];
    var baseUrl = '#/'+$routeParams.type+'/'+$routeParams.search+'/';
    var max_page = 99;

    if($scope.images.pages > max_page){
      $scope.images.pages = max_page;
    }

    pages.push({number: '', class: 'prev '+(currentPage < 2 ? 'disable' : ''), url: baseUrl+(currentPage-1)});

    if(currentPage-1 > 1){
      pages.push({number: 1, class: 'number', url: baseUrl+1});
      
      if(currentPage-2 > 1){
        pages.push({number: '...', class: 'number disable', url: ''});
      }
    }

    if(currentPage > 1){
      pages.push({number: currentPage-1, class: 'number', url: baseUrl+(currentPage-1)});
    }
    pages.push({number: currentPage, class: 'number active', url: baseUrl+currentPage});

    if(currentPage < $scope.images.pages){
      pages.push({number: currentPage+1, class: 'number', url: baseUrl+(currentPage+1)});
      
      if(currentPage+2 < $scope.images.pages){
        pages.push({number: '...', class: 'number disable', url: ''});
      }
    }

    if($scope.images.pages > currentPage+1){
      pages.push({number: $scope.images.pages, class: 'number', url: baseUrl+$scope.images.pages});
    }

    pages.push({number: '', class: 'next '+(currentPage >= $scope.images.pages ? 'disable' : ''), url: baseUrl+(currentPage+1)});

    $scope.pages = pages;
  }
  
});