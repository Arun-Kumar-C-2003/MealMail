// import ImageKit from "imagekit";

// const imagekit = new ImageKit({
//   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.NEXT_PRIVATE_IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
// });

// export default function FileUpload() {
//   // Server action
//   const handleCreateListing = async (formData) => {
//     "use server";

//     const image = formData.get("image");

//     // You could throw an error if image is null here
//     try{

//         const arrayBuffer = await image.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);

//         const response = await imageKit.upload({
//             file: buffer,
//             fileName: image.name,
//         });
//         // const data = await response.json();
//         const url =  response.url;
//         console.log(url);
//     } catch(error){
//         console.error("Error in upload checking", error)
//     }
//     // Do something with response
//   };

//   return (
//     <>
//       <div className="pt-28"></div>
//       <form action={handleCreateListing}>
//         <input name="image" type="file" className="border" />
//         <button type="submit" className="border">
//           Submit
//         </button>
//       </form>
//     </>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setRecipes, setError, setLoading } from "@/app/slices/recipeslice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userRecipes, loading } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (userRecipes.length === 0) {
      dispatch(setLoading(true));
      fetch("/api/recipes/user_recipes")
        .then((res) => res.json())
        .then((data) => dispatch(setRecipes(Array.isArray(data) ? data : [])))
        .catch((err) => dispatch(setError(err.message)))
        .finally(() => dispatch(setLoading(false)));
    }
  }, [dispatch, userRecipes.length]);

  return (
    <>
      <div className="pt-20">
        {loading ? (
          <p>loading</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 place-items-center pb-10 w-full">
            {userRecipes.map((recipe) => (
              <div>
                {recipe.images && recipe.images.length > 0 ? (
                  <img
                    src={
                      recipe.images.find((img) => img.isCover)?.url ||
                      "/images/cooking.jpg"
                    }
                    alt={recipe.title}
                    className="w-50 h-44  object-cover cursor-pointer  rounded-2xl"
                    onClick={() =>
                      router.push(`/recipedetails?id=${recipe._id}`)
                    }
                  />
                ) : (
                  <img
                    src={recipe?.image?.url || "/images/cooking.jpg"}
                    alt={recipe.title}
                    className="w-50 h-44  object-cover cursor-pointer  rounded-2xl"
                    onClick={() =>
                      router.push(`/recipedetails?id=${recipe._id}`)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
// useEffect(() => {
//   async function getAllUserRecipes() {
//     try {
//       const response = await fetch("/api/recipes/user_recipes");
//       console.log("Getting Recipes");
//       // src\app\api\recipes\user_recipes\route.js
//       const data = await response.json();
//       if (Array.isArray(data) && data.length > 0) {
//         setUserRecipes(data);
//         setTotalRecipes(data.length);
//       } else {
//         setUserRecipes([]);
//         setTotalRecipes(0);
//       }
//     } catch (error) {
//       console.error("Error in Home page getting user recipes:", error);
//       setUserRecipes([]);
//       setTotalRecipes(0);
//     } finally {
//       setLoading(false);
//     }
//   }
//   getAllUserRecipes();
// }, []);
