// import RecipeDetails from "@/components/recipedetails";
import RecipeDetailPage from "@/components/recipedetailpage";
import { Suspense } from "react";
export default function RecipeDetailsPage() {
  return (
    <>
      <Suspense>
        <RecipeDetailPage />
      </Suspense>
    </>
  );
}
