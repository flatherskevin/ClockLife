//Javascript for ClockLife

function HourNow(){
	var thisHour = new Date().getHours();
	return ((thisHour + 11) % 12) + 1;
}

function MinuteNow(){
	var thisMinute = new Date().getMinutes();
	return (thisMinute > 9) ? thisMinute : '0' + thisMinute;
}

//Rotates selector based on current second. '6' is used as a constant to align the degrees properly
function RotateSec(thisDiv){
	curSec = new Date().getSeconds();
	degrees = 6 * curSec;
	angle = $(thisDiv).css('-webkit-transform', 'rotate(' + degrees + 'deg)');
}

//Rotates selector based on current minute. '6' is used as a constant to align the degrees properly
function RotateMin(thisDiv){
	curMin = new Date().getMinutes();
	degrees = 6 * curMin;
	angle = $(thisDiv).css('-webkit-transform', 'rotate(' + degrees + 'deg)');
}

//Intializes positions so that current time is the beginning rotation angle on page load
$(document).ready(function(){
	RotateSec('.minute_spinner');
	RotateMin('.hour_spinner');
});
//Object set for all objects within Spinner Clock
Clock_Spinner = {
	
	//Assigns classes to display the hour of day, and inserts calculated hours in 12HR format
	Hour:
	{
		classType: 'hour_spinner display_spinner',
		textDisplay: HourNow(),
		spacerClass: 'spacer-Spinner'
	},

	//The colon between hours and minutes
	DotDot:
	{
		classType: 'dotdot_spinner display_spinner',
		textDisplay: ':'
	},
	
	//Assigns classes to display the minute of day and calculates the current minute
	Minute:
	{
		classType: 'minute_spinner display_spinner',
		textDisplay: MinuteNow(),
		spacerClass: 'spacer-Spinner'
	},

	//Assigns classes to display the second of day and calculates the current second
	Second: 
	{
		classType: 'second_spinner display_spinner',
		textDisplay: new Date().getSeconds()
	},
	
	//Assigns classes for AM / PM and runs a conditional to test which should be displayed
	AmPm:
	{
		classType: 'AMPM_spinner display_spinner',
		textDisplay: (new Date().getHours() > 11) ? 'PM' : 'AM'
	}
}		

//Initialize clocks' app
var Clock = angular.module('Clock',[]);

Clock.controller('MainController',function($scope, $interval){
	$scope.timeSpinner = [Clock_Spinner.Hour,Clock_Spinner.DotDot,Clock_Spinner.Minute,Clock_Spinner.AmPm];
	
	//Define intervals for clocks
	$interval(function(){
		
		//Spinner intervals initiated
		$scope.timeSpinner[0].textDisplay = (((new Date().getHours()) + 11) % 12) + 1;
		$scope.timeSpinner[2].textDisplay = MinuteNow();
		$scope.timeSpinner[3].textDisplay = (new Date().getHours() > 11) ? 'PM' : 'AM';
		
		//Spinner rotation set
		$(document).ready(function(){
			RotateSec('.minute_spinner');
			RotateMin('.hour_spinner');
		});
	}, 500);
});
