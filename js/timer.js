function Timer(hours, minutes, seconds){

		// Checking for NaN
		h = (hours !== hours)? 0 : hours;
		m = (minutes !== minutes)? 0 : minutes;
		s = (seconds !== seconds)? 0 : seconds;

		getHours = function(){
			if(this.h < 10)
				return "0" + this.h;

			return this.h;
		};


		getMinutes = function(){
			if(this.m < 10)
				return "0" + this.m;
			return this.m;
		};


		getSeconds = function(){
			if(this.s < 10)
				return "0" + this.s;
			return this.s;
		};

		setSeconds = function(){
			if(this.s === 0)
				this.s = 59;
			else
				this.s -= 1;
		};

		setMinutes = function(){
			if( this.h !== 0 || this.m !== 0){
				if(this.m === 0)
					this.m = 59;
				else
					this.m -= 1;
			}
		};

		setHours = function(){
			if(this.h !== 0)
				this.h -= 1;
		};

		// returns true if 5 or less seconds is remaining
		isFiveSecondRemaining = function(){
			if(this.h == 0 && this.m ==0 && (this.s > 0 && this.s < 6)){
				document.getElementById("audio").play();
			}
		};

		updateTime = function(){
			// Update seconds, then minutes, and then hours
			if(this.s !== 0 || this.m !== 0 || this.h !== 0){
				// Seconds are always updated except when minutes, seconds, and hour are all zero
				this.setSeconds();

				// minutes are update is timer has 59 seconds
				if(this.s == 59){
					this.setMinutes();
				}

				// hour is update when minutes = 59 and seconds = 59
				if(this.m == 59 & this.s == 59){
					this.setHours();
				}
				this.isFiveSecondRemaining();
			}

		};

		printTime = function(){
			document.getElementById("time_display").innerHTML = this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
			this.updateTime();
		};
}
