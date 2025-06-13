export function validateData(value) {
  const hoje = new Date();
  const dataNasc = new Date(value);
  const idade = hoje.getFullYear() - dataNasc.getFullYear();
  
  return {
    futuro: dataNasc > hoje,
    muitoAntiga: idade > 150
  };
}

export const emailValidation = {
  required: 'E-mail é obrigatório',
  maxLength: {
    value: 100,
    message: 'Máximo de 100 caracteres'
  },
  pattern: {
    // Regex que exige:
    // - 3+ caracteres antes do @
    // - Domínio com 2+ caracteres no TLD
    value: /^[A-Z0-9._%+-]{3,}@[A-Z0-9.-]{3,}\.[A-Z]{2,}$/i,
    message: 'E-mail inválido'
  }
};

/**
 * Validação complexa para nomes completos:
 * - Verifica estrutura mínima (2 palavras significativas)
 * - Gerencia partículas de nomes (de, da, van, etc.)
 * - Impede palavras curtas não reconhecidas
 */
export const nomeValidation = {
  required: 'Nome é obrigatório',
  maxLength: {
    value: 100,
    message: 'Máximo de 100 caracteres'
  },
  validate: (value) => {
    const particulas = [
      'de', 'da', 'das', 'do', 'dos', 'e',
      'van', 'von', 'der', 'den', 'ten', 'ter',
      'di', 'dei', 'del', 'della', 'delle', 'degli',
      'de', 'des', 'du', 'd\'',
      'y', 'del', 'de', 'las', 'los',
      'die', 'das', 'und', 'zu', 'van den', 'van der'
    ];
    
    const words = value.trim().split(/\s+/);
    
    const validWords = words.filter(word => 
      word.length >= 3 || particulas.includes(word.toLowerCase())
    );
    
    const nonParticleWords = words.filter(word => 
      word.length >= 3 && !particulas.includes(word.toLowerCase())
    );
    
    if (nonParticleWords.length < 2) {
      return 'O nome deve conter pelo menos 2 palavras com 3 caracteres ou mais (excluindo partículas)';
    }
    
    // Check for invalid short words (not in particles list)
    const invalidShortWords = words.filter(word => 
      word.length > 0 && word.length < 3 && !particulas.includes(word.toLowerCase())
    );
    
    if (invalidShortWords.length > 0) {
      return 'Palavras com menos de 3 caracteres só são permitidas se forem partículas (ex: "de", "da", etc.)';
    }
    
    return true;
  }
};

/**
 * Validação para números de celular brasileiros:
 * - Formato (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX
 * - Verificação de comprimento (10 ou 11 dígitos)
 */
export const celularValidation = {
  required: 'Celular é obrigatório',
  pattern: {
    value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
    message: 'Formato inválido (use (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX)'
  },
  validate: (value) => {
    const nums = value.replace(/\D/g, '');
    return nums.length === 10 || nums.length === 11 || 'Número incompleto';
  }
};

export const cepValidation = {
  required: 'CEP é obrigatório',
  minLength: {
    value: 9,
    message: 'CEP incompleto'
  },
  maxLength: {
    value: 9,
    message: 'CEP inválido'
  }
};

/**
 * Validação opcional para complemento:
 * - Máximo de 50 caracteres
 * - Exige pelo menos uma letra se preenchido
 */
export const complementoValidation = {
  maxLength: {
    value: 50,
    message: 'Máximo de 50 caracteres'
  },
  validate: (value) => {
    if (value && !/[a-zA-Z]/.test(value)) {
      return 'O complemento deve conter pelo menos uma letra';
    }
    return true;
  }
};