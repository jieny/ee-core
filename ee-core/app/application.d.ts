export declare class Appliaction {
    register(eventName: string, handler: Function): void;
    run(preflight: () => Promise<void>): void;
}
export declare const app: Appliaction;
