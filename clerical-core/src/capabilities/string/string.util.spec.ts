import { StringUtil } from './string.util';

describe('StringUtil', () => {
    it('should convert a string to a hash', () => {
        expect(StringUtil.toHash('test')).toEqual(3556498);
    });
});
