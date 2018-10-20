const accountSid = 'AC62da8324816413183f116e44edf29fb8';
const authToken = 'ab782b73f24fabd30c5d18ed1b6656d8';
const client = require('twilio')(accountSid, authToken);
const text = 'Hello';

client.messages
    .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: '+15017122661',
        to: '+15558675310'
    })
    .then(message => console.log(message.sid))
    .done();