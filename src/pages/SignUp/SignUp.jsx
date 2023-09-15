import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";

import st from "./SignUp.module.scss";

function SignUp({ setUserToLocalStorage }) {
  return (
    <main className={st["sign-up"]}>
      <SignUpForm setUserToLocalStorage={setUserToLocalStorage} />
    </main>
  );
}

export default SignUp;
