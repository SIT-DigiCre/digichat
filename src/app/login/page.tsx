import { Button, Space, Text } from "@mantine/core";

import LoginButton from "../_components/LoginButton";

import { auth, signOut } from "#/libs/auth";

const SignInPage = async () => {
  const session = await auth();

  return (
    <>
      <Space h="3rem" />
      <Text>Digichat</Text>
      {session ? (
        <>
          <Text>{session.user?.name} としてログイン中</Text>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button type="submit">ログアウト</Button>
          </form>
        </>
      ) : (
        <>
          <LoginButton />
        </>
      )}
    </>
  );
};

export default SignInPage;
