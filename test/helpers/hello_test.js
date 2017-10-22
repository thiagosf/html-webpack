import hello from '../../src/helpers/hello'
import assert from 'assert'

describe('hello', () => {
  it('should return greetings', () => {
    const greetings = hello('John')
    assert.equal('Hello John!', greetings)
  })
})
