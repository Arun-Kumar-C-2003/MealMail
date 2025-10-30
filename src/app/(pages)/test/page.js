import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.NEXT_PRIVATE_IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

export default function FileUpload() {
  // Server action
  const handleCreateListing = async (formData) => {
    "use server";

    const image = formData.get("image");

    // You could throw an error if image is null here
    try{

        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const response = await imageKit.upload({
            file: buffer,
            fileName: image.name,
        });
        // const data = await response.json();
        const url =  response.url;
        console.log(url);
    } catch(error){
        console.error("Error in upload checking", error)
    }
    // Do something with response
  };

  return (
    <>
      <div className="pt-28"></div>
      <form action={handleCreateListing}>
        <input name="image" type="file" className="border" />
        <button type="submit" className="border">
          Submit
        </button>
      </form>
    </>
  );
}
