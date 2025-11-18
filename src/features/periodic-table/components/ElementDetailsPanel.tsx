'use client'

import React, { useState, useEffect } from 'react'
import { Element } from '../domain/types/element'
import { formatWithSup } from '@/shared/utils/formatWithSup'
import { useTranslations } from 'next-intl'
import { usePeriodicTableStore } from '../store/periodicTableStore'
import { useElementSearch } from '../utils/elementSearch'
import { getElementFields } from '../utils/elementFields'
import { trackElementSearch } from '../events/searchEvents'

interface ElementDetailsPanelProps {
  element: Element | null
}

export default function ElementDetailsPanel({ element }: ElementDetailsPanelProps) {
  const [search, setSearch] = useState('')
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)

  const searchElement = useElementSearch()
  const searchedElement = searchElement(search)
  const elementToShow = searchedElement || element

  const t = useTranslations('periodicTable')
  const tElements = useTranslations('elements')
  const { setHighlight, setSearchValue } = usePeriodicTableStore()

  // Aguarda o usuário parar de digitar por 500ms antes de enviar a busca
  const handleSearch = (value: string) => {
    setSearch(value)
    setSearchValue(value)

    if (debounceTimer) clearTimeout(debounceTimer)

    if (value.trim() !== '') {
      const timer = setTimeout(() => {
        if (searchElement(value)) {
          trackElementSearch({ search_term: value })
        }
      }, 500)
      setDebounceTimer(timer)
    }
  }

  useEffect(() => {
    if (searchedElement) {
      setHighlight(searchedElement, 'search')
    } else {
      setHighlight(null, null)
    }
  }, [searchedElement, setHighlight])

  if (!elementToShow) return null

  const electronConfigToDisplay =
    elementToShow.electronConfigurationExtended ?? elementToShow.electronConfiguration ?? ''

  const { generalFields, extraFields } = getElementFields(elementToShow, t)

  return (
    <div
      className={`w-full min-w-[280px] max-w-[95vw] overflow-hidden rounded-2xl border-2 border-zinc-600 bg-white shadow dark:border-white/35 dark:bg-neutral-800/90 sm:min-w-[340px]`}
    >
      {/* Campo de busca */}
      <div className="w-full border-b border-zinc-300 bg-white px-4 pb-1 pt-1 dark:border-white/20 dark:bg-neutral-800/90">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={t('subtitle')}
          className={`h-10 w-full rounded-full border border-zinc-400 bg-zinc-100 px-2 py-1 text-center text-sm text-black placeholder:text-center placeholder:text-sm placeholder:text-black focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:placeholder:text-transparent dark:border-white/20 dark:bg-neutral-900/70 dark:text-zinc-100 dark:placeholder:text-white dark:focus:placeholder:text-transparent sm:text-base sm:placeholder:text-base sm:placeholder:text-black`}
        />
      </div>

      {/* Informações principais */}
      <div className="flex gap-1 px-1 py-1">
        <div className="flex min-w-[70px] flex-col items-center justify-center sm:min-w-[80px]">
          <p className="text-3xl font-bold text-cyan-700 dark:text-cyan-200 sm:text-4xl">
            {elementToShow.symbol}
          </p>
          <p className="text-xs text-gray-700 dark:text-zinc-100 sm:text-sm">
            {tElements(elementToShow.symbol)}
          </p>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-x-3 gap-y-1 text-[11px] leading-tight text-zinc-800 dark:text-zinc-100 sm:text-sm">
          <div className="flex flex-col gap-y-1">
            {generalFields.map((field: { label: string; value: string | number }) => (
              <div key={field.label}>
                <span className="font-semibold">{field.label}:</span> {field.value}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-1">
            {extraFields.map((field: { label: string; value: string | number | undefined }) => (
              <div key={field.label}>
                <span className="font-semibold">{field.label}:</span> {field.value ?? '-'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Configuração eletrônica e estados de oxidação */}
      <div className="border-t border-zinc-600 px-4 pb-1 pt-1 text-sm text-zinc-800 dark:border-white/20 dark:text-zinc-100">
        <span className="font-semibold">{t('element.electronConfiguration')}:</span>{' '}
        <span
          className="break-words"
          dangerouslySetInnerHTML={{
            __html: formatWithSup(electronConfigToDisplay),
          }}
        />
      </div>
    </div>
  )
}
