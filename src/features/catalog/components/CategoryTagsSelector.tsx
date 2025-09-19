"use client";
import * as React from "react";
import { X } from "lucide-react";
import type { CompoundCategory } from "@/features/catalog/domain/types/ChemicalCompound";
import { useTranslations } from "next-intl";

type Tag = {
  id: CompoundCategory;
  label: string;
};

type Props = {
  tags: Tag[];
  selected: CompoundCategory[];
  onChange: (next: CompoundCategory[]) => void;
};

export function CategoryTagsSelector({ tags, selected, onChange }: Props) {
  const t = useTranslations('catalog.categoryTags');

  const add = (tag: Tag) => onChange([...selected, tag.id]);
  const remove = (id: CompoundCategory) =>
    onChange(selected.filter((s) => s !== id));

  return (
    <div className="flex flex-col items-center w-full gap-2">
      <div className="w-full max-w-xs">
        <div
          className={`
          flex items-center gap-2 overflow-x-auto no-scrollbar
          bg-white dark:bg-zinc-900
          border-2 border-border dark:border-zinc-400
          p-2 rounded-md h-12 min-h-[3rem] w-full md:w-[380px]
          transition
        `}
        >
          {selected.length === 0 ? (
            <span className="text-sm text-gray-400 select-none whitespace-nowrap">
              {t("placeholder")}
            </span>
          ) : (
            <div className="flex items-center gap-2 w-full">
              {selected.map((id) => {
                const tag = tags.find((t) => t.id === id);
                return tag ? (
                  <div
                    key={id}
                    className={`
                    flex items-center px-3 py-1 rounded-full
                    bg-gray-100 dark:bg-zinc-800
                    shadow-sm border
                    border-gray-200 dark:border-zinc-700
                    whitespace-nowrap
                  `}
                  >
                    <span className="mr-2 text-sm text-gray-700 dark:text-zinc-200">
                      {t(tag.id)}
                    </span>
                    <button
                      onClick={() => remove(id)}
                      className={`
                      text-gray-500 hover:text-red-500
                      focus:outline-none ml-1
                    `}
                      aria-label={t("remove")}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2 justify-center w-full max-w-xs">
        {tags
          .filter((t) => !selected.includes(t.id))
          .map((tag) => (
            <button
              key={tag.id}
              onClick={() => add(tag)}
              className={`
                text-sm px-3 py-1 rounded-full
                bg-gray-200 dark:bg-zinc-700
                text-gray-700 dark:text-zinc-200
                border border-gray-300 dark:border-zinc-600
                hover:bg-gray-300 dark:hover:bg-zinc-600
                focus:outline-none focus:ring-2 focus:ring-primary/30
                transition
              `}
              tabIndex={0}
              aria-label={t("add")}
            >
              {t(tag.id)}
            </button>
          ))}
      </div>
    </div>
  );
}
