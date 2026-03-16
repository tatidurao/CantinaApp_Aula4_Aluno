function formatToday() {
  // Ensina: trabalhar com datas no JS
  const now = new Date();
  return now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  });
}

function formatMoney(value) {
  // Ensina: formatação de dinheiro (muito usado em apps)
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}