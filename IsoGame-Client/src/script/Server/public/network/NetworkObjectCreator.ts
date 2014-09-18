module MainModule {
	export class NetworkObjectCreator {
		
		public static create(object: NetworkUpdatable, socket: SocketIO.Socket, context: NetworkUpdateContext, id: string): NetworkView {
			var networkView: NetworkView = new NetworkView(object, socket, context, id);
			
			return networkView;
		}
	}	
}