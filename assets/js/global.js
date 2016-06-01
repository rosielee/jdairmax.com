var Global = (function() {

 	var app = angular.module('App', []);

 	function init() {

 		angularContainer();
 		bubbles();

 	}

 	function flatten(ary) {
 	    var ret = [];
 	    for ( var i = 0; i < ary.length; i++ ) {
 	        if( Array.isArray(ary[i]) ) {
 	            ret = ret.concat(flatten(ary[i]));
 	        } else {
 	            ret.push(ary[i]);
 	        }
 	    }
 	    return ret;
 	}

 	function angularContainer() {

 		app.controller('introCtrl', function( $scope, $http ) {

 			$http.get('../../data.json').success(function(response) {

 				$scope.shopLink = response.intro.shopLink;
 				$scope.heroImg = response.intro.heroImg;
 				$scope.text = response.intro.text.split('\n');
 				$scope.winnerName = response.intro.winnerName;
 				$scope.winnerUrl = response.intro.winnerUrl;

 			});

 		});

 		app.controller('polaroidsCtrl', function( $scope, $http ) {

 			$http.get('../../data.json').success(function(response) {

 				$scope.polaroids = response.polaroids['finalists'];

 				$scope.switchViews = function( view ) {

 					var polaroids = [];

 					if ( view == 'overview' ) {

 						// change body classes
 						$('main').removeClass('winnerview--list');
 						$('main').addClass('winnerview--overview');

 						// show all polaroids
 						polaroids.push( response.polaroids['day1'] );
 						polaroids.push( response.polaroids['day2'] );
 						polaroids.push( response.polaroids['day3'] );
 						polaroids.push( response.polaroids['day4'] );
 						polaroids.push( response.polaroids['day5'] );

 					}

 					if ( view == 'list' ) {

 						$('main').addClass('winnerview--list');
 						$('main').removeClass('winnerview--overview');

 						// show finalists polaroids only
 						polaroids.push( response.polaroids['finalists'] );

 					}

 					$scope.polaroids = flatten(polaroids);

 				}

 			});

 		});

 	}

 	function bubbles() {
 		$(window).on('load', function() {
 			if (window.matchMedia('(min-width: 1024px)').matches) {
 				$('.bubble').movingBubble().click(function(){
 					$(this).movingBubble('toggle');
 				});
 			}
 		});
 	}

 	init();

 })();
