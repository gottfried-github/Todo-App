declare module '../../store/actions/types' {
  interface ErrorPayload {
    errors: { [key: string]: { message?: string } }
  }
}

// must export something, otherwise it becomes an ambient module: https://www.typescriptlang.org/docs/handbook/modules/reference.html#ambient-modules
export const a = 0
