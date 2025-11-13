// src/hooks/useLikeHandler.js
import { useCallback } from "react";

export default function useLikeHandler({ likes, setLikes, session }) {
  const handleLike = useCallback(
    async (id) => {
      if (!session?.user?.name) {
        alert("Please log in to like recipes.");
        return;
      }

      const userName = session.user.name;
      const currentLikes = Array.isArray(likes[id]) ? likes[id] : [];
      const hasLiked = currentLikes.includes(userName);

      // Optimistic UI update
      const optimisticLikes = hasLiked
        ? currentLikes.filter((u) => u !== userName)
        : [...currentLikes, userName];

      setLikes((prev) => ({ ...prev, [id]: optimisticLikes }));

      try {
        const res = await fetch(`/api/recipes/${id}/like`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName }),
        });

        if (!res.ok) throw new Error("Failed to update like");
        const data = await res.json();

        setLikes((prev) => ({ ...prev, [id]: data.likedBy || [] }));
      } catch (error) {
        console.error("Like error:", error);
        // Rollback UI on failure
        setLikes((prev) => ({ ...prev, [id]: currentLikes }));
      }
    },
    [likes, setLikes, session]
  );

  return { handleLike };
}
