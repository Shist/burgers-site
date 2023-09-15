import SignInForm from "../../components/Forms/SignInForm/SignInForm";

import st from "./SignIn.module.scss";

function SignIn({ setUserToLocal }) {
  return (
    <main className={st["sign-in"]}>
      <SignInForm setUserToLocal={setUserToLocal} />
    </main>
  );
}

export default SignIn;
