import { NextResponse } from 'next/server';
import { getAllRecipes, createRecipe } from '@/server/services/recipeService';

export async function GET() {
  try {
    const recipes = await getAllRecipes();
    console.log('Found recipes:', recipes.length);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const title = formData.get('title');
    const description = formData.get('description');
    const dietary = formData.get('dietary');
    const category = formData.get('category');
    const ingredients = formData.get('ingredients');
    const instructions = formData.get('instructions');

    const imageFile = formData.get('image'); // Blob

    let image = null;

    if (imageFile && typeof imageFile.arrayBuffer === 'function') {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = buffer.toString('base64');
      const mimeType = imageFile.type;

      image = {
        url: `data:${mimeType};base64,${base64}`,
        name: imageFile.name,
        type: imageFile.type,
      };
    }

    const recipeData = {
      title,
      description,
      dietary,
      category,
      ingredients,
      instructions,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await createRecipe(recipeData);

    if (!result) {
      return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Recipe created successfully', id: result.insertedId || result._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create recipe:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
