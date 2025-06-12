export function formatarCelularInput(value) {
  const nums = value.replace(/\D/g, '');
  if (nums.length <= 2) return nums;
  if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
  if (nums.length <= 10) return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6, 10)}`;
  return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7, 11)}`;
}

export function formatarCEPInput(value, callback = null) {
  const cepNumeros = value.replace(/\D/g, '');
  const cepFormatado = cepNumeros.length > 5 
    ? `${cepNumeros.slice(0, 5)}-${cepNumeros.slice(5, 8)}` 
    : cepNumeros;
  
  // Se tiver 8 dígitos e um callback foi fornecido, executa
  if (callback && cepNumeros.length === 8) {
    callback(cepNumeros);
  }
  
  return cepFormatado;
}