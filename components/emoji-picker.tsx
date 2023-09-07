"use client";

import { Smile } from "lucide-react";
// import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const Picker = dynamic(() => import("@emoji-mart/react"), { ssr: false });
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        {/* <Picker
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        /> */}
        <div className="hidden">
          <Picker
            theme={resolvedTheme}
            data={async () => {
              const response = await fetch(
                "https://cdn.jsdelivr.net/npm/@emoji-mart/data/sets/14/native.json"
              );

              return response.json();
            }}
            onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
