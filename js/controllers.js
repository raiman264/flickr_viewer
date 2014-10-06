angular.module('flicker_viewer.controllers',['ngDialog'])


.factory('Flickr', function($http){
  var url = "https://api.flickr.com/services/rest/?api_key=1fb9b65e54ae1ccf65781a1ef1476147&media=photos&per_page=12&format=json&nojsoncallback=1";

  return {
      getImages:function(params, handler){

        $http.get(url+"&method=flickr.photos.search&text="+params.search+"&page="+params.page)
        .success(function(data){
          handler(data);
        }); 
        
      }
      
    }


})

.controller('homeCtrl', function($scope, $http, ngDialog, Flickr, $routeParams) {
  console.log($routeParams);
  $scope.params = $routeParams;

  $scope.pages = []  

  Flickr.getImages($routeParams,function(data){
    $scope.images = data.photos;
    paginator();
    $scope.searchbox = $routeParams.search;
  })

  $scope.openPic = function($event){
    console.log($event.target.parentElement.dataset.href);
    a = $event;
    ngDialog.open({
      template: '<img src="'+$event.target.parentElement.dataset.href+'">',
      plain: true
    });
  }

  $scope.search = function(){
    window.location.hash = '#/'+$scope.params.search;
  }
  
  function paginator(){
    var currentPage = $scope.images.page;
    var pages = [];
    var baseUrl = '#/'+$routeParams.search+'/'

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