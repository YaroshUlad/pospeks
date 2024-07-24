export const sortCompareFunction =
  <T>(
    options: { ascending?: boolean; sortBy?: keyof T | ((val: T) => Any) } = { ascending: true },
  ) =>
  (cur: T, next: T) => {
    const a = options.sortBy
      ? typeof options.sortBy === 'function'
        ? options.sortBy(cur)
        : cur[options.sortBy]
      : cur
    const b = options.sortBy
      ? typeof options.sortBy === 'function'
        ? options.sortBy(next)
        : next[options.sortBy]
      : next

    if (a === undefined || b === undefined) return 0

    if (a === b) {
      return 0
    }

    // nulls sort after anything else
    if (a === null) {
      return 1
    }
    if (b === null) {
      return -1
    }

    if (options.ascending) {
      return a < b ? -1 : 1
    }
    // if descending, highest sorts first
    return a < b ? 1 : -1
  }
