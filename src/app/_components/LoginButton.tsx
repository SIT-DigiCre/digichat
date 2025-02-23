import { Button } from "@mantine/core";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

import { signIn } from "#/libs/auth";

const LoginButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Button
        variant="filled"
        type="submit"
        leftSection={<IconBrandGoogleFilled size={20} />}
      >
        Googleでログイン
      </Button>
    </form>
  );
};

export default LoginButton;
