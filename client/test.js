let socket = io();

io.on("connection", (sock) => {
    sock.emit("init", {
        register: true,
        username: "MF",
        token: 1000
    }, (id) => {
        sock.emit("message", {
            type: "request",
            body: {
                ownerID: id,
                invitedID: 
        invitedID (int[]),
        public (boolean),
        betType (String),
        payment (int),
        expectedPayment (int),
        betInfo (Object),
        deadline (long),

            }
        })
    });
});