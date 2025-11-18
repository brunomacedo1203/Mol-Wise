'use client'

import { useEffect } from 'react'
import { useSubtitleStore } from '@/shared/store/subtitleStore'
import Page from '@/shared/components/layout/Page'
import { useTranslations } from 'next-intl'
import PeriodicTableCards from '@/features/periodic-table/components/PeriodicTableCards'
import PeriodicTableFilters from '@/features/periodic-table/components/common/PeriodicTableAdvancedFiltersPanel'

export default function PeriodicTableClient() {
  const t = useTranslations('periodicTable')
  const setSubtitle = useSubtitleStore((state) => state.setSubtitle)

  useEffect(() => {
    setSubtitle(t('subtitle'))
    return () => setSubtitle('')
  }, [setSubtitle, t])

  return (
    <Page title={t('title')}>
      <div className="flex h-full w-full flex-col">
        <div className="sticky top-0 z-50 mt-2 bg-zinc-100 dark:bg-neutral-950">
          <div className="mx-auto w-full max-w-3xl px-2">
            <PeriodicTableFilters />
          </div>
        </div>

        <PeriodicTableCards />
      </div>
    </Page>
  )
}
