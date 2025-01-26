import { Stepper as MantineStepper } from "@mantine/core";

import FinishButton from "./FinishButton";

const Stepper = (props: { active: number }) => {
  return (
    <>
      <MantineStepper active={props.active} allowNextStepsSelect={false}>
        <MantineStepper.Step label="ようこそ">
          Digichatへようこそ！
          <br />
          （挨拶文や初期設定を初めましょう的なメッセージを入れる）
        </MantineStepper.Step>
        <MantineStepper.Step label="プロフィールの編集">
          アイコンや自己紹介などを設定
        </MantineStepper.Step>
        <MantineStepper.Step label="ワークスペースに参加">
          ワークスペースを選択して参加する
        </MantineStepper.Step>
        <MantineStepper.Completed>
          これでユーザー登録は完了です！
          <br />
          <FinishButton />
        </MantineStepper.Completed>
      </MantineStepper>
    </>
  );
};

export default Stepper;
