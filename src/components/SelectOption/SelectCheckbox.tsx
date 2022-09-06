import { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import BasicSelect from "./BasicSelect";

export default function SelectCheckbox({
  title,
  items,
  onChange,
}: {
  title: string;
  items: { [name in string]: boolean };
  onChange: (newValue: boolean, text: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isEverythingOff = () => {
    return Object.values(items).reduce((isOff, value) => !value && isOff, true);
  };

  return (
    <BasicSelect
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
      hasChanged={!isEverythingOff()}
    >
      {Object.entries(items).map(([text, checked]) => (
        <Checkbox
          key={text}
          text={text}
          checked={checked}
          onChange={(newValue) => onChange(newValue, text)}
        />
      ))}
    </BasicSelect>
  );
}
