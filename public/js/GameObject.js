var GameObject = Object.extend(
{

	construct: function(params) {
		for(param in params) {
			this[param] = params[param];
		}		
	},
	
	init: function() {
		
	}
});
