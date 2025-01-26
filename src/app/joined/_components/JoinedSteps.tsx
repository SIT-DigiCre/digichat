"use client";

import { useState } from "react";

import { Box, Button, Group, Stack } from "@mantine/core";

import Stepper from "./Stepper";

const JoinedSteps = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stack justify="space-between">
        <Box>
          <Stepper active={active} />
        </Box>

        <Group justify="center">
          <Button variant="default" onClick={prevStep} disabled={active === 0}>
            戻る
          </Button>
          <Button variant="filled" onClick={nextStep} disabled={active > 2}>
            次のステップへ
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export default JoinedSteps;
