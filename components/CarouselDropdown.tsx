"use client";

import type { FC } from "react";
import { Dropdown, Label, toast } from "@heroui/react";
import { Dots, Heart, HeartFilled, Movie } from "@/assets/icons";
import { useProfile } from "@/context/ProfileContext";
import { getFavorites, toggleFavorite } from "@/lib/api_account";

interface CarouselDropdownProps {
  variant?: "carousel" | "catalog";
  mediaId: number;
  mediaType: "movie" | "tv";
  href: string;
}

const CarouselDropdown: FC<CarouselDropdownProps> = ({ mediaId, mediaType, href, variant = "carousel" }) => {
  const iconClasses = "text-xl text-slate-500 pointer-events-none size-[18px]";
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
      state.favorites.movie.includes(mediaId) ? "Item was removed from favorites" : "Item was added to favorites",
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
    <Dropdown>
      <Dropdown.Trigger
        aria-label="Media actions"
        type="button"
        className={
          variant === "catalog"
            ? "absolute right-2 top-2 z-20 flex size-8 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm hover:bg-black/85"
            : "absolute left-1 top-1 z-20 rounded-lg bg-slate-300 hover:bg-current"
        }>
        <Dots
          className={
            variant === "catalog" ? "pointer-events-none size-5" : "pointer-events-none text-xl text-slate-500"
          }
        />
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu
          aria-label="Dropdown menu with icons"
          disabledKeys={state.supabase_profile?.tmdb_session_id ? undefined : ["list", "favorites", "rate"]}>
          <Dropdown.Item key="details" href={href} id={"details"} textValue={"View details"}>
            {<Movie className={iconClasses} />}
            <Label>View details</Label>
          </Dropdown.Item>
          <Dropdown.Item
            key="favorites"
            id={"favorites"}
            textValue={state.favorites[mediaType].includes(mediaId) ? "Remove from favorites" : "Add to favorites"}
            onAction={handleFavorite}>
            {state.favorites[mediaType].includes(mediaId) ? (
              <HeartFilled className={iconClasses} />
            ) : (
              <Heart className={iconClasses} />
            )}
            <Label>{state.favorites[mediaType].includes(mediaId) ? "Remove from favorites" : "Add to favorites"}</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
export default CarouselDropdown;
