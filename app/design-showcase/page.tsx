'use client'

import { Box, Typography, Grid, Stack, Divider, Alert, alpha } from '@mui/material'
import {
  Button,
  IconButton,
  Card,
  StatCard,
  Input,
  SearchBar,
  Chip,
  Badge,
  Tabs,
  Segmented,
  EmptyState,
  ToolbarHeader,
  Progress,
  Drawer,
  Toast
} from '../design'
import {
  Plus,
  Search,
  Star,
  Heart,
  Settings,
  Bell,
  User,
  Package,
  TrendingUp,
  X,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  Home,
  Calendar,
  Mail,
  Phone
} from '../design/icons'
import { useState } from 'react'
import PillTabs from '../design/components/PillTabs'
import BrandSwoosh from '../design/components/Swoosh'

export default function DesignShowcasePage() {
  const [activeTab, setActiveTab] = useState(0)
  const [segmentedValue, setSegmentedValue] = useState('overview')
  const [searchValue, setSearchValue] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <Box sx={{ background: 'white', px: 3, pt: 3, pb: 2, mb: 3 }}>
        <Typography variant="h3" fontWeight={700} mb={1} color="#1a1a1a">
          Timla Design System
        </Typography>
        <Typography variant="body1" color="text.secondary">
          A comprehensive design system showcasing all available components
        </Typography>
      </Box>

      <Box px={3} maxWidth="1200px" mx="auto">

        {/* Toolbar Header */}
        <ComponentSection title="ToolbarHeader" description="Navigation header with back button and actions">
          <Box sx={{ background: 'white', borderRadius: 2, overflow: 'hidden', mb: 2 }}>
            <ToolbarHeader
              title="Sample Page"
              showBack
              onBack={() => console.log('Back pressed')}
              actions={
                <IconButton size="sm">
                  <Settings />
                </IconButton>
              }
              elevated
            />
          </Box>
          <Box sx={{ background: 'white', borderRadius: 2, overflow: 'hidden' }}>
            <ToolbarHeader
              title="Simple Header"
              leftAlignTitle
            />
          </Box>
        </ComponentSection>

        {/* Buttons */}
        <ComponentSection title="Buttons" description="Primary, secondary, soft, and ghost button variants">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Button variant="primary" fullWidth>Primary Button</Button>
                <Button variant="secondary" fullWidth>Secondary Button</Button>
                <Button variant="soft" fullWidth>Soft Button</Button>
                <Button variant="ghost" fullWidth>Ghost Button</Button>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Button variant="primary" disabled fullWidth>Disabled Primary</Button>
                <Button variant="secondary" disabled fullWidth>Disabled Secondary</Button>
                <Button variant="primary" size="sm" fullWidth>Small Button</Button>
                <Button variant="primary" size="lg" fullWidth>Large Button</Button>
              </Stack>
            </Grid>
          </Grid>
        </ComponentSection>

        {/* Icon Buttons */}
        <ComponentSection title="Icon Buttons" description="Compact buttons with icons in different sizes and styles">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>Sizes</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton size="sm"><Heart /></IconButton>
                <IconButton size="md"><Heart /></IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>Variants</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton size="sm" soft color="primary"><Plus /></IconButton>
                <IconButton size="sm" color="primary"><Star /></IconButton>
                <IconButton size="sm" disabled><Settings /></IconButton>
              </Stack>
            </Grid>
          </Grid>
        </ComponentSection>

        {/* Cards */}
        <ComponentSection title="Cards" description="Flexible containers with different elevation levels">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={1} padding="md">
                <Typography variant="h6" mb={1}>Basic Card</Typography>
                <Typography variant="body2" color="text.secondary">
                  This is a basic card with elevation 1 and medium padding.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={2} padding="lg">
                <Typography variant="h6" mb={1}>Elevated Card</Typography>
                <Typography variant="body2" color="text.secondary">
                  This card has elevation 2 and large padding for more prominence.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={3}
                padding="md"
                onClick={() => console.log('Card clicked')}
                sx={{ cursor: 'pointer' }}
              >
                <Typography variant="h6" mb={1}>Interactive Card</Typography>
                <Typography variant="body2" color="text.secondary">
                  This card is clickable with elevation 3.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </ComponentSection>

        {/* StatCards */}
        <ComponentSection title="StatCards" description="KPI display cards with icons and progress indicators">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Users"
                value="2,543"
                icon={<User />}
                progress={75}
                accentColor="#3B82F6"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Revenue"
                value="$12,543"
                icon={<TrendingUp />}
                progress={82}
                accentColor="#10B981"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Orders"
                value="1,429"
                icon={<Package />}
                progress={65}
                accentColor="#8B5CF6"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Growth"
                value="+23.5%"
                icon={<TrendingUp />}
                accentColor="#F59E0B"
                onClick={() => console.log('StatCard clicked')}
              />
            </Grid>
          </Grid>
        </ComponentSection>

        {/* Form Components */}
        <ComponentSection title="Form Components" description="Input fields and search components">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  helperText="We'll never share your email"
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
                <Input
                  label="Disabled Input"
                  placeholder="This field is disabled"
                  disabled
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <SearchBar
                  placeholder="Search anything..."
                  value={searchValue}
                  onChange={setSearchValue}
                />
                <SearchBar
                  placeholder="Search with custom debounce..."
                  debounceMs={500}
                />
                <Input
                  label="With Error"
                  placeholder="This field has an error"
                  error
                  helperText="This field is required"
                />
                <Input
                  label="Success State"
                  placeholder="This field is valid"
                  helperText="Looks good!"
                />
              </Stack>
            </Grid>
          </Grid>
        </ComponentSection>

        {/* Alerts */}
        <ComponentSection title="Alerts" description="Soft button-style alert components with pastell colors">
          <Stack spacing={2}>
            <Alert
              severity="error"
              icon={<AlertCircle size={20} />}
              sx={{
                backgroundColor: theme => alpha(theme.palette.error.main, 0.08),
                color: theme => theme.palette.error.main,
                border: 'none',
                boxShadow: 'none',
                borderRadius: 1,
                '& .MuiAlert-icon': {
                  color: theme => theme.palette.error.main,
                },
              }}
            >
              Dette er en feilmelding med soft button styling
            </Alert>

            <Alert
              severity="warning"
              icon={<AlertTriangle size={20} />}
              sx={{
                backgroundColor: theme => alpha(theme.palette.warning.main, 0.08),
                color: theme => theme.palette.warning.main,
                border: 'none',
                boxShadow: 'none',
                borderRadius: 1,
                '& .MuiAlert-icon': {
                  color: theme => theme.palette.warning.main,
                },
              }}
            >
              Dette er en advarsel med pastell bakgrunn og border radius 1
            </Alert>

            <Alert
              severity="success"
              icon={<CheckCircle size={20} />}
              sx={{
                backgroundColor: theme => alpha(theme.palette.success.main, 0.08),
                color: theme => theme.palette.success.main,
                border: 'none',
                boxShadow: 'none',
                borderRadius: 1,
                '& .MuiAlert-icon': {
                  color: theme => theme.palette.success.main,
                },
              }}
            >
              Operasjonen var vellykket! Soft button stil med border radius 1
            </Alert>

            <Alert
              severity="info"
              icon={<Info size={20} />}
              sx={{
                backgroundColor: theme => alpha(theme.palette.info.main, 0.08),
                color: theme => theme.palette.info.main,
                border: 'none',
                boxShadow: 'none',
                borderRadius: 1,
                '& .MuiAlert-icon': {
                  color: theme => theme.palette.info.main,
                },
              }}
            >
              Informasjon vises med samme design som soft buttons
            </Alert>
          </Stack>
        </ComponentSection>

        {/* Chips and Badges */}
        <ComponentSection title="Chips & Badges" description="Labels and notification indicators">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>Chips</Typography>
              <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" gap={1}>
                <Chip label="Default" />
                <Chip label="Soft" variant="soft" />
                <Chip label="With Icon" icon={<Star />} />
                <Chip label="Deletable" onDelete={() => console.log('Delete')} />
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                <Chip label="Tag 1" />
                <Chip label="Tag 2" />
                <Chip label="Tag 3" />
                <Chip label="Tag 4" />
                <Chip label="Tag 5" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>Badges</Typography>
              <Stack direction="row" spacing={3} alignItems="center">
                <Badge content="5">
                  <IconButton size="sm">
                    <Bell />
                  </IconButton>
                </Badge>
                <Badge content="99">
                  <IconButton size="sm">
                    <Package />
                  </IconButton>
                </Badge>
                <Badge>
                  <IconButton size="sm">
                    <User />
                  </IconButton>
                </Badge>
                <Badge content="NEW">
                  <IconButton size="sm">
                    <Mail />
                  </IconButton>
                </Badge>
              </Stack>
            </Grid>
          </Grid>
        </ComponentSection>

        {/* Navigation */}
        <ComponentSection title="Navigation" description="Tabs and segmented controls for navigation">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>Tabs</Typography>
              <Tabs
                items={[
                  { label: 'Overview', value: 0 },
                  { label: 'Analytics', value: 1 },
                  { label: 'Settings', value: 2 },
                  { label: 'Disabled', value: 3, disabled: true }
                ]}
                value={activeTab}
                onChange={(value) => setActiveTab(Number(value))}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>Segmented Control</Typography>
              <Segmented
                items={[
                  { label: 'Overview', value: 'overview' },
                  { label: 'Details', value: 'details' },
                  { label: 'History', value: 'history' }
                ]}
                value={segmentedValue}
                onChange={(value) => setSegmentedValue(String(value))}
              />
            </Grid>
          </Grid>
        </ComponentSection>

        {/* Progress */}
        <ComponentSection title="Progress" description="Progress indicators in different colors">
          <Stack spacing={3} maxWidth="400px">
            <Box>
              <Typography variant="body2" mb={1}>Default Progress (25%)</Typography>
              <Progress value={25} />
            </Box>
            <Box>
              <Typography variant="body2" mb={1}>Success Progress (60%)</Typography>
              <Progress value={60} color="success" />
            </Box>
            <Box>
              <Typography variant="body2" mb={1}>Warning Progress (85%)</Typography>
              <Progress value={85} color="warning" />
            </Box>
            <Box>
              <Typography variant="body2" mb={1}>Error Progress (40%)</Typography>
              <Progress value={40} color="error" />
            </Box>
          </Stack>
        </ComponentSection>

        {/* Empty State */}
        <ComponentSection title="Empty State" description="Placeholder for empty content areas">
          <Box maxWidth="400px" mx="auto">
            <EmptyState
              title="No items found"
              description="Try adjusting your search or filter criteria to find what you're looking for."
            />
          </Box>
        </ComponentSection>

        {/* Interactive Components */}
        <ComponentSection title="Interactive Components" description="Drawers, toasts, and other interactive elements">
          <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
            <Button variant="primary" onClick={() => setDrawerOpen(true)}>
              Open Drawer
            </Button>
            <Button variant="secondary" onClick={() => setToastOpen(true)}>
              Show Toast
            </Button>
          </Stack>
        </ComponentSection>

        {/* Icons */}
        <ComponentSection title="Icons" description="Available icons from the design system">
          <Grid container spacing={1}>
            {[
              { icon: <Plus />, name: 'Plus' },
              { icon: <Search />, name: 'Search' },
              { icon: <Star />, name: 'Star' },
              { icon: <Heart />, name: 'Heart' },
              { icon: <Settings />, name: 'Settings' },
              { icon: <Bell />, name: 'Bell' },
              { icon: <User />, name: 'User' },
              { icon: <Package />, name: 'Package' },
              { icon: <TrendingUp />, name: 'TrendingUp' },
              { icon: <X />, name: 'X' },
              { icon: <AlertCircle />, name: 'AlertCircle' },
              { icon: <Home />, name: 'Home' },
              { icon: <Calendar />, name: 'Calendar' },
              { icon: <Mail />, name: 'Mail' },
              { icon: <Phone />, name: 'Phone' }
            ].map(({ icon, name }) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={name}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                    background: 'white',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                >
                  {icon}
                  <Typography variant="caption" mt={1} textAlign="center">
                    {name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </ComponentSection>

        {/* Bottom spacing */}
        <Box sx={{ height: 4 }} />
      </Box>
      <PillTabs tabs={['Tab 1', 'Tab 2', 'Tab 3']} value={0} onChange={() => { }} />
      <BrandSwoosh tone="secondary" sx={{ fontSize: 64 }} />

      {/* Drawer Example */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Sample Drawer"
      >
        <Box p={2}>
          <Typography variant="body1" mb={2}>
            This is a sample drawer content.
          </Typography>
          <Stack spacing={2}>
            <Button variant="primary" fullWidth>
              Primary Action
            </Button>
            <Button variant="secondary" fullWidth onClick={() => setDrawerOpen(false)}>
              Close
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* Toast Example */}
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message="This is a sample toast message!"
        severity="success"
        autoHideDuration={3000}
      />
    </Box>
  )
}

// Helper component for organizing sections
function ComponentSection({
  title,
  description,
  children
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Box mb={6}>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={600} mb={1} color="#1a1a1a">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          background: 'white',
          borderRadius: 3,
          p: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
