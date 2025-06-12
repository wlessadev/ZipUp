import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { complementoValidation } from '../../utils/validations';

export const NumeroField = ({ control, errors }) => {
  return (
    <Controller
      name="numero"
      control={control}
      rules={{ 
        required: 'Número é obrigatório',
        maxLength: {
          value: 10,
          message: 'Máximo de 10 caracteres'
        },
        pattern: {
          value: /^[0-9]+$/,
          message: 'Apenas números são permitidos'
        }
      }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Número"
          fullWidth
          required
          error={!!errors.numero}
          helperText={errors.numero?.message}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: 10
          }}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            field.onChange(value);
          }}
        />
      )}
    />
  );
};

export const ComplementoField = ({ control, errors }) => {
  return (
    <Controller
      name="complemento"
      control={control}
      rules={complementoValidation}
      render={({ field }) => (
        <TextField
          {...field}
          label="Complemento (opcional)"
          fullWidth
          error={!!errors.complemento}
          helperText={errors.complemento?.message}
          inputProps={{ maxLength: 50 }}
        />
      )}
    />
  );
};