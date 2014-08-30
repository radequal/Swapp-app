angular.module('swapp.controllers', [])

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $location, OpenFB) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    console.log(window.location.hash);
    window.location.hash = "#/swapp/home";
    window.location.reload();
    // $state.go('swappMenu');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };


  // Facebook login actions
  // $scope.facebookLogin = function() {
  // 	console.log("facebook button pressed");
    // OpenFB.login('email,read_stream,publish_stream').then(
    // OpenFB.login('email,read_stream').then(
    // 	function () {
	   //  	$location.path('/app/person/me/feed');
	   //  },
	   //  function () {
	   //  	alert('OpenFB login failed');
	   //  };

    // $scope.facebookLogin = function () {

    //     OpenFB.login('email,read_stream,publish_stream').then(
    //         function () {
    //             $location.path('/app/person/me/feed');
    //         },
    //         function () {
    //             alert('OpenFB login failed');
    //         });
    // };

    // window.location.hash = "#/swapp/home";
    // window.location.reload();
  // };
})

.controller('LoginCtrl', function ($scope, $location, OpenFB) {

    $scope.facebookLogin = function () {
    	console.log("FB button clicked");

        OpenFB.login('public_profile,email,read_stream,user_photos').then(
            function () {
                // $location.path('/app/person/me/feed');
                // $location.path('/#/swapp/home');
								window.location.hash = "#/swapp/home";
								window.location.reload();
					    	console.log("location");
            },
            function () {
                alert('OpenFB login failed');
            });
    };

})
.controller('MainCtrl', function($scope, $http, OpenFB) {

  OpenFB.get('/me').success(function (user) {
      $scope.user = user;
  });
  OpenFB.get('/me?fields=cover').success(function (data) {
      $scope.cover = data.cover.source;
  });
  OpenFB.get('/me/picture?redirect=0&height=80&type=normal&width=80').success(function (data) {
      $scope.profilePicture = data.data.url;
  });
})



.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate) {
})

.controller('HomeCtrl', function($scope) {
})

.controller('MessageCtrl', function($scope) {
})


.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate,  $rootScope, $ionicModal, $http, $ionicSideMenuDelegate) {
    // $ionicSideMenuDelegate.edgeDragThreshold(25);
    $rootScope.accepted = 0;
    $rootScope.rejected = 0;
    var cardTypes = [
      { title: 'Nexus 5', image: 'img/swapps/nexus5.jpg' },
      { title: '4 bottles of Champagne', image: 'img/swapps/champagne.jpg' },
      { title: 'COD 4', image: 'img/swapps/cod-4.jpg' },
      { title: 'PlayStation4', image: 'img/swapps/ps4.jpg' },
      { title: 'iPhone', image: 'img/swapps/iphone.jpg' },
      { title: 'Ride-on Lawnmower', image: 'img/swapps/lawnmower.jpg' },
      { title: 'Opel Astra', image: 'img/swapps/opel-astra.jpg' },
      { title: 'Riding boots', image: 'img/swapps/riding-boots.jpg' },
      { title: 'Samsung 42" TV', image: 'img/swapps/samsung-tv.jpg' },
      { title: 'Table', image: 'img/swapps/table.jpg' },
    ];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

    $scope.cardSwiped = function(index) {
      $scope.addCard();
    };

    $scope.openCardDetails = function(cardId) {
      console.log("AMIR: " + cardId);

      // Create our modal
      // $ionicModal.fromTemplateUrl('card-details.html', function(modal) {
      //   $scope.cardDetailsModal = modal;
      // }, {
      //   scope: $scope
      // });

      // $scope.cardDetailsModal.show();


    };

    $scope.cardDestroyed = function(index) {
      if (this.swipeCard.positive === true) {
        $scope.$root.accepted++;
      } else {
        $scope.$root.rejected++;
      }
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    }
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate, $rootScope) {
    $scope.accept = function () {
      var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
      $rootScope.accepted++;
      card.swipe(true);
    }
    $scope.reject = function() {
      var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
      $rootScope.rejected++;
      card.swipe();
    };
})




.controller('CamCtrl', ['$scope', '$location', 'GetUU',
	function($scope, $location, GetUU) {

	// init variables
	$scope.data = {};
	$scope.obj;
	var pictureSource;   // picture source
	var destinationType; // sets the format of returned value
	var url;
	
	// on DeviceReady check if already logged in (in our case CODE saved)
	ionic.Platform.ready(function() {
		//console.log("ready get camera types");
		if (!navigator.camera)
			{
			// error handling
			return;
			}
		//pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
		pictureSource=navigator.camera.PictureSourceType.CAMERA;
		destinationType=navigator.camera.DestinationType.FILE_URI;
		});
	
	// get upload URL for FORM
	GetUU.query(function(response) {
		$scope.data = response;
		//console.log("got upload url ", $scope.data.uploadurl);
		});
	
	// take picture
	$scope.takePicture = function() {
		//console.log("got camera button click");
		var options =   {
			quality: 50,
			destinationType: destinationType,
			sourceType: pictureSource,
			encodingType: 0
			};
		if (!navigator.camera)
			{
			// error handling
			return;
			}
		navigator.camera.getPicture(
			function (imageURI) {
				//console.log("got camera success ", imageURI);
				$scope.mypicture = imageURI;
				},
			function (err) {
				//console.log("got camera error ", err);
				// error handling camera plugin
				},
			options);
		};

	// do POST on upload url form by http / html form    
	$scope.update = function(obj) {
		if (!$scope.data.uploadurl)
			{
			// error handling no upload url
			return;
			}
		if (!$scope.mypicture)
			{
			// error handling no picture given
			return;
			}
		var options = new FileUploadOptions();
		options.fileKey="ffile";
		options.fileName=$scope.mypicture.substr($scope.mypicture.lastIndexOf('/')+1);
		options.mimeType="image/jpeg";
		var params = {};
		params.other = obj.text; // some other POST fields
		options.params = params;
		
		//console.log("new imp: prepare upload now");
		var ft = new FileTransfer();
		ft.upload($scope.mypicture, encodeURI($scope.data.uploadurl), uploadSuccess, uploadError, options);
		function uploadSuccess(r) {
			// handle success like a message to the user
			}
		function uploadError(error) {
			//console.log("upload error source " + error.source);
			//console.log("upload error target " + error.target);
			}
		};
}]);

