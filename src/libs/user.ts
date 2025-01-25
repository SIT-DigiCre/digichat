import { User } from "@prisma/client";

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
