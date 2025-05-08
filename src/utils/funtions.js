export const getColor = (value, red, yellow, green) => {
    if (value >= 1 && value <= red) return "bg-red-500"; // rojo
    if (value > red && value <= red + yellow) return "bg-yellow-500"; // amarillo
    if (value > red + yellow && value <= red + yellow + green)
      return "bg-green-500"; // verde
    if (value === 0) return "bg-black"; // negro
    if (value > red + yellow + green) return "bg-blue-500"; // azul
  };