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
		static create(name: string) {
			const RemoteEvent = new Instance("RemoteEvent");
			RemoteEvent.Name = name;
			RemoteEvent.Parent = ReplicatedStorage.WaitForChild("IPC").WaitForChild("Remote");
			return RemoteEvent;
		}

		// Listen for a RemoteEvent
		static on<T extends unknown[]>(name: string, callback: (player: Player, ...args: T) => void) {
			let RemoteEvent = ReplicatedStorage.WaitForChild("IPC")
				.WaitForChild("Remote")
				.FindFirstChild(name) as RemoteEvent;

			// if the event is undefined, call new to create it
			if (typeIs(RemoteEvent, "nil")) {
				this.create(name);
				RemoteEvent = ReplicatedStorage.WaitForChild("IPC")
					.WaitForChild("Remote")
					.WaitForChild(name) as RemoteEvent;
			}

			RemoteEvent.OnServerEvent.Connect((player: Player, ...args: unknown[]) => callback(player, ...(args as T)));
		}

		// Fire a RemoteEvent to a client
		static fire(name: string, player: Player, ...args: unknown[]) {
			let RemoteEvent = ReplicatedStorage.WaitForChild("IPC")
				.WaitForChild("Remote")
				.FindFirstChild(name) as RemoteEvent;

			// if the event is undefined, call new to create it
			if (typeIs(RemoteEvent, "nil")) {
				this.create(name);
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
				.FindFirstChild(name) as RemoteEvent;

			// if the event is undefined, call new to create it
			if (typeIs(RemoteEvent, "nil")) {
				this.create(name);
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
				.FindFirstChild(name) as RemoteEvent;

			// if the event is undefined, call new to create it
			if (typeIs(RemoteEvent, "nil")) {
				this.create(name);
				RemoteEvent = ReplicatedStorage.WaitForChild("IPC")
					.WaitForChild("Remote")
					.WaitForChild(name) as RemoteEvent;
			}

			RemoteEvent.FireServer(...args);
		}
	};

	static Bindable = class {
		// Create a new BindableEvent
		static create(name: string) {
			const BindableEvent = new Instance("BindableEvent");
			BindableEvent.Name = name;
			BindableEvent.Parent = ReplicatedStorage.WaitForChild("IPC").WaitForChild("Bindable");
			return BindableEvent;
		}

		// Listen for a BindableEvent
		static on<T extends unknown[]>(name: string, callback: (...args: T) => void) {
			let BindableEvent = ReplicatedStorage.WaitForChild("IPC")
				.WaitForChild("Bindable")
				.FindFirstChild(name) as BindableEvent;

			// if the event is undefined, call new to create it
			if (typeIs(BindableEvent, "nil")) {
				this.create(name);
				BindableEvent = ReplicatedStorage.WaitForChild("IPC")
					.WaitForChild("Bindable")
					.WaitForChild(name) as BindableEvent;
			}

			BindableEvent.Event.Connect((...args: unknown[]) => callback(...(args as T)));
		}

		// Fire a BindableEvent
		static fire(name: string, ...args: unknown[]) {
			let BindableEvent = ReplicatedStorage.WaitForChild("IPC")
				.WaitForChild("Bindable")
				.FindFirstChild(name) as BindableEvent;

			// if the event is undefined, call new to create it
			if (typeIs(BindableEvent, "nil")) {
				this.create(name);
				BindableEvent = ReplicatedStorage.WaitForChild("IPC")
					.WaitForChild("Bindable")
					.WaitForChild(name) as BindableEvent;
			}

			BindableEvent.Fire(...args);
		}
	};
}

export default IPC;
