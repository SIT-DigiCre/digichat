import { User } from "@prisma/client";

import { auth } from "./auth";

import { getUserById } from "#/repositories/user";

/**
 * メールアドレスの正規表現 (HTML5における `input[type=email]` の要件と同等)
 * @see https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
 */
export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Userが本登録か判定する
 * @param user
 * @returns User が本登録なら `true`、仮登録なら `false` を返す
 */
export const isVerifiedUser = (user: User) => {
  return user.verifiedAt !== null;
};

/**
 * メールアドレスの形式として適しているか判定する (HTML5における `input[type=email]` の要件と同等)
 * @see https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
 * @param email
 * @returns 形式が適していれば `true`
 */
export const isValidEmail = (email: string) => {
  return emailRegex.test(email);
};

/**
 * ログイン中のユーザーを取得
 * @returns ログイン中のユーザー (未ログインなら `null`)
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const session = await auth();
  if (!session || !session.user.id) return null;

  return await getUserById(session.user.id);
};
