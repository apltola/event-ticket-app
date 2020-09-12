import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async () => {
  // create Ticket instance
  const ticket = Ticket.build({
    title: 'price',
    price: 4,
    userId: '123',
  });

  // save ticket to DB
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // save the first fetched ticket
  await firstInstance!.save();

  // save the second fetched ticket and expect an error
  await secondInstance!.save();
});
