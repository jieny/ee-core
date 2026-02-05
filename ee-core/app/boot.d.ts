export declare class ElectronEgg {
    init(): void;
    register(eventName: string, handler: Function): void;
    run(preflight: () => Promise<void>): void;
}
