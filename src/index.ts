import { ReplicatedStorage } from "@rbxts/services";

class IPC {
	static init(): void {
		// Create the folder that holds all events
		const IPCFolder = new Instance("Folder");
		IPCFolder.Name = "IPC";
		IPCFolder.Parent = ReplicatedStorage;

		// Create the Remote and Bindable folders
		const RemoteFolder = new Instance("Folder");
		RemoteFolder.Name = "Remote";
		RemoteFolder.Parent = IPCFolder;

		const BindableFolder = new Instance("Folder");
		BindableFolder.Name = "Bindable";
		BindableFolder.Parent = IPCFolder;
	}

	static Remote = class {
		// Create a new RemoteEvent
		static new(name: string) {
			const RemoteEvent = new Instance("RemoteEvent");
			RemoteEvent.Name = name;
			RemoteEvent.Parent = ReplicatedStorage.WaitForChild("IPC").WaitForChild("Remote");
			return RemoteEvent;
		}

		// Listen for a RemoteEvent
		static on(name: string, callback: (player: Player, ...args: unknown[]) => void) {
			let RemoteEvent = ReplicatedStorage.WaitForChild("IPC")
				.WaitForChild("Remote")
				.WaitForChild(name) as RemoteEvent;

			// if the event is undefined, call new to create it
			if (!RemoteEvent) {
				IPC.Remote.new(name);
				RemoteEvent = ReplicatedStorage.WaitForChild("IPC")
					.WaitForChild("Remote")
					.WaitForChild(name) as RemoteEvent;
			}

			RemoteEvent.OnServerEvent.Connect(callback);
		}

		// Fire a RemoteEvent to a client
		static fire(name: string, player: Player, ...args: unknown[]) {
			let RemoteEvent = ReplicatedStorage.WaitForChild("IPC")
				.WaitForChild("Remote")
				.WaitForChild(name) as RemoteEvent;

			// if the event is undefined, call new to create it
			if (!RemoteEvent) {
				IPC.Remote.new(name);
				RemoteEvent = ReplicatedStorage.WaitForChild("IPC")
					.WaitForChild("Remote")
					.WaitForChild(name) as RemoteEvent;
			}

			RemoteEvent.FireClient(player, ...args);
		}

		// Fire a RemoteEvent to all players
		static fireAll(name: string, ...args: unknown[]) {
			let RemoteEvent = ReplicatedStorage.WaitForChild("IPC")
				.WaitForChild("Remote")
				.WaitForChild(name) as RemoteEvent;

			// if the event is undefined, call new to create it
			if (!RemoteEvent) {
				IPC.Remote.new(name);
				RemoteEvent = ReplicatedStorage.WaitForChild("IPC")
					.WaitForChild("Remote")
					.WaitForChild(name) as RemoteEvent;
			}

			RemoteEvent.FireAllClients(...args);
		}

		// Fire a RemoteEvent to the server
		static fireServer(name: string, ...args: unknown[]) {
			let RemoteEvent = ReplicatedStorage.WaitForChild("IPC")
				.WaitForChild("Remote")
				.WaitForChild(name) as RemoteEvent;

			// if the event is undefined, call new to create it
			if (!RemoteEvent) {
				IPC.Remote.new(name);
				RemoteEvent = ReplicatedStorage.WaitForChild("IPC")
					.WaitForChild("Remote")
					.WaitForChild(name) as RemoteEvent;
			}

			RemoteEvent.FireServer(...args);
		}
	};

	static Bindable = class {
		// Create a new BindableEvent
		static new(name: string) {
			const BindableEvent = new Instance("BindableEvent");
			BindableEvent.Name = name;
			BindableEvent.Parent = ReplicatedStorage.WaitForChild("IPC").WaitForChild("Bindable");
			return BindableEvent;
		}

		// Listen for a BindableEvent
		static on(name: string, callback: (player: Player, ...args: unknown[]) => void) {
			let BindableEvent = ReplicatedStorage.WaitForChild("IPC")
				.WaitForChild("Bindable")
				.WaitForChild(name) as BindableEvent;

			// if the event is undefined, call new to create it
			if (!BindableEvent) {
				IPC.Bindable.new(name);
				BindableEvent = ReplicatedStorage.WaitForChild("IPC")
					.WaitForChild("Bindable")
					.WaitForChild(name) as BindableEvent;
			}

			BindableEvent.Event.Connect(callback);
		}

		// Fire a BindableEvent
		static fire(name: string, player: Player, ...args: unknown[]) {
			let BindableEvent = ReplicatedStorage.WaitForChild("IPC")
				.WaitForChild("Bindable")
				.WaitForChild(name) as BindableEvent;

			// if the event is undefined, call new to create it
			if (!BindableEvent) {
				IPC.Bindable.new(name);
				BindableEvent = ReplicatedStorage.WaitForChild("IPC")
					.WaitForChild("Bindable")
					.WaitForChild(name) as BindableEvent;
			}

			BindableEvent.Fire(player, ...args);
		}
	};
}

export default IPC;
