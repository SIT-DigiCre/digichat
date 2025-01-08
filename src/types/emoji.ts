/*
@types/emoji-martは更新が行われておらず、型定義エラーが発生するため、独自に型定義を記述
*/
export interface EmojiData {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
  skin: number;
  aliases: string[];
}
