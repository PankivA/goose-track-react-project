import { Container } from 'components';
import { RegisterForm } from 'components/Forms/RegisterForm/RegisterForm';
import { Helmet } from 'react-helmet';

const RegisterPage = () => {
  return (
    <section style={{ background: '#dcebf7', height: '100vh' }}>
      <Container full_center>
        <Helmet>
          <title>Registration</title>
        </Helmet>
        <RegisterForm />
      </Container>
    </section>
  );
};

export default RegisterPage;
