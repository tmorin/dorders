import {ProfileMap} from './ProfileMap';

describe('ProfileMap', function () {

  let mapA0: ProfileMap;
  beforeEach(function () {
    mapA0 = new ProfileMap('RepoA');
    mapA0.set('key0', 'val0')
      .set('key1', 'val1')
      .set('key2', 'val2')
      .set('key3', 'val3');
  })

  it('should returns size', function () {
    expect(mapA0.size).toBe(4);
  })

  it('should clear', function () {
    mapA0.clear();
    expect(mapA0.size).toBe(0);
  })

  it('should delete', function () {
    mapA0.delete('key1');
    expect(mapA0.size).toBe(3);
  })

  it('should foreach', function () {
    let counter = 0;
    mapA0.forEach(() => counter++);
    expect(counter).toBe(4);
  })

  it('should get', function () {
    const value = mapA0.get('key1');
    expect(value).toBe('val1');
  })

  it('should has', function () {
    expect(mapA0.has('key1')).toBeTruthy();
  })

  it('should iterate', function () {
    let counter = 0;
    for (const [key, value] of mapA0) {
      expect(key).toBeTruthy();
      expect(value).toBeTruthy();
      counter++;
    }
    expect(counter).toBe(4);
  })

  it('should iterate on entries', function () {
    let counter = 0;
    for (const [key, value] of mapA0.entries()) {
      expect(key).toBeTruthy();
      expect(value).toBeTruthy();
      counter++;
    }
    expect(counter).toBe(4);
  })

  it('should iterate on keys', function () {
    let counter = 0;
    for (const key of mapA0.keys()) {
      expect(key).toBeTruthy();
      counter++;
    }
    expect(counter).toBe(4);
  })

  it('should iterate on values', function () {
    let counter = 0;
    for (const value of mapA0.values()) {
      expect(value).toBeTruthy();
      counter++;
    }
    expect(counter).toBe(4);
  })

  it('should clone', function () {
    const mapB0 = mapA0.clone('RepoB');
    expect(mapB0.size).toBe(4);
    expect(mapB0.repositoryId).toBe('RepoB');
  })

  it('should replace', function () {
    const mapB0 = new ProfileMap('RepoB').set('foo', 'bar').replaceBy(mapA0);
    expect(mapB0.size).toBe(4);
    expect(mapB0.repositoryId).toBe('RepoB');
  })

  it('should handle observers', function () {
    const mapB0 = mapA0.clone('RepoB');

    let repoAEvents = [];
    mapA0.addObserver((newProfileMap) => {
      repoAEvents.push(newProfileMap);
    });

    let repoBEvents = [];
    mapB0.addObserver((event) => {
      repoBEvents.push(event)
    });

    mapA0.clear();
    mapA0.done();
    expect(repoAEvents.length).toBe(0);
    expect(repoBEvents.length).toBe(1);

    mapB0.set('val0', 'key0B0').done();
    expect(repoAEvents.length).toBe(1);
    expect(repoBEvents.length).toBe(1);

    mapA0.set('val0', 'key0A0').set('val1', 'key1A0').done();
    expect(repoAEvents.length).toBe(1);
    expect(repoBEvents.length).toBe(2);

    mapB0.delete('val0');
    mapB0.done();
    expect(repoAEvents.length).toBe(2);
    expect(repoBEvents.length).toBe(2);

    mapB0.removeObservers();
    mapA0.removeObservers();

    mapA0.clear();
    mapB0.clear();

    expect(repoAEvents.length).toBe(2);
    expect(repoBEvents.length).toBe(2);
  })
})
