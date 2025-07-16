import Log, { Logger } from "@rbxts/log";

export function huh(name: string) {
	print("Waiting");
	task.wait(10);
	print("Waited, wtf");
	Log.Info("+DSfjknskf");
	Log.Fatal("sadddddddddddddddddd");
	return `Hello from ${name}!`;
}
export * from "./client/test";
