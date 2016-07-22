const socket = io();
let name = getQueryVariable('name') || 'Anonymous';
let room = getQueryVariable('room');

socket.on('connect', () => {
  console.log('Connected to socket.io server!')
})

socket.on('message', message => {
  let momentTimestamp = moment(message.timestamp);
  let $message = jQuery('.messages');

  console.log('New message');
  console.log(message.text);

  $message.append(`<p><strong>${message.name} ${momentTimestamp.format('h:mm a')}</strong></p>`)
  $message.append(`<p>${message.text}</p>`)
});

let $form =jQuery('#message-form');
$form.on('submit', event => {
  event.preventDefault();
  let $message = $form.find('input[name=message]');
  socket.emit('message', {
    name: name,
    text: $message.val()
  });

  $message.val('');
})
