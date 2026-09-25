"use client";

import { Dropdown, Label } from "@heroui/react";
import { toast } from "sonner";
import { Dots, Heart, HeartFilled, Movie } from "@/assets/icons";
import { useProfile } from "@/context/ProfileContext";
import { getFavorites, toggleFavorite } from "@/lib/api_account";

interface CarouselDropdownProps {
  mediaId: number;
  mediaType: "movie" | "tv";
  href: string;
}
const CarouselDropdown: React.FC<CarouselDropdownProps> = ({ mediaId, mediaType, href }) => {
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
      toast.error("An error was occurred");
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
        className="absolute left-1 top-1 z-20 rounded-lg bg-slate-300 hover:bg-current">
        <Dots className="pointer-events-none text-xl text-slate-500" />
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
