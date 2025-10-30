import ImageKit from "imagekit";
// import { url } from "inspector";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.NEXT_PRIVATE_IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

export async function POST(request) {
  const body = await request.json();
  const { file, fileName } = body;

  try {
    const result = await imagekit.upload({ file, fileName });
    console.log(result.url);
    return NextResponse.json({ url: result.url }, { status: 200 });
  } catch (error) {
    console.error("Error occured in handler api/upload", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// /api/upload.js
// import ImageKit from "imagekit";

// const imagekit = new ImageKit({
//   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
// });

// export async function dummy(req, res) {
//   const { file, fileName } = req.body;
//   try {
//     const result = await imagekit.upload({ file, fileName });
//     res.status(200).json({ url: result.url });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// try {
//   const response = await fetch("/api/upload", {
//     method: "POST",
//     body: image,
//   });
//   formData.append("images", response.url);
// } catch (error) {
//   console.error("Error in createREcipe", error);
// }
