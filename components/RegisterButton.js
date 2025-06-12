import styles from '../styles/Home.module.css';

const RegisterButton = ({ onClick }) => (
  <div
    className={styles.registerButton}
    onClick={onClick}
  >
    Cadastrar
  </div>
);

export default RegisterButton;