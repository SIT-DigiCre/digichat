"use client";

import { Box, Container, Flex, Stepper } from "@mantine/core";

import styles from "./StepsIndicator.module.css";

export type Step = {
  title: string;
  description?: string;
};

export type Contents = {
  steps: Step[];
  completed?: string;
};

const StepsIndicator = (props: { active: number; contents: Contents }) => {
  const { active, contents } = props;

  return (
    <>
      <Box>
        <Flex
          hiddenFrom="sm"
          className={styles["mobile-stepper"]}
          align="center"
        >
          {contents.steps[active]?.title ?? contents.completed}
        </Flex>
        <Container
          visibleFrom="sm"
          className={styles["normal-stepper-container"]}
        >
          <Stepper active={active} allowNextStepsSelect={false}>
            {contents.steps.map((step, index) => (
              <Stepper.Step
                key={index}
                label={step.title}
                description={step.description}
              />
            ))}
          </Stepper>
        </Container>
      </Box>
    </>
  );
};

export default StepsIndicator;
