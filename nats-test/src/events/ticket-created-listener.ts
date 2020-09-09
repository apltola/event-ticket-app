import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log(`Event data ===> ${JSON.stringify(data)}`);

    console.log(`title: ${data.title} `);
    console.log(`price: ${data.price} `);

    // mark the event as successfully being parsed
    msg.ack();
  }
}
