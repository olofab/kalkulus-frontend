/**
 * DashboardTiles component - Grid of stat cards inspired by modern dashboards
 * Showcases StatCard component with various metrics and progress indicators
 */

import React from 'react'
import { Grid, Box } from '@mui/material'
import { TrendingUp, Users, DollarSign, Package, Clock, CheckCircle } from '../icons'
import StatCard from '../components/StatCard'

export interface DashboardTilesProps {
  /** Data for the dashboard tiles */
  data?: {
    revenue?: { value: string | number; progress?: number }
    users?: { value: string | number; progress?: number }
    orders?: { value: string | number; progress?: number }
    inventory?: { value: string | number; progress?: number }
    timeSpent?: { value: string | number; progress?: number }
    completed?: { value: string | number; progress?: number }
  }
  /** Click handlers for each tile */
  onTileClick?: {
    revenue?: () => void
    users?: () => void
    orders?: () => void
    inventory?: () => void
    timeSpent?: () => void
    completed?: () => void
  }
}

/**
 * DashboardTiles component showcasing StatCard in a grid layout
 */
export default function DashboardTiles({
  data = {},
  onTileClick = {},
}: DashboardTilesProps) {
  const defaultData = {
    revenue: { value: '2.4M kr', progress: 75 },
    users: { value: '1,234', progress: 60 },
    orders: { value: '856', progress: 85 },
    inventory: { value: '342', progress: 40 },
    timeSpent: { value: '24.5t', progress: 90 },
    completed: { value: '95%', progress: 95 },
  }

  const tilesData = { ...defaultData, ...data }

  const tiles = [
    {
      key: 'revenue',
      icon: <DollarSign size={20} />,
      title: 'Total Revenue',
      value: tilesData.revenue.value,
      progress: tilesData.revenue.progress,
      accentColor: '#10B981', // Success green
      onClick: onTileClick.revenue,
    },
    {
      key: 'users',
      icon: <Users size={20} />,
      title: 'Active Users',
      value: tilesData.users.value,
      progress: tilesData.users.progress,
      accentColor: '#3B82F6', // Blue
      onClick: onTileClick.users,
    },
    {
      key: 'orders',
      icon: <Package size={20} />,
      title: 'Orders',
      value: tilesData.orders.value,
      progress: tilesData.orders.progress,
      accentColor: '#F59E0B', // Orange
      onClick: onTileClick.orders,
    },
    {
      key: 'inventory',
      icon: <TrendingUp size={20} />,
      title: 'Inventory',
      value: tilesData.inventory.value,
      progress: tilesData.inventory.progress,
      accentColor: '#EF4444', // Red
      onClick: onTileClick.inventory,
    },
    {
      key: 'timeSpent',
      icon: <Clock size={20} />,
      title: 'Time Spent',
      value: tilesData.timeSpent.value,
      progress: tilesData.timeSpent.progress,
      accentColor: '#8B5CF6', // Purple
      onClick: onTileClick.timeSpent,
    },
    {
      key: 'completed',
      icon: <CheckCircle size={20} />,
      title: 'Completed',
      value: tilesData.completed.value,
      progress: tilesData.completed.progress,
      accentColor: '#06B6D4', // Cyan
      onClick: onTileClick.completed,
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3}>
        {tiles.map((tile) => (
          <Grid item xs={12} sm={6} md={4} key={tile.key}>
            <StatCard
              icon={tile.icon}
              title={tile.title}
              value={tile.value}
              progress={tile.progress}
              accentColor={tile.accentColor}
              onClick={tile.onClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
