export default class Vector {
	public static Distance(origin: Vector3, target: Vector3): number {
		return origin.sub(target).Magnitude;
	}
}
