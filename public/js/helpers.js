var helper = {

	hitch: function(context, f) {
		return function(args) { f.call(context, args); };
	}
};