import { assert } from 'chai';
import Message from './index';

describe('check Message', () => {
    it('create Message', () => {
        const resultBlock = new Message({
            text: 'test',
        });
        const { _meta } = resultBlock;
        const { props } = _meta;
        assert.exists(resultBlock);
        assert.propertyVal(_meta, 'tagName', 'div');
        assert.propertyVal(props, 'text', 'test');
    });
});
