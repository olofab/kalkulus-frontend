'use client'

import { Tabs, Tab, Box, useTheme } from '@mui/material'
import { Category } from '../../../../hooks/items'

interface CategoryTabsProps {
  categories: Category[]
  activeCategory: number | null
  onCategoryChange: (categoryId: number | null) => void
  isLoading?: boolean
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  isLoading = false
}: CategoryTabsProps) {
  const theme = useTheme()

  const handleChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    onCategoryChange(newValue)
  }

  // Calculate total items across all categories
  const totalCount = categories.reduce((sum, cat) => sum + (cat.count || 0), 0)

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 64, // Below search bar
        zIndex: theme.zIndex.appBar - 1,
        backgroundColor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`,
        py: 1
      }}
    >
      <Tabs
        value={activeCategory}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 40,
          '& .MuiTabs-indicator': {
            display: 'none'
          },
          '& .MuiTab-root': {
            minHeight: 40,
            borderRadius: 25,
            mx: 0.5,
            px: 2,
            py: 0.5,
            minWidth: 'auto',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            color: 'text.secondary',
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.paper',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            '&.Mui-selected': {
              color: 'primary.main',
              backgroundColor: theme.palette.action.selected,
              borderColor: 'primary.main',
              fontWeight: 600,
            }
          }
        }}
      >
        {/* "Alle" tab */}
        <Tab
          label={`Alle${totalCount > 0 ? ` (${totalCount})` : ''}`}
          value={null}
          disabled={isLoading}
        />

        {/* Category tabs */}
        {categories.map((category) => (
          <Tab
            key={category.id}
            label={`${category.name}${category.count ? ` (${category.count})` : ''}`}
            value={category.id}
            disabled={isLoading}
          />
        ))}
      </Tabs>
    </Box>
  )
}
