"use client";

import type { FC } from "react";
import { Accordion, Avatar, CheckboxGroup, Label, ListBox, Select, Separator } from "@heroui/react";
import { useFilterDraft } from "@/context/FilterDraftContext";
import { useForm } from "@/context/FormContext";
import countries from "@/lib/data/countries.json";
import CheckboxService from "./CheckboxService";

// import { useGeoLocation } from '@/hooks/useGeoLocation';
// import useSWR from 'swr';
// import type { LocationResponse } from '@/lib/api.types';

const SidebarWhereToWatch: FC = () => {
  const { values } = useFilterDraft();
  const { results: countryList } = countries;
  const { dispatch, state } = useForm();
  //   const { error, loading, position } = useGeoLocation();

  //   const [latitude, longitude] = [String(position?.coords.latitude), String(position?.coords.longitude)];
  //   const [geoURL, geoArgs] = [
  //     '/api/geo-location',
  //     { headers: { latitude: latitude, longitude: longitude } } as RequestInit | undefined,
  //   ];

  //   const {
  //     data: location,
  //     error: locationError,
  //     isLoading,
  //     isValidating,
  //   } = useSWR<{ data: LocationResponse }, Error>(position ? { url: geoURL, options: geoArgs } : null);

  const handleChangeCountry = (value: string) => {
    value = value.toUpperCase();
    dispatch({
      type: "changed_country",
      payload: {
        value,
      },
    });
  };

  //   useEffect(() => {
  //     if (location?.data && 'address' in location.data && location.data.address.country_code !== null) {
  //       handleChangeCountry(location.data.address.country_code.toUpperCase());
  //     }
  //     console.log('locationError', locationError);
  //     console.log('location', location);
  //   }, [location]);

  return (
    <Accordion variant="surface">
      <Accordion.Item key="where-to-watch" aria-label="Where to watch" id={"where-to-watch"}>
        <Accordion.Heading>
          <Accordion.Trigger>
            <span>
              {"Where to Watch"}
              <span className="block text-xs text-muted">{"Streaming Services"}</span>
            </span>
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body className="overflow-x-hidden">
            <Select
              name="watch_region"
              defaultValue={values.watch_region?.[0]}
              aria-label="Select country"
              className="mt-4 max-w-xs"
              //   isLoading={isLoading || isValidating}
              onChange={(e) => handleChangeCountry(String(e ?? ""))}>
              <Label>{"Select country"}</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {countryList.map((option) => (
                    <ListBox.Item key={option.iso_3166_1} id={option.iso_3166_1} textValue={option.native_name}>
                      {
                        <Avatar className="h-6 w-6">
                          <Avatar.Image
                            src={`https://flagcdn.com/${option.iso_3166_1.toLowerCase()}.svg`}
                            alt={option.english_name}
                          />
                          <Avatar.Fallback>U</Avatar.Fallback>
                        </Avatar>
                      }
                      <Label>{option.native_name}</Label>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            <Separator orientation="horizontal" className="mb-3 mt-5" />
            <h2 className="relative mb-2 text-sm font-normal text-slate-500">Available Services</h2>
            <CheckboxGroup
              name="with_watch_providers"
              defaultValue={values.with_watch_providers}
              className={"flex flex-col gap-2 " + "mb-2"}
              aria-label={"with_watch_providers"}>
              <div className="flex flex-wrap gap-2">
                {state.where_to_watch.providers.map((option) => (
                  <CheckboxService
                    key={option.provider_id}
                    value={String(option.provider_id)}
                    provider_name={option.provider_name}
                    avatar={`https://image.tmdb.org/t/p/w500/${option.logo_path}`}
                  />
                ))}
              </div>
            </CheckboxGroup>
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
export default SidebarWhereToWatch;
