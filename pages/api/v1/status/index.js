function status(request, response) {
  response.status(200).json({ mensagem: "funciona bagaça" });
}

export default status;
