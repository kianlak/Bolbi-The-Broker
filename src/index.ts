export default {
  fetch(request: Request) {
    return new Response("Bolbi the Broker is alive 🦊", {
      status: 200,
    });
  },
};
