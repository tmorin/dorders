import {valueAsString} from './schema';

describe('schema', function () {

  describe('valueAsString()', function () {
    it('should return the string', function () {
      expect(valueAsString('a text')).toEqual('a text')
    })
    it('should return the first item', function () {
      expect(valueAsString(['first', 'second', 'third'])).toEqual('first')
    })
    it('should return undefined', function () {
      expect(valueAsString()).toBeUndefined()
    })
  })

})
