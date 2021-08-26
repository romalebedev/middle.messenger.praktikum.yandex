import { assert } from 'chai';
import EventBus from './event-bus';

describe('Check EventBus', () => {
    const eventBus = new EventBus();
    const { listeners } = eventBus;
    const callback = () => 'Hello';

    it('Init EventBus', () => {
        assert.exists(eventBus);
    });

    it('Add listeners', () => {
        const events = ['1', '2', '3'];

        events.forEach((event) => eventBus.on(event, callback));

        assert.hasAllKeys(listeners, events);
        assert.include(listeners['2'], callback);
    });

    it('Delete listeners', () => {
        eventBus.off('2', callback);

        assert.notInclude(listeners['2'], callback);
    });
});
