'use client'

import { notFound } from 'next/navigation'
import { use } from 'react'
import ItemsScreen from './ItemsScreen'
import TopBar from '../../../components/TopBar'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function ItemsPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const offerId = parseInt(resolvedParams.id)

  // Validate offer ID
  if (isNaN(offerId) || offerId <= 0) {
    notFound()
  }

  return (
    <>
      <TopBar
        title="Legg til varer"
      />
      <ItemsScreen offerId={offerId} />
    </>
  )
}
