import Link from "next/link";
import { redirect } from "next/navigation";

import { Button, Card, Stack, Text } from "@mantine/core";

import styles from "./WorkspaceSelector.module.css";

import {
  addUserToWorkspace,
  getJoinableWorkspaces,
  getJoinedWorkspaces,
} from "#/repositories/workspace";

const addUserToWorkspaceAction = async (
  userId: string,
  workspaceId: string
) => {
  "use server";
  await addUserToWorkspace(userId, workspaceId, "hoge");
  redirect("http://localhost:3000/joined?p=3");
};

const WorkspaceSelector = async (props: { userId: string }) => {
  const { userId } = props;

  const [joinableWorkspaces, joinedWorkspaces] = await Promise.all([
    getJoinableWorkspaces(userId),
    getJoinedWorkspaces(userId),
  ]);

  return (
    <Stack>
      {joinableWorkspaces.map((workspace) => {
        const action = addUserToWorkspaceAction
          .bind(null, userId)
          .bind(null, workspace.id);
        return (
          <form key={workspace.id} action={action}>
            <Card
              component="button"
              type="submit"
              w="100%"
              withBorder
              className={styles["workspace-card"]}
            >
              <Text fw="bold">{workspace.name}</Text>
              <Text size="sm">{workspace.description}</Text>
            </Card>
          </form>
        );
      })}
      {joinableWorkspaces.length === 0 && (
        <Text>参加できるワークスペースがありません</Text>
      )}
      {joinedWorkspaces.length > 0 && (
        <Button component={Link} href="?p=3">
          既にワークスペースに参加しているのでスキップ
        </Button>
      )}
    </Stack>
  );
};

export default WorkspaceSelector;
