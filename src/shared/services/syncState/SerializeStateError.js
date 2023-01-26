export default class SerializeStateError extends Error {
  static SERIALIZE = 'serialize'
  static DESERIALIZE = 'deserialize'

  constructor({ action, data }) {
    super(`Unable to ${action} state`)

    this.name = 'SerializeStateError'
    this.state = data
  }
}
