module MainModule {
	export class NetworkView {
		
		public target: NetworkUpdatable;
		private properties: any[];
		private socket: SocketIO.Socket;
		private updateContext: NetworkUpdateContext;
		private id: string;
		
		constructor(target: NetworkUpdatable, socket: SocketIO.Socket, context: NetworkUpdateContext, id: string) {
			this.target = target;
			this.socket = socket;
			this.properties = new Array<any>();
			this.updateContext = context;
			this.id = id;
			
			for(var prop in target) {
				if(!(target[prop] instanceof Function)) {
					this.properties.push({name: prop, value: target[prop] });
				}
			}
			console.log("Registered: " + "update" + this.updateContext + this.id);
			this.socket.on("update" + this.updateContext + this.id, this.updateTarget); 
			
			//window.setTimeout(this.update, 100);
		}
		
		private updateTarget = (data: any): void => {
			this.target.updateState(data);
		}
		
		public update = (): void => {
			var data = new Array<any>();
			var dirty = false;
			for(var i = 0; i < this.properties.length; i++) {
				if(this.target[this.properties[i].name] != this.properties[i].value) {
					this.properties[i].value = this.target[this.properties[i].name];
					data.push(this.properties[i]);
					dirty = true;
				}
			}
			if(dirty) {
//				data.push({name: "id", value: this.socket.io.engine.id});
				this.socket.emit("update" + this.updateContext,{id: this.id, data: data});
			}
			if(this.target != null) {
				window.setTimeout(this.update, 100);
			}
		}
	}	
}