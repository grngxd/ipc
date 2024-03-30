-- Compiled with roblox-ts v2.3.0
local TS = _G[script]
local ReplicatedStorage = TS.import(script, TS.getModule(script, "@rbxts", "services")).ReplicatedStorage
local _class
do
	_class = setmetatable({}, {
		__tostring = function()
			return "Anonymous"
		end,
	})
	_class.__index = _class
	function _class.new(...)
		local self = setmetatable({}, _class)
		return self:constructor(...) or self
	end
	function _class:constructor()
	end
	function _class:create(name)
		local RemoteEvent = Instance.new("RemoteEvent")
		RemoteEvent.Name = name
		RemoteEvent.Parent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Remote")
		return RemoteEvent
	end
	function _class:on(name, callback)
		local RemoteEvent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Remote"):FindFirstChild(name)
		-- if the event is undefined, call new to create it
		local _remoteEvent = RemoteEvent
		if type(_remoteEvent) == "nil" then
			self:create(name)
			RemoteEvent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Remote"):WaitForChild(name)
		end
		local conn = RemoteEvent.OnServerEvent:Connect(function(player, ...)
			local args = { ... }
			return callback(player, unpack(args))
		end)
		return conn
	end
	function _class:fire(name, player, ...)
		local args = { ... }
		local RemoteEvent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Remote"):FindFirstChild(name)
		-- if the event is undefined, call new to create it
		local _remoteEvent = RemoteEvent
		if type(_remoteEvent) == "nil" then
			self:create(name)
			RemoteEvent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Remote"):WaitForChild(name)
		end
		RemoteEvent:FireClient(player, unpack(args))
	end
	function _class:fireAll(name, ...)
		local args = { ... }
		local RemoteEvent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Remote"):FindFirstChild(name)
		-- if the event is undefined, call new to create it
		local _remoteEvent = RemoteEvent
		if type(_remoteEvent) == "nil" then
			self:create(name)
			RemoteEvent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Remote"):WaitForChild(name)
		end
		RemoteEvent:FireAllClients(unpack(args))
	end
	function _class:fireServer(name, ...)
		local args = { ... }
		local RemoteEvent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Remote"):FindFirstChild(name)
		-- if the event is undefined, call new to create it
		local _remoteEvent = RemoteEvent
		if type(_remoteEvent) == "nil" then
			self:create(name)
			RemoteEvent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Remote"):WaitForChild(name)
		end
		RemoteEvent:FireServer(unpack(args))
	end
end
local _class_1
do
	_class_1 = setmetatable({}, {
		__tostring = function()
			return "Anonymous"
		end,
	})
	_class_1.__index = _class_1
	function _class_1.new(...)
		local self = setmetatable({}, _class_1)
		return self:constructor(...) or self
	end
	function _class_1:constructor()
	end
	function _class_1:create(name)
		local BindableEvent = Instance.new("BindableEvent")
		BindableEvent.Name = name
		BindableEvent.Parent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Bindable")
		return BindableEvent
	end
	function _class_1:on(name, callback)
		local BindableEvent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Bindable"):FindFirstChild(name)
		-- if the event is undefined, call new to create it
		local _bindableEvent = BindableEvent
		if type(_bindableEvent) == "nil" then
			self:create(name)
			BindableEvent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Bindable"):WaitForChild(name)
		end
		local conn = BindableEvent.Event:Connect(function(...)
			local args = { ... }
			return callback(unpack(args))
		end)
		return conn
	end
	function _class_1:fire(name, ...)
		local args = { ... }
		local BindableEvent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Bindable"):FindFirstChild(name)
		-- if the event is undefined, call new to create it
		local _bindableEvent = BindableEvent
		if type(_bindableEvent) == "nil" then
			self:create(name)
			BindableEvent = ReplicatedStorage:WaitForChild("IPC"):WaitForChild("Bindable"):WaitForChild(name)
		end
		BindableEvent:Fire(unpack(args))
	end
end
local IPC
do
	IPC = setmetatable({}, {
		__tostring = function()
			return "IPC"
		end,
	})
	IPC.__index = IPC
	function IPC.new(...)
		local self = setmetatable({}, IPC)
		return self:constructor(...) or self
	end
	function IPC:constructor()
	end
	function IPC:init()
		-- Create the folder that holds all events
		local IPCFolder = Instance.new("Folder")
		IPCFolder.Name = "IPC"
		IPCFolder.Parent = ReplicatedStorage
		-- Create the Remote and Bindable folders
		local RemoteFolder = Instance.new("Folder")
		RemoteFolder.Name = "Remote"
		RemoteFolder.Parent = IPCFolder
		local BindableFolder = Instance.new("Folder")
		BindableFolder.Name = "Bindable"
		BindableFolder.Parent = IPCFolder
	end
	IPC.Remote = _class
	IPC.Bindable = _class_1
end
local default = IPC
return {
	default = default,
}
