import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { nomeValidation, emailValidation } from '../../utils/validations';

export const NomeField = ({ control, errors }) => {
  return (
    <Controller
      name="nome"
      control={control}
      rules={nomeValidation}
      render={({ field }) => (
        <TextField
          {...field}
          label="Nome Completo"
          fullWidth
          required
          error={!!errors.nome}
          helperText={errors.nome?.message}
          inputProps={{ maxLength: 100 }}
        />
      )}
    />
  );
};

export const EmailField = ({ control, errors }) => {
  return (
    <Controller
      name="email"
      control={control}
      rules={emailValidation}
      render={({ field }) => (
        <TextField
          {...field}
          label="E-mail"
          type="email"
          fullWidth
          required
          error={!!errors.email}
          helperText={errors.email?.message}
          inputProps={{ maxLength: 100 }}
        />
      )}
    />
  );
};

export const DataNascimentoField = ({ control, errors, dataError, handleDataChange }) => {
  return (
    <Controller
      name="dataNascimento"
      control={control}
      rules={{ 
        required: 'Data de nascimento é obrigatória',
        validate: () => !dataError.futuro && !dataError.muitoAntiga
      }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Data de Nascimento"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
          error={!!errors.dataNascimento || dataError.futuro || dataError.muitoAntiga}
          helperText={
            dataError.futuro 
              ? 'Data não pode ser no futuro'
              : dataError.muitoAntiga
                ? 'Idade máxima permitida é 150 anos'
                : errors.dataNascimento?.message
          }
          inputProps={{
            max: new Date().toISOString().split('T')[0],
            min: new Date(new Date().getFullYear() - 150, 0, 1).toISOString().split('T')[0]
          }}
          onChange={(e) => {
            field.onChange(e);
            handleDataChange(e.target.value);
          }}
        />
      )}
    />
  );
};