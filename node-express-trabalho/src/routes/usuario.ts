import { Router, Request, Response } from "express";
import { usuarios } from "../utils/usuarios";

const router = Router();


let listaUsuarios = [...usuarios];


router.get("/", (req: Request, res: Response) => {
  res.status(200).json(listaUsuarios);
});


router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const usuario = listaUsuarios.find((u) => u.id === id);

  if (!usuario) {
    res.status(404).json({ mensagem: "Utilizador não encontrado." });
    return;
  }

  res.status(200).json(usuario);
});


router.post("/", (req: Request, res: Response) => {
  const { nome, idade } = req.body;

  if (!nome || idade === undefined) {
    res.status(400).json({ mensagem: "Os campos 'nome' e 'idade' são obrigatórios." });
    return;
  }

  const novoUsuario = {
    id: listaUsuarios.length > 0 ? listaUsuarios[listaUsuarios.length - 1].id + 1 : 1,
    nome,
    idade: Number(idade),
  };

  listaUsuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { nome, idade } = req.body;

  const index = listaUsuarios.findIndex((u) => u.id === id);

  if (index === -1) {
    res.status(404).json({ mensagem: "Utilizador não encontrado." });
    return;
  }

  if (!nome || idade === undefined) {
    res.status(400).json({ mensagem: "Os campos 'nome' e 'idade' são obrigatórios." });
    return;
  }

  listaUsuarios[index] = { id, nome, idade: Number(idade) };
  res.status(200).json(listaUsuarios[index]);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const index = listaUsuarios.findIndex((u) => u.id === id);

  if (index === -1) {
    res.status(404).json({ mensagem: "Utilizador não encontrado." });
    return;
  }

  const usuarioRemovido = listaUsuarios.splice(index, 1)[0];
  res.status(200).json({
    mensagem: "Utilizador removido com sucesso.",
    usuario: usuarioRemovido,
  });
});

export default router;