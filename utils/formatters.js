/**
 * Função para formatação de valores de resumo de formulário
 * 
 * @param {string} key - Nome do campo a ser formatado
 * @param {string} value - Valor do campo
 * @returns {string|JSX.Element} Valor formatado ou componente JSX para emails quebrados
 * 
 * Responsabilidades:
 * - Formata nomes próprios com capitalização correta
 * - Formata números de celular e CEP
 * - Adapta exibição de email para mobile
 * - Padroniza exibição de dados não informados
 */

export function formatarResumo(key, value) {
  const formatarNome = (nome) => {
    if (!nome) return 'Não informado';
    
    const particulas = [
      'de', 'da', 'das', 'do', 'dos', 'e',
      'van', 'von', 'der', 'den', 'ten', 'ter',
      'di', 'dei', 'del', 'della', 'delle', 'degli',
      'de', 'des', 'du', 'd\'',
      'y', 'del', 'de', 'las', 'los',
      'die', 'das', 'und', 'zu', 'van den', 'van der'
    ];
    
    return nome
      .toLowerCase()
      .split(' ')
      .map((palavra, index) => {
        if (index !== 0 && particulas.includes(palavra.toLowerCase())) {
          return palavra.toLowerCase();
        }
        return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
      })
      .join(' ');
  };

  const formatarCelular = (cel) => {
    if (!cel) return 'Não informado';
    const celular = cel.replace(/\D/g, '');
    return celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatarData = (data) => {
    if (!data) return 'Não informado';
    const [year, month, day] = data.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatarCEP = (cep) => {
    if (!cep) return 'Não informado';
    const cepFormatado = cep.replace(/\D/g, '');
    return cepFormatado.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  let valorFormatado = value || 'Não informado';
  
  if (key === 'nome') {
    valorFormatado = formatarNome(value);
  } else if (key === 'email') {
    if (window.innerWidth <= 425 && value && value.includes('@')) {
      const [parte1, parte2] = value.split('@');
      return (
        <Box className="emailBreak">
          <Box>{parte1}</Box>
          <Box>@{parte2}</Box>
        </Box>
      );
    }
    return value || 'Não informado';
  } else if (key === 'celular') {
    valorFormatado = formatarCelular(value);
  } else if (key === 'dataNascimento') {
    valorFormatado = formatarData(value);
  } else if (key === 'cep') {
    valorFormatado = formatarCEP(value);
  } else if (key === 'complemento') {
    return value || 'Não informado';
  }

  return valorFormatado;
}