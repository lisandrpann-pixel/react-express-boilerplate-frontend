export type Action<T = unknown> = (args: T) => void

export type ActionAsync<T = unknown> = (args: T) => Promise<void>