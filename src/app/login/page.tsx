import LoginButton from "../_components/LoginButton";

import { auth } from "#/libs/auth";

const SignInPage = async () => {
  const session = await auth();

  return (
    <>
      <LoginButton />
      {session && (
        <div>
          <p>Logged in as {session.user?.email}</p>
        </div>
      )}
    </>
  );
};

export default SignInPage;
