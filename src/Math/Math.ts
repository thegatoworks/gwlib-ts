export default class Math {
    // ? Internal definition for transforming a NumberSequence by a scalar
    private static _transform(seq: NumberSequence | ColorSequence, transformer: (value: number) => number): NumberSequence | ColorSequence {
        // ? Transform number sequence
        if(typeIs(seq, "NumberSequence")) {
            const newKeypoints = seq.Keypoints.map((kp) => {
                return new NumberSequenceKeypoint(
                    kp.Time,
                    transformer(kp.Value),
                    kp.Envelope,
                );
            });
            return new NumberSequence(newKeypoints);
        }
        // ? Transform color sequence
        else if(typeIs(seq, "ColorSequence")) {
            const newKeypoints = seq.Keypoints.map(kp =>
                new ColorSequenceKeypoint(
                    kp.Time,
                    new Color3(transformer(kp.Value.R), transformer(kp.Value.G), transformer(kp.Value.B)),
                ),
            );
            return new ColorSequence(newKeypoints);
        }
        // ~ Unsupported type
        else {
            throw new GWInvalidOperation("Invalid type provided for Math library operation. Provided: " + typeOf(seq));
        }
    }


    public static Lerp(a: number, b: number, alpha: number): number {
        return (1 - alpha) * a + alpha * b;
    }

    public static InverseLerp(a: number, b: number, alpha: number): number {
        return (alpha - a) / (b - a);
    }

    public static PercentageOf(value: number, maxValue: number, convertToRealPercentage: boolean = false): number {
        const percentage = value / maxValue;
        return convertToRealPercentage ? percentage * 100 : percentage;
    }

    // The types here could get very messy. However, I don't really have another solution as of right now.
    public static Mul(operand: NumberSequence | ColorSequence, scalar: number): NumberSequence | ColorSequence {
        return this._transform(operand, (v) => v * scalar); 
    }
    public static Div(operand: NumberSequence | ColorSequence, scalar: number): NumberSequence | ColorSequence {
        return this._transform(operand, (v) => v / scalar);
    }
    public static Add(operand: NumberSequence | ColorSequence, scalar: number): NumberSequence | ColorSequence {
        return this._transform(operand, (v) => v + scalar);
    }
    public static Sub(operand: NumberSequence | ColorSequence, scalar: number): NumberSequence | ColorSequence {
        return this._transform(operand, (v) => v - scalar);
    }
}

class GWInvalidOperation {
    public readonly name = "InvalidMultiplicationException";
    constructor(public msg: string) {}

    toString() {
        return `${this.name}: ${this.msg}`;
    }
}
