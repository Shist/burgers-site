import SignInForm from "../../components/Forms/SignInForm/SignInForm";

import st from "./SignIn.module.scss";

function SignIn({ setCurrForm, setUserToLocalStorage }) {
  return (
    <div className={st["sign-in"]}>
      <SignInForm
        setCurrForm={setCurrForm}
        setUserToLocalStorage={setUserToLocalStorage}
      />
    </div>
  );
}

export default SignIn;
