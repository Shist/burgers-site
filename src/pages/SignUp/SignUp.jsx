import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";

import st from "./SignUp.module.scss";

function SignUp({ setUserToLocal }) {
  return (
    <main className={st["sign-up"]}>
      <SignUpForm setUserToLocal={setUserToLocal} />
    </main>
  );
}

export default SignUp;
