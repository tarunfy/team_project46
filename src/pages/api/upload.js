import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({ multiples: false, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        return res.status(500).json({ error: "Form parsing failed" });
      }

      try {
        let uploadedFile = files.file;
        if (Array.isArray(uploadedFile)) {
          uploadedFile = uploadedFile[0];
        }

        console.log("Files:", files);
        console.log("Filepath:", uploadedFile?.filepath);

        if (!uploadedFile || !uploadedFile.filepath) {
          return res.status(400).json({ error: "No file uploaded" });
        }

        const uploadedResponse = await cloudinary.uploader.upload(uploadedFile.filepath, {
          upload_preset: "radient_preset",
          folder: "radient-uploads",
        });

        return res.status(200).json({ url: uploadedResponse.secure_url });
      } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ error: "Upload failed" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
