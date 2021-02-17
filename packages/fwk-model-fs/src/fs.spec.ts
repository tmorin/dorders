import {createDirectory, deleteDirectory} from './fs';
import {existsSync} from 'fs';
import rimraf from 'rimraf';

describe('fs', function () {
  beforeEach(function () {
    rimraf.sync('tmp');
  })

  describe('createDirectory()', function () {
    it('should be a function', function () {
      expect(createDirectory).toBeInstanceOf(Function);
    });
    it('should create directory', function () {
      createDirectory('tmp');
      expect(existsSync('tmp')).toBeTruthy();
    });
  })

  describe('deleteDirectory()', function () {
    it('should be a function', function () {
      expect(deleteDirectory).toBeInstanceOf(Function);
    });
    it('should delete directory', function () {
      createDirectory('tmp');
      expect(existsSync('tmp')).toBeTruthy();
      deleteDirectory('tmp');
      expect(existsSync('tmp')).toBeFalsy();
    });
  })
});
