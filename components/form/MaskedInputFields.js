import { TextField, CircularProgress } from '@mui/material';
import { Controller } from 'react-hook-form';
import { formatarCelularInput, formatarCEPInput } from '../../utils/masks';
import { celularValidation , cepValidation } from '../../utils/validations';

/**
 * Componente para campo de Celular com formatação automática e validação
 * - Formata o valor conforme o usuário digita (11) 99999-9999
 * - Validação conforme regras definidas em celularValidation
 */
export const CelularField = ({ control, errors }) => {
  return (
    <Controller
      name="celular"
      control={control}
      rules={celularValidation}
      render={({ field }) => (
        <TextField
          {...field}
          label="Telefone/Celular"
          fullWidth
          required
          error={!!errors.celular}
          helperText={errors.celular?.message}
          inputProps={{ maxLength: 15 }}
          onChange={(e) => {
            const formattedValue = formatarCelularInput(e.target.value);
            field.onChange(formattedValue);
          }}
        />
      )}
    />
  );
};

/**
 * Componente para campo de CEP com:
 * - Formatação automática (99999-999)
 * - Validação básica
 * - Busca automática de endereço ao CEP completo
 * - Feedback visual durante carregamento
 * - Tratamento de erros na busca
 */

export const CEPField = ({ control, errors, loadingCEP, cepError, fetchCEP }) => {
  return (
    <Controller
      name="cep"
      control={control}
      rules={cepValidation}
      render={({ field }) => (
        <TextField
          {...field}
          label="CEP"
          fullWidth
          required
          error={!!errors.cep || cepError}
          helperText={
            loadingCEP 
              ? 'Buscando endereço...' 
              : errors.cep?.message || 
                (cepError ? 'Não foi possível encontrar o CEP informado' : '')
          }
          InputProps={{
            // Exibe spinner durante carregamento
            endAdornment: loadingCEP ? <CircularProgress size={20} /> : null
          }}
          inputProps={{ maxLength: 9 }}
          onChange={(e) => {
            const formattedValue = formatarCEPInput(e.target.value, fetchCEP);
            field.onChange(formattedValue);
          }}
        />
      )}
    />
  );
};