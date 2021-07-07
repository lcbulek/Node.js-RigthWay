'use strict'
const assert = require('assert')
const EventEmitter = require('events').EventEmitter
const LDJClient = require('../lib/ldj-client.js')

describe('LDJClient', () => {
    let stream = null
    let client = null

    beforeEach(() => {
        stream = new EventEmitter()
        client = new LDJClient(stream)
    });

    it('Should emit a message event from split data events', done => {
        client.on('message', message => {
            assert.deepStrictEqual(message, { foo: 'bar' });
            done();
        });
        stream.emit('data', '{"foo":');
        process.nextTick(() => stream.emit('data', '"bar"}​​\​​n'));
    });
});