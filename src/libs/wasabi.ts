import AWS from "aws-sdk";
import "server-only";

// Configure the AWS SDK to use Wasabi's endpoint
const s3 = new AWS.S3({
  endpoint: "https://s3.ap-northeast-1.wasabisys.com",
  region: "ap-northeast-1",
  accessKeyId: process.env.WASABI_ACCESS_KEY_ID,
  secretAccessKey: process.env.WASABI_SECRET_ACCESS_KEY,
});

/**
 * @description アセットをWasabiにアップロードし、成功時にURLを返します。この関数は基本的に直接呼び出さず、`POST /api/file`を使用してください。
 * @param buffer アップロードするファイルのバッファ
 * @param bucketName アップロード先のバケット名
 **/
export async function uploadFileToWasabi(
  buffer: Buffer,
  bucketName: string,
  key: string
): Promise<string> {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ACL: "public-read",
  };

  try {
    await s3.putObject(params).promise();
    return `https://${bucketName}.s3.wasabisys.com/${key}`;
  } catch (error) {
    console.error("Error uploading file to Wasabi:", error);
    throw new Error("Failed to upload file");
  }
}
