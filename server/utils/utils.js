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

export function parseBody(req, cb) {
  let body = ''

  req.setEncoding('utf8')

  return req
    .on('error', error => {
      console.log(`Server, req error event occured - error:`, error)

      res.statusCode = 500

      res.end(JSON.stringify(error))
    })
    .on('data', chunk => {
      body += chunk

      if (body.length > 1e6) {
        req.destroy()
      }
    })
    .on('end', () => {
      cb(JSON.parse(body))
    })
}
