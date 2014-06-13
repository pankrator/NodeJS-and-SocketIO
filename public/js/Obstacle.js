var Wall = GameObject.extend(
{
	init: function(x, y, size) {
		this.parent();
		
		this.x = x;
		this.y = y;
		this.size = size;
	},
	
	draw: function(context) {
		context.beginPath();
		context.fillStyle = "blue";
		context.fillRect(this.x, this.y, this.size, this.size);
		context.fill();
	}
	
});