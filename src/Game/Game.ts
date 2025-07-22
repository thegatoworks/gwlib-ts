export default class Game {
    // TODO: Figure out how to drop the className param and use generics only with flamework
    public static GetDescendantsOfType<T extends keyof Instances>(ancestor: Instance, className: T): Instances[T][] {
        return ancestor.GetDescendants().filter((v) => v.IsA(className));
    }

    public static GetChildrenOfType<T extends keyof Instances>(parent: Instance, className: T): Instances[T][] {
        return parent.GetChildren().filter((inst) => inst.IsA(className));
    }

    public static ClearChildrenOfType<T extends keyof Instances>(obj: Instance, className: T): void {
        obj.GetChildren().filter(inst => inst.IsA(className)).forEach(inst => inst.Destroy());
    }

    public static ClearChildren(obj: Instance) {
        obj.GetChildren().forEach(inst => inst.Destroy());
    }

    // no idea how to do this honestly, this shit sucks
    // public static Create<T extends keyof CreatableInstances>(instanceType: T, properties?: Partial<WritableProperties<CreatableInstances[T]>>[], lifetime?: number): CreatableInstances[T] {
    //     const inst = new Instance(instanceType);
    //     if(properties !== undefined) {
    //         for (const [key, value] of pairs(properties)) {
    //             (inst)[key] = value; // TypeScript doesn’t know key is assignable, so use 'any'
    //         }
    //     }
    // }
}   