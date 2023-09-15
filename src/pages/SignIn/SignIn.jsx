import SignInForm from "../../components/Forms/SignInForm/SignInForm";

import st from "./SignIn.module.scss";

function SignIn({ setUserToLocal }) {
  return (
    <div className={st["sign-in"]}>
      <SignInForm setUserToLocal={setUserToLocal} />
    </div>
  );
}

export default SignIn;
