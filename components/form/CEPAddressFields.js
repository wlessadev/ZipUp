import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import styles from '../../styles/Cadastro.module.css';

//componentes para campos os quais são preenchidos automaticamente após a busca do CEP
export function EnderecoField({ control, errors }) {
  return (
    <Controller
      name="endereco"
      control={control}
      rules={{ required: 'Endereço é obrigatório' }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Endereço"
          fullWidth
          required
          error={!!errors.endereco}
          helperText={errors.endereco?.message}
          InputProps={{
            readOnly: true,
            sx: { pointerEvents: 'none' }
          }}
          className={styles.readOnlyField}
          InputLabelProps={{
            className: styles.readOnlyLabel
          }}
        />
      )}
    />
  );
}

export function BairroField({ control, errors }) {
  return (
    <Controller
      name="bairro"
      control={control}
      rules={{ required: 'Bairro é obrigatório' }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Bairro"
          fullWidth
          required
          error={!!errors.bairro}
          helperText={errors.bairro?.message}
          InputProps={{
            readOnly: true,
            sx: { pointerEvents: 'none' }
          }}
          className={styles.readOnlyField}
          InputLabelProps={{
            className: styles.readOnlyLabel
          }}
        />
      )}
    />
  );
}

export function CidadeField({ control, errors }) {
  return (
    <Controller
      name="cidade"
      control={control}
      rules={{ required: 'Cidade é obrigatória' }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Cidade"
          fullWidth
          required
          error={!!errors.cidade}
          helperText={errors.cidade?.message}
          InputProps={{
            readOnly: true,
            sx: { pointerEvents: 'none' }
          }}
          className={styles.readOnlyField}
          InputLabelProps={{
            className: styles.readOnlyLabel
          }}
        />
      )}
    />
  );
}

export function UfField({ control, errors }) {
  return (
    <Controller
      name="uf"
      control={control}
      rules={{ required: 'UF é obrigatória' }}
      render={({ field }) => (
        <TextField
          {...field}
          label="UF"
          fullWidth
          required
          error={!!errors.uf}
          helperText={errors.uf?.message}
          InputProps={{
            readOnly: true,
            sx: { pointerEvents: 'none' }
          }}
          className={styles.readOnlyField}
          InputLabelProps={{
            className: styles.readOnlyLabel
          }}
        />
      )}
    />
  );
}