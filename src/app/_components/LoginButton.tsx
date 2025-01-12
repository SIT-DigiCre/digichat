import { Button } from "@mantine/core";

import { signIn } from "#/libs/auth";

const LoginButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="filled" type="submit">
        Googleでログイン
      </Button>
    </form>
  );
};

export default LoginButton;
