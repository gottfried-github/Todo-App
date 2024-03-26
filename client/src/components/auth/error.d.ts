declare module '../../store/actions/types' {
  interface ErrorPayload {
    errors: { [key: string]: { message?: string } }
  }
}

// must export something, otherwise it becomes an ambient module
export const a = 0
