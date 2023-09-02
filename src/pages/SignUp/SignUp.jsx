import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";

import st from "./SignUp.module.scss";

function SignUp({ setCurrForm, setUserToLocalStorage }) {
  return (
    <main className={st["sign-up"]}>
      <SignUpForm
        setCurrForm={setCurrForm}
        setUserToLocalStorage={setUserToLocalStorage}
      />
    </main>
  );
}

export default SignUp;
