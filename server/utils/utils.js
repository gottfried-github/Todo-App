export class Response {
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
