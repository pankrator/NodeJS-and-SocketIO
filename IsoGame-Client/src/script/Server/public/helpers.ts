module MainModule {
	export class Helper {
		
		public static hitch(context: any, f: Function): Function {
			return function(args: any) { f.call(context, args); };
		}
	}
}