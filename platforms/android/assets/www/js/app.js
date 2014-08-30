angular.module('swappApp', ['ionic', 'openfb', 'ionic.contrib.ui.cards', 'swapp.services', 'swapp.controllers'])

.run(function ($rootScope, $state, $ionicPlatform, $window, OpenFB) {

    OpenFB.init('594807657304441');
    // OpenFB.init('594807657304441', 'https://www.facebook.com/connect/login_success.html', window.localStorage);
    $ionicPlatform.ready(function () {
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (toState.name !== "intro" && toState.name !== "swappMenu.logout" && !$window.sessionStorage['fbtoken']) {
            $state.go('intro');
            event.preventDefault();
        }
    });

    $rootScope.$on('OAuthException', function() {
        $state.go('app.login');
    });

})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('intro', {
      url: '/',
      templateUrl: 'templates/intro.html',
      controller: 'IntroCtrl'
    })

    .state('login', {
      url: '/',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })


    // SWAPP MAIN MENU
    .state('swappMenu', {
      url: "/swapp",
      abstract: true,
      controller: 'MainCtrl',
      templateUrl: "templates/main.html"
    })

    // SWAPP PAGES
    .state('swappMenu.logout', {
      url: "/logout",
      views: {
        'swappMenuContent' :{
          templateUrl: "templates/views/logout.html",
          controller: "LogoutCtrl"
        }
      }
    })
    .state('swappMenu.home', {
      url: "/home",
      views: {
        'swappMenuContent' :{
          templateUrl: "templates/views/home.html",
          controller: "HomeCtrl"
        }
      }
    })
    .state('swappMenu.settings1', {
      url: "/settings-1",
      views: {
        'swappMenuContent' :{
          templateUrl: "templates/views/settings1.html",
          controller: "CheckinCtrl"
        }
      }
    })
    .state('swappMenu.settings2', {
      url: "/settings-2",
      views: {
        'swappMenuContent' :{
          templateUrl: "templates/views/settings2.html",
          controller: "AttendeesCtrl"
        }
      }
    })

    .state('swappMenu.settings3', {
      url: '/settings-3',
      views: {
        'swappMenuContent': {
          templateUrl: 'templates/views/settings3.html',
          controller: 'SettingsCtrl'
        }
      }
    })


    // OLD ROUTES
    // .state('swappMenu.home', {
    //   url: '/home',
    //   views: {
    //     'home-page': {
    //       templateUrl: 'templates/views/home.html',
    //       controller: 'HomeCtrl'
    //     }
    //   }
    // })

    .state('swappMenu.details', {
      url: '/details',
      views: {
        'swappMenuContent': {
          templateUrl: 'templates/views/details.html',
          controller: 'DetailsCtrl'
        }
      }
    })

    .state('swappMenu.items', {
      url: '/items',
      views: {
        'swappMenuContent': {
          templateUrl: 'templates/views/items.html',
          controller: 'ItemsCtrl'
        }
      }
    })

    .state('swappMenu.message', {
      url: '/message',
      views: {
        'swappMenuContent': {
          templateUrl: 'templates/views/message.html',
          controller: 'MessageCtrl'
        }
      }
    })

    .state('swappMenu.profile', {
      url: '/profile',
      views: {
        'swappMenuContent': {
          templateUrl: 'templates/views/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })



  $urlRouterProvider.otherwise("/");
})

// .controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
//   $scope.attendees = [
//     { firstname: 'Nicolas', lastname: 'Cage' },
//     { firstname: 'Jean-Claude', lastname: 'Van Damme' },
//     { firstname: 'Keanu', lastname: 'Reeves' },
//     { firstname: 'Steven', lastname: 'Seagal' }
//   ];
  
//   $scope.toggleLeft = function() {
//     $ionicSideMenuDelegate.toggleLeft();
//   };
// })

.controller('CheckinCtrl', function($scope) {
  $scope.showForm = true;
  
  $scope.shirtSizes = [
    { text: 'Large', value: 'L' },
    { text: 'Medium', value: 'M' },
    { text: 'Small', value: 'S' }
  ];
  
  $scope.attendee = {};
  $scope.submit = function() {
    if(!$scope.attendee.firstname) {
      alert('Info required');
      return;
    }
    $scope.showForm = false;
    $scope.attendees.push($scope.attendee);
  };
  
})

.controller('AttendeesCtrl', function($scope) {
  
  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, '); 
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };
  
});