/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        eventName: {
          type: 'string',
          maxLength: 100,
          required: true
        },
        eventType: {
          type: 'string',
          maxLength: 100,
          required: true
        },
        eventHost: {
          type: 'string',
          maxLength: 100,
          required: true
        },
        eventStart: {
          type: 'date',
          required: true
        },
        eventEnd: {
          type: 'date',
          required: true
        },
        location: {
          type: 'string',
          maxLength: 100,
          required: true
        },
        owner: {
          type: 'string'
        }
  }
};
