"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar, Button, Description, Dropdown, Label, Link } from "@heroui/react";
import type { User } from "@supabase/supabase-js";
import { Search } from "@/assets/icons";
import { useProfile } from "@/context/ProfileContext";
import type { MovieItem, SeriesItem } from "@/lib/api.types";
import { signOut } from "@/lib/auth";
import type { Profile } from "@/lib/database.types";
import { avatarDropItems, movieLinks, seriesLinks } from "@/lib/header-links";
import ButtonCustom from "./ButtonCustom";
import DarkModeToggle from "./DarkModeToggle";
import HeaderDropdown from "./HeaderDropdown";
import Logo from "./Logo";
import TextInput from "./TextInput";

type HeaderProps = {
  user?: User | null | undefined;
  profile?: Profile | null | undefined;
  favMovies?: MovieItem[];
  favSeries?: SeriesItem[];
};

const Header: React.FC<HeaderProps> = ({ user, profile, favMovies, favSeries }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const { dispatch } = useProfile();

  const handleSignOut = async () => {
    const error = await signOut();
    if (error) console.log("Error logging out:", error.message);
  };

  const handleSubmit = (formData: FormData) => {
    const params = new URLSearchParams(searchParams);
    const query = formData.get("query")?.toString();
    for (const key of Array.from(params.keys())) {
      if (key !== "query") {
        params.delete(key);
      }
    }
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    dispatch({ type: "changed_supabase_user", payload: { value: user ? user : null } });
    dispatch({ type: "changed_supabase_profile", payload: { value: profile ? profile : null } });
    dispatch({ type: "changed_favorite_movie", payload: { value: favMovies ? favMovies.map((item) => item.id) : [] } });
    dispatch({ type: "changed_favorite_tv", payload: { value: favSeries ? favSeries.map((item) => item.id) : [] } });
  }, [dispatch, user, profile, favMovies, favSeries]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 text-foreground">
            <Logo />
            <span className="hidden md:inline-block">MoviesDB</span>
          </Link>
          <Button
            isIconOnly
            variant="ghost"
            className="sm:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onPress={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-5">
              <path d={isMenuOpen ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </Button>
          <div className="hidden gap-3 sm:flex">
            <HeaderDropdown targetSegment="movies" links={movieLinks} />
            <HeaderDropdown targetSegment="series" links={seriesLinks} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <form id="search-form" action={handleSubmit} className="hidden md:block">
            <TextInput
              id="query"
              name="query"
              aria-label="Search"
              placeholder="Type to search..."
              defaultValue={searchParams.get("query") || ""}
              endContent={
                <ButtonCustom id="search-bar-btn-desk" type="submit" isIconOnly size="sm" aria-label="Submit search">
                  <Search className="size-4" />
                </ButtonCustom>
              }
            />
          </form>
          <details className="relative md:hidden">
            <summary aria-label="Open search" className="cursor-pointer list-none p-2">
              <Search className="size-5" />
            </summary>
            <form
              id="search-form-mobile"
              action={handleSubmit}
              className="absolute right-0 top-12 w-72 rounded-lg border bg-surface p-3 shadow-lg">
              <TextInput
                id="query-mobile"
                name="query"
                aria-label="Search"
                placeholder="Type to search..."
                defaultValue={searchParams.get("query") || ""}
                endContent={
                  <ButtonCustom id="search-bar-btn-mob" type="submit" isIconOnly size="sm" aria-label="Submit search">
                    <Search className="size-4" />
                  </ButtonCustom>
                }
              />
            </form>
          </details>
          <DarkModeToggle />
          <Dropdown>
            <Button isIconOnly variant="ghost" aria-label="Profile menu">
              <Avatar size="sm">
                <Avatar.Image src={profile?.avatar_url || undefined} alt="Profile" />
                <Avatar.Fallback>U</Avatar.Fallback>
              </Avatar>
            </Button>
            <Dropdown.Popover placement="bottom end">
              <Dropdown.Menu aria-label="Profile Actions">
                {(user?.id ? avatarDropItems.user : avatarDropItems.guest).map((item) => (
                  <Dropdown.Item
                    key={item.key}
                    id={item.key}
                    textValue={item.textValue}
                    href={item.href}
                    onAction={item.key === "logout" ? handleSignOut : undefined}
                    variant={item.key === "logout" ? "danger" : undefined}>
                    <Label>{item.textValue}</Label>
                    {item.key === "profile" && user?.email ? <Description>{user.email}</Description> : null}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </nav>
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="flex max-h-[calc(100dvh-4rem)] flex-col gap-2 overflow-y-auto border-t bg-background p-4 sm:hidden">
          {[
            { title: "Movies", links: movieLinks },
            { title: "Series", links: seriesLinks },
          ].map((group) => (
            <section key={group.title}>
              <h2 className="my-2 font-semibold text-accent">{group.title}</h2>
              {group.links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-foreground"
                  onPress={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </section>
          ))}
        </nav>
      )}
    </header>
  );
};
export default Header;
