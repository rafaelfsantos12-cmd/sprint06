import { lerMensagens, salvarMensagens } from "../models/store.js";

// Serializa gravações dentro deste único processo Node.js.
let fila = Promise.resolve();

export const enviarMensagem = (req, res) => {
  const { usuario, texto } = req.body ?? {};

  if (
    typeof usuario !== "string" ||
    !usuario.trim() ||
    typeof texto !== "string" ||
    !texto.trim()
  ) {
    return res.status(400).json({ erro: "Informe usuário e mensagem." });
  }

  if (usuario.trim().length > 40 || texto.trim().length > 500) {
    return res.status(400).json({ erro: "Nome ou mensagem muito longos." });
  }

  const tarefa = fila.then(async () => {
    const lista = await lerMensagens();

    const id = lista.reduce(
      (maior, m) => Math.max(maior, Number(m.id) || 0),
      0
    ) + 1;

    const nova = {
      id,
      usuario: usuario.trim(),
      texto: texto.trim(),
      data: new Date().toISOString()
    };

    await salvarMensagens([...lista, nova]);

    return nova;
  });

  fila = tarefa.catch(() => {});

  tarefa
    .then(nova => res.status(201).json(nova))
    .catch(erro => {
      console.error(erro);
      res.status(500).json({ erro: "Não foi possível salvar a mensagem." });
    });
};

export const listarMensagens = async (req, res) => {
  try {
    res.json(await lerMensagens());
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Não foi possível ler as mensagens." });
  }
};

export const buscarMensagem = async (req, res) => {
  try {
    const lista = await lerMensagens();

    const mensagem = lista.find(m => m.id === Number(req.params.id));

    if (!mensagem) {
      return res.status(404).json({ erro: "Mensagem não encontrada." });
    }

    res.json(mensagem);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Falha ao consultar mensagem." });
  }
};

export const totalMensagens = async (req, res) => {
  try {
    res.json({ total: (await lerMensagens()).length });
  } catch (erro) {
    res.status(500).json({ erro: "Falha na contagem." });
  }
};