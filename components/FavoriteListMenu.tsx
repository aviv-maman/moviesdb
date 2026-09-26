"use client";

import type { FC } from "react";
import { Label, ListBox } from "@heroui/react";
import { TopologyStar, UserCog } from "@/assets/icons";
import { useProfile } from "@/context/ProfileContext";

const FavoriteListMenu: FC = () => {
  const { dispatch } = useProfile();

  return (
    <div className="sticky top-[82px] z-10 mr-0 h-max rounded-sm border border-slate-200 bg-content2 px-1 py-2 dark:border-slate-100 dark:bg-surface sm:w-full md:mr-4 md:max-w-[260px]">
      <ListBox
        aria-label="Actions"
        onAction={(key) =>
          dispatch({
            type: "changed_active_favlist",
            payload: {
              value: key as "movie" | "tv",
            },
          })
        }>
        <ListBox.Item key="movie" id={"movie"} textValue={"Favorite Movies"}>
          {<UserCog />}
          <Label>Favorite Movies</Label>
        </ListBox.Item>
        <ListBox.Item key="tv" id={"tv"} textValue={"Favorite Series"}>
          {<TopologyStar />}
          <Label>Favorite Series</Label>
        </ListBox.Item>
      </ListBox>
    </div>
  );
};
export default FavoriteListMenu;
