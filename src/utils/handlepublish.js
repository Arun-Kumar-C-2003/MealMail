


// export const handlePublish = async (e) => {
//   e.preventDefault();

//   const cleanedIngredients = inputs
//     .map((item) => item.trim())
//     .filter(Boolean)
//     .map((item) => {
//       const [measure, ...rest] = item.split(" ");
//       return { measure, name: rest.join(" ") };
//     });

//   const cleanedInstructions = textInputs
//     .map((item) => item.trim())
//     .filter(Boolean);

//   const formData = new FormData();

//   formData.append("title", title.trim());
//   formData.append("description", description.trim());
//   formData.append(
//     "cuisineType",
//     cuisineType.toLowerCase() === "other" ? otherCuisine : cuisineType
//   );
//   formData.append("difficulty", difficulty);
//   formData.append("cookTime", cookTime);
//   formData.append("servings", servings);
//   formData.append(
//     "dietary",
//     selected.toLowerCase() === "other" ? otherType : selected
//   );

//   formData.append("ingredients", JSON.stringify(cleanedIngredients));
//   formData.append("instructions", JSON.stringify(cleanedInstructions));

//   // ✅ Correctly append each image file
//   if (images && images.length > 0) {
//     for (const file of images) {
//       // If the uploader gave File objects, append them directly
//       if (file instanceof File) {
//         const image = formData.append("images", file);
//         try {
//           const arrayBuffer = await image.arrayBuffer();
//           const buffer = Buffer.from(arrayBuffer);
//           const response = await imagekit.upload({
//             file: buffer,
//             fileName: image.name,
//           });
//           const url = response.url;
//           console.log(url);
//         } catch (error) {
//           console.error("Error Occured in ");
//         }
//       }
//     }
//   }

//   try {
//     const response = await fetch("/api/recipes", {
//       method: "POST",
//       body: formData,
//     });

//     const result = await response.json();
//     if (response.ok) {
//       alert("Recipe Created Successfully");
//       router.push("/home");
//     } else {
//       alert("Error Creating recipe: " + result.error);
//     }
//   } catch (error) {
//     console.error("Error in Create Page", error);
//   }
// };
