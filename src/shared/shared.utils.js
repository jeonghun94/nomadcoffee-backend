import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadPhoto = async (file, userId) => {
  console.log(process.env.AWS_KEY);
  console.log(process.env.AWS_SECRET);

  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "instaclone-jeongh1021",
      Key: objectName,
      Body: readStream,
      ACL: "public-read",
    })
    .promise();
  return Location;
};
