/**
 * Formata um número de celular dinamicamente conforme o usuário digita.
 * - Mantém apenas dígitos
 * - Aplica máscara no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX (para celulares com 9º dígito)
 * 
 * @param {string} value - Valor atual do campo de input
 * @returns {string} Valor formatado com máscara de celular
 */

export function formatarCelularInput(value) {
  const nums = value.replace(/\D/g, '');
  if (nums.length <= 2) return nums;
  if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
  if (nums.length <= 10) return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6, 10)}`;
  return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7, 11)}`;
}

/**
 * Formata CEP e opcionalmente executa callback quando completo (8 dígitos)
 * - Mantém apenas dígitos
 * - Aplica máscara XXXXX-XXX após 5 dígitos
 * - Dispara callback apenas uma vez quando CEP está completo
 * 
 * @param {string} value - Valor atual do campo de input
 * @param {Function|null} [callback=null] - Função opcional para buscar dados do CEP
 * @returns {string} Valor formatado com máscara de CEP
 */
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