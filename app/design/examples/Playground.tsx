/**
 * Playground component - Showcases all design system components
 * Demonstrates various use cases and combinations of components
 */

import React, { useState } from 'react'
import { Box, Container, Typography, Stack, Grid, Divider } from '@mui/material'
import { Plus, Search, Star, Settings, Users, Bell, Heart } from '../icons'

// Import all design system components
import Button from '../components/Button'
import IconButton from '../components/IconButton'
import Chip from '../components/Chip'
import Badge from '../components/Badge'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import Input from '../components/Input'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import Segmented from '../components/Segmented'
import Drawer from '../components/Drawer'
import Toast from '../components/Toast'
import EmptyState from '../components/EmptyState'
import ToolbarHeader from '../components/ToolbarHeader'
import CTAButtons from '../components/CTAButtons'
import Progress from '../components/Progress'
import AvatarGroup from '../components/AvatarGroup'
import DashboardTiles from './DashboardTiles'

/**
 * Playground component for testing and showcasing design system components
 */
export default function Playground() {
  const [activeTab, setActiveTab] = useState('buttons')
  const [segmentedValue, setSegmentedValue] = useState('overview')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const tabItems = [
    { label: 'Buttons', value: 'buttons' },
    { label: 'Forms', value: 'forms' },
    { label: 'Cards', value: 'cards' },
    { label: 'Navigation', value: 'navigation' },
  ]

  const segmentedItems = [
    { label: 'Overview', value: 'overview' },
    { label: 'Analytics', value: 'analytics' },
    { label: 'Reports', value: 'reports' },
  ]

  const avatars = [
    { name: 'John Doe', src: undefined },
    { name: 'Jane Smith', src: undefined },
    { name: 'Bob Johnson', src: undefined },
    { name: 'Alice Brown', src: undefined },
    { name: 'Charlie Wilson', src: undefined },
    { name: 'Diana Prince', src: undefined },
  ]

  const renderButtonsSection = () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>Buttons</Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="primary" size="sm">Primary Small</Button>
          <Button variant="primary" size="md">Primary Medium</Button>
          <Button variant="primary" size="lg">Primary Large</Button>
        </Stack>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
          <Button variant="secondary">Secondary</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="ghost">Ghost</Button>
        </Stack>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
          <Button variant="primary" startIcon={<Plus size={16} />}>With Icon</Button>
          <Button variant="secondary" endIcon={<Search size={16} />}>End Icon</Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Icon Buttons</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton size="sm">
            <Settings size={16} />
          </IconButton>
          <IconButton size="md">
            <Settings size={20} />
          </IconButton>
          <IconButton size="sm" soft color="primary">
            <Heart size={16} />
          </IconButton>
          <IconButton size="md" soft color="primary">
            <Heart size={20} />
          </IconButton>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Chips & Badges</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          <Chip severity="info" label="Info" />
          <Chip severity="success" label="Success" />
          <Chip severity="warning" label="Warning" />
          <Chip severity="error" label="Error" />
          <Chip severity="neutral" variant="outline" label="Neutral" />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Badge severity="primary" badgeContent={4}>
            <Bell size={24} />
          </Badge>
          <Badge severity="error" badgeContent={99}>
            <Bell size={24} />
          </Badge>
          <Badge severity="success" variant="dot">
            <Users size={24} />
          </Badge>
        </Stack>
      </Box>
    </Stack>
  )

  const renderFormsSection = () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>Input Fields</Typography>
        <Stack spacing={3} sx={{ maxWidth: 400 }}>
          <Input size="sm" label="Small Input" placeholder="Enter text..." />
          <Input size="md" label="Medium Input" placeholder="Enter text..." />
          <Input size="lg" label="Large Input" placeholder="Enter text..." />
          <Input label="With Helper Text" helperText="This is helper text" />
          <Input label="Error State" error helperText="This field is required" />
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Search Bar</Typography>
        <Box sx={{ maxWidth: 400 }}>
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search for anything..."
            debounceMs={300}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Progress Indicators</Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="body2" gutterBottom>Linear Progress</Typography>
            <Progress variant="linear" value={65} showValue size="md" />
          </Box>
          <Box>
            <Typography variant="body2" gutterBottom>Circular Progress</Typography>
            <Stack direction="row" spacing={3}>
              <Progress variant="circular" value={25} showValue size="sm" />
              <Progress variant="circular" value={65} showValue size="md" />
              <Progress variant="circular" value={85} showValue size="lg" />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )

  const renderCardsSection = () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>Basic Cards</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card padding="md">
              <Typography variant="h6" gutterBottom>Simple Card</Typography>
              <Typography variant="body2" color="text.secondary">
                This is a basic card with medium padding and default elevation.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              padding="lg"
              elevation={3}
              header={<Typography variant="h6">Card with Header</Typography>}
              footer={
                <Button variant="primary" size="sm">
                  Action
                </Button>
              }
            >
              <Typography variant="body2" color="text.secondary">
                This card has a header, footer, and large padding.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Stat Cards</Typography>
        <DashboardTiles
          data={{
            revenue: { value: '1.2M kr', progress: 75 },
            users: { value: '543', progress: 60 },
            orders: { value: '234', progress: 85 },
          }}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Avatar Group</Typography>
        <Stack spacing={2}>
          <AvatarGroup avatars={avatars.slice(0, 3)} size="sm" />
          <AvatarGroup avatars={avatars.slice(0, 4)} size="md" />
          <AvatarGroup avatars={avatars} max={4} size="lg" />
        </Stack>
      </Box>
    </Stack>
  )

  const renderNavigationSection = () => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>Toolbar Header</Typography>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <ToolbarHeader
            title="Page Title"
            showBack
            onBack={() => console.log('Back clicked')}
            actions={
              <IconButton size="sm">
                <Settings size={20} />
              </IconButton>
            }
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Tabs</Typography>
        <Tabs
          items={tabItems}
          value={activeTab}
          onChange={(value) => setActiveTab(value as string)}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Segmented Control</Typography>
        <Segmented
          items={segmentedItems}
          value={segmentedValue}
          onChange={(value) => setSegmentedValue(value as string)}
          fullWidth
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>CTA Buttons</Typography>
        <Box sx={{ maxWidth: 300 }}>
          <CTAButtons
            primary={{
              label: 'Primary Action',
              onClick: () => console.log('Primary clicked'),
            }}
            secondary={{
              label: 'Secondary Action',
              onClick: () => console.log('Secondary clicked'),
            }}
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Drawer & Toast</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="secondary"
            onClick={() => setDrawerOpen(true)}
          >
            Open Drawer
          </Button>
          <Button
            variant="secondary"
            onClick={() => setToastOpen(true)}
          >
            Show Toast
          </Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Empty State</Typography>
        <EmptyState
          title="No items found"
          description="Try adjusting your search criteria or create a new item."
          primaryAction={{
            label: 'Create Item',
            onClick: () => console.log('Create clicked'),
          }}
          secondaryAction={{
            label: 'Clear Filters',
            onClick: () => console.log('Clear clicked'),
          }}
        />
      </Box>
    </Stack>
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'forms': return renderFormsSection()
      case 'cards': return renderCardsSection()
      case 'navigation': return renderNavigationSection()
      default: return renderButtonsSection()
    }
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Timla Design System Playground
        </Typography>

        <Typography variant="body1" color="text.secondary" textAlign="center" paragraph>
          Explore all components and their variants in action
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Tabs
            items={tabItems}
            value={activeTab}
            onChange={(value) => setActiveTab(value as string)}
          />
        </Box>

        {renderSection()}
      </Container>

      {/* Drawer Example */}
      <Drawer
        variant="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        showGrabber
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Bottom Sheet Drawer
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This is a bottom sheet drawer with a grabber handle.
            You can drag the handle or click outside to close it.
          </Typography>
          <Button
            variant="primary"
            onClick={() => setDrawerOpen(false)}
            fullWidth
          >
            Close Drawer
          </Button>
        </Box>
      </Drawer>

      {/* Toast Example */}
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        severity="success"
        message="This is a success toast message!"
        showCloseButton
      />
    </>
  )
}
