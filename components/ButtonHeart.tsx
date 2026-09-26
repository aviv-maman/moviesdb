"use client";

import type { FC } from "react";
import { Button, toast } from "@heroui/react";
import { Heart, HeartFilled } from "@/assets/icons";
import { useProfile } from "@/context/ProfileContext";
import { getFavorites, toggleFavorite } from "@/lib/api_account";

interface ButtonHeartPageProps {
  mediaId: number;
  mediaType?: "movie" | "tv";
}

const ButtonHeart: FC<ButtonHeartPageProps> = ({ mediaId, mediaType = "movie" }) => {
  const { dispatch, state } = useProfile();
  const handleFavorite = async () => {
    if (!state.supabase_profile?.tmdb_account_id || !state.supabase_profile?.tmdb_session_id) return;
    const res = await toggleFavorite({
      account_id: state.supabase_profile?.tmdb_account_id,
      session_id: state.supabase_profile?.tmdb_session_id,
      media_type: mediaType,
      media_id: mediaId,
      favorite: !state.favorites[mediaType].includes(mediaId),
    });
    if (!res.success) {
      toast.danger("An error was occurred");

      return;
    }
    toast.success(
      state.favorites[mediaType].includes(mediaId) ? "Item was removed from favorites" : "Item was added to favorites",
    );
    dispatch({
      type: "toggled_favorite_item",
      payload: {
        value: {
          media_type: mediaType,
          id: mediaId,
        },
      },
    });
    const favRes = await getFavorites({
      account_id: state.supabase_profile?.tmdb_account_id,
      session_id: state.supabase_profile?.tmdb_session_id,
      media_type: mediaType,
      revalidate: 0,
    });
    if (!favRes.results) return;
    dispatch({
      type: mediaType === "movie" ? "changed_favorite_movie" : "changed_favorite_tv",
      payload: {
        value: favRes.results.map((item) => item.id),
      },
    });
  };

  return (
    <Button
      isIconOnly
      size="sm"
      aria-label={state.favorites[mediaType].includes(mediaId) ? "Remove from favorites" : "Add to favorites"}
      className="size-10 shrink-0 rounded-lg"
      isDisabled={!state.supabase_profile?.tmdb_session_id}
      onClick={handleFavorite}>
      {state.favorites[mediaType].includes(mediaId) ? <HeartFilled className="size-5" /> : <Heart className="size-5" />}
    </Button>
  );
};
export default ButtonHeart;
