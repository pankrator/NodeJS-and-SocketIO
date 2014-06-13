var Entity = GameObject.extend(
{
	
	init: function(x, y, size) {
	
		this.parent();
		
		this.x = x;
		this.y = y;
		this.sizeX= size;
		this.sizeY = size;
		this.collisionMesh = new RectangleMesh(this.x, this.y, size);
	},
	
	update: function() {
		this.move();
	},
	
	draw: function(context) {
	},
	
	getAABB: function() {
		return this.collisionMesh;
	}
});
