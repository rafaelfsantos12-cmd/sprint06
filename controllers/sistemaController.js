export const status = (req, res) => res.json({ status: "online", sprint: 6 });

export const sobre = (req, res) => res.send("Mensageiro Local com Node.js, Express e ES Modules.");