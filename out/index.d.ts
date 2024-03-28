declare class IPC {
    static init(): void;
    static Remote: {
        new (): {};
        create(name: string): RemoteEvent<Callback>;
        on<T extends unknown[]>(name: string, callback: (player: Player, ...args: T) => void): void;
        fire(name: string, player: Player, ...args: unknown[]): void;
        fireAll(name: string, ...args: unknown[]): void;
        fireServer(name: string, ...args: unknown[]): void;
    };
    static Bindable: {
        new (): {};
        create(name: string): BindableEvent<Callback>;
        on<T extends unknown[]>(name: string, callback: (...args: T) => void): void;
        fire(name: string, ...args: unknown[]): void;
    };
}
export default IPC;
