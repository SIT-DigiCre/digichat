"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@mantine/core";
import { JWT } from "next-auth/jwt";
import { useSession } from "next-auth/react";

const FinishButton = () => {
  const router = useRouter();
  const { update } = useSession();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleVerify = async () => {
    setIsDisabled(true);
    try {
      const res = await fetch("/api/user/verify", { method: "POST" });

      // 既に本登録済みならスキップ
      if (res.status !== 409) {
        if (!res.ok) {
          throw new Error("本登録処理に失敗しました");
        }

        await update({ verified: true } satisfies JWT);
      }
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <Button onClick={handleVerify} disabled={isDisabled}>
        Digichatをはじめる
      </Button>
    </>
  );
};

export default FinishButton;
