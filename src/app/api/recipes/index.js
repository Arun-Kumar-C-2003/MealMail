import { createRecipe } from '@/lib/recipes'; // adjust path if needed

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const recipeData = req.body;
      const result = await createRecipe(recipeData);

      if (!result) {
        return res.status(500).json({ error: 'Failed to create recipe' });
      }

      return res.status(201).json({ message: 'Recipe created', id: result.insertedId });
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
