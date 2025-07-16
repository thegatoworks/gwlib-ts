export default class Math {
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

    public static Mul(sequence: NumberSequence, value: number): NumberSequence;

    public static Mul(first: unknown, second: unknown): unknown {
        // Multiply number sequence by a number

        if (typeIs(first, "NumberSequence") && typeIs(second, "number")) {
            const newKeypoints: NumberSequenceKeypoint[] = [];

            for (const keypoint of first.Keypoints) {
                newKeypoints.push(
                    new NumberSequenceKeypoint(keypoint.Time, keypoint.Value * second, keypoint.Envelope),
                );
            }

            return new NumberSequence(newKeypoints);
        } 
        else 
        {
            throw new InvalidMultiplicationException(
                `Attempt to multiply ${typeOf(first)} and ${typeOf(second)} which is not supported by Math.Mul().`,
            );
        }
    }
}

class InvalidMultiplicationException {
    public readonly name = "InvalidMultiplicationException";
    constructor(public msg: string) {}

    toString() {
        return `${this.name}: ${this.msg}`;
    }
}
