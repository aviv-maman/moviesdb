"use client";

import { Button, Dropdown, Label } from "@heroui/react";
import { StarFilled, StarHalfFilled, StarOff } from "@/assets/icons";

const RateItemDropdown: React.FC = () => {
  return (
    <Dropdown>
      <Button isIconOnly aria-label="Rate item">
        <StarHalfFilled />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu aria-label="Rate Options">
          <Dropdown.Item key="rate-5" id={"rate-5"} textValue={"rate-5"}>
            <Label>
              <div className="flex">
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
              </div>
            </Label>
          </Dropdown.Item>
          <Dropdown.Item key="rate-4" id={"rate-4"} textValue={"rate-4"}>
            <Label>
              <div className="flex">
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
              </div>
            </Label>
          </Dropdown.Item>
          <Dropdown.Item key="rate-3" id={"rate-3"} textValue={"rate-3"}>
            <Label>
              <div className="flex">
                <StarFilled />
                <StarFilled />
                <StarFilled />
              </div>
            </Label>
          </Dropdown.Item>
          <Dropdown.Item key="rate-2" id={"rate-2"} textValue={"rate-2"}>
            <Label>
              <div className="flex">
                <StarFilled />
                <StarFilled />
              </div>
            </Label>
          </Dropdown.Item>
          <Dropdown.Item key="rate-1" id={"rate-1"} textValue={"rate-1"}>
            <Label>
              <StarFilled />
            </Label>
          </Dropdown.Item>
          <Dropdown.Item key="remove" id={"remove"} textValue={"remove"}>
            <Label>
              <StarOff />
            </Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
export default RateItemDropdown;
