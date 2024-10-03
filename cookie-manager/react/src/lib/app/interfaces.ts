export interface StateManager<T> {
	value: T
	setValue: (value: T) => void
}
