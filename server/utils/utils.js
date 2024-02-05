export class ResponseData {
  constructor(status, data) {
    this.status = status || 200
    this.data = data || null

    if (this.status < 300) {
      this.ok = true
    } else {
      this.ok = false
    }
  }
}

/**
 * @description match /todos/:id pattern. If not matched, return null
 */
export function parseUrl(url) {
  const sections = url.split('/')

  if ('' === sections[0]) {
    sections.shift()
  }

  if ('' === sections[sections.length - 1]) {
    sections.pop()
  }

  if (!sections.length || sections.length > 2 || 'todos' !== sections[0]) {
    return null
  }

  const res = {}

  if (sections[1]) {
    res.id = sections[1]
  }

  return res
}
