window.onload = function() {

var banzaiMovie = new Movie ("Buckaroo Banzai",
                            "Cult Classic",
                            5,
                            ["1:00pm", "5:00pm", "7:00pm", "11:00pm"]);
var plan9Movie = new Movie ("PLan 9 from Outer Space",
                            "Cult Classic",
                            2,
                            ["3:00pm", "7:00pm","11:00pm"]);
var forbiddenPlanetMovie = new Movie ("Forbidden Planet",
                            "Classic Sci-fi",
                            5,
                            ["5:00pm","9:00pm"]);
alert(banzaiMovie.getNextShowing());
alert(plan9Movie.getNextShowing());
alert(forbiddenPlanetMovie.getNextShowing());
}

function Movie(title, genre, rating, showtimes) {
	this.title = title;
	this.genre = genre;
	this.rating = rating;
	this.showtimes = showtimes;
	this.getNextShowing = function() {
		var now = new Date().getTime();
		for (var i = 0; i < this.showtimes.length; i++) {
			var showtime = getTimeFromString(this.showtimes[i]);
			if ((showtime - now) > 0) {
				return "Next showing of " + this.title + " is " + this.showtimes[i];
			}
		}
		return null;
	};
}

var movie1 = {
    title: "Plan 9 from Outer space",
    genre: "cult classic",
    rating: 2,
    showtimes: ["3:30pm", "7:00pm", "11:00pm"],

    getNextShowing: function() {
        var now = new Date().getTime();

        for (var i = 0; i < this.showtimes.length; i++) {
            var showtime = getTimeFromString(this.showtimes[i]);
            if ((showtime - now) > 0 ) {
                return "Next showing of " + this.title + " is " + this.showtimes[i];
            }
        }
        return null;
    }
};

var movie2 = {
    title: "Forbidden Planet",
    genre: "classic sci-fi",
    rating: 5,
    showtimes: ["5:00pm", "9:00pm"],

    getNextShowing: function() {
        var now = new Date().getTime();

        for (var i = 0; i < this.showtimes.length; i++) {
            var showtime = getTimeFromString(this.showtimes[i]);
            if ((showtime - now) > 0 ) {
                return "Next showing of " + this.title + " is " + this.showtimes[i];
            }
        }
        return null;
    }
};

var nextShowing = movie1.getNextShowing();
alert(nextShowing);
nextShowing = movie2.getNextShowing();
alert(nextShowing);


function getNextShowing(movie) {
    var now = new Date().getTime();

    for (var i = 0; i < this.showtimes.length; i++) {
        var showtime = getTimeFromString(this.showtimes[i])
        if ((showtime - now) > 0) {
            return "Next showing of " + this.title +  " is " + this.showtimes[i];
        }
    }
    return null;
}

function getTimeFromString(timeString) {
    var theTime = new Date();
    var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/); theTime.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) ); theTime.setMinutes( parseInt(time[2]) || 0 );
    return theTime.getTime();

}



var nextShowing = getNextShowing(movie1);
alert(nextShowing);
nextShowing = getNextShowing(movie2);
alert(nextShowing);