import SignInForm from "../../components/Forms/SignInForm/SignInForm";

import st from "./SignIn.module.scss";

function SignIn({ setUserToLocalStorage }) {
  return (
    <div className={st["sign-in"]}>
      <SignInForm setUserToLocalStorage={setUserToLocalStorage} />
    </div>
  );
}

export default SignIn;
