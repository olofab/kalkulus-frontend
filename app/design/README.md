# Timla Design System

A modern, iOS-inspired design system built with Next.js, React, TypeScript, and Material-UI v5. Features soft, rounded aesthetics with comprehensive component library and design tokens.

## 🎨 Design Philosophy

- **Soft & Modern**: iOS-like aesthetic with rounded corners and subtle shadows
- **High Contrast**: Accessible text and clear visual hierarchy
- **Airy Layout**: Generous spacing and breathing room
- **Consistent**: Unified design tokens across all components

## 📦 Installation

The design system is built into your Next.js application. Simply import components from the design system:

```tsx
import Button from '@/app/design/components/Button'
import { Search } from '@/app/design/icons'
```

## 🔧 Setup

### Theme Integration

Replace your existing theme with the design system theme:

```tsx
// app/layout.tsx or your theme provider
import theme from '@/app/design/theme'
import { ThemeProvider } from '@mui/material/styles'

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
```

### TypeScript Support

The design system includes full TypeScript support with extended theme types. No additional configuration needed.

## 🎯 Design Tokens

### Radius
```tsx
radius = {
  xs: 8,    // Small elements
  sm: 12,   // Form controls
  md: 16,   // Cards, inputs
  lg: 20,   // Buttons
  xl: 24,   // Large cards
  round: 999 // Pills, badges
}
```

### Elevation (Shadows)
```tsx
elevation = {
  1: '0 1px 2px rgba(16, 24, 40, 0.06)',   // Subtle
  2: '0 2px 8px rgba(16, 24, 40, 0.08)',   // Default
  3: '0 8px 24px rgba(16, 24, 40, 0.10)'   // Prominent
}
```

### Surface
```tsx
surface = {
  base: 'rgba(255, 255, 255, 0.9)',      // Card backgrounds
  border: 'rgba(158, 158, 158, 0.6)'     // Subtle borders
}
```

### Typography
```tsx
typography = {
  titleLg: { fontWeight: 700, fontSize: 20 },
  title: { fontWeight: 600, fontSize: 18 },
  body: { fontWeight: 400, fontSize: 14 },
  caption: { fontWeight: 400, fontSize: 12 }
}
```

### Spacing
```tsx
spacing = {
  xs: 4,    sm: 8,    md: 12,
  lg: 16,   xl: 20,   xxl: 24
}
```

## 📚 Components

### Buttons

```tsx
import Button from '@/app/design/components/Button'

// Variants: primary, secondary, soft, ghost
// Sizes: sm, md, lg
<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="secondary" startIcon={<Plus />}>
  Add Item
</Button>
```

### Icon Buttons

```tsx
import IconButton from '@/app/design/components/IconButton'
import { Settings } from '@/app/design/icons'

// Sizes: sm (40px), md (48px)
<IconButton size="sm" soft color="primary">
  <Settings />
</IconButton>
```

### Cards

```tsx
import Card from '@/app/design/components/Card'

// Elevation: 1, 2, 3
// Padding: sm, md, lg
<Card elevation={2} padding="md">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// With header and footer
<Card 
  header={<h3>Header</h3>}
  footer={<Button>Action</Button>}
>
  Content
</Card>
```

### Stat Cards

```tsx
import StatCard from '@/app/design/components/StatCard'
import { TrendingUp } from '@/app/design/icons'

<StatCard
  icon={<TrendingUp />}
  title="Revenue"
  value="2.4M kr"
  progress={75}
  accentColor="#10B981"
  onClick={() => {}}
/>
```

### Forms

```tsx
import Input from '@/app/design/components/Input'
import SearchBar from '@/app/design/components/SearchBar'

// Input sizes: sm, md, lg
<Input 
  size="md" 
  label="Email"
  placeholder="Enter your email"
/>

// Search with debouncing
<SearchBar
  value={search}
  onChange={setSearch}
  debounceMs={300}
  placeholder="Search..."
/>
```

### Navigation

```tsx
import Tabs from '@/app/design/components/Tabs'
import Segmented from '@/app/design/components/Segmented'

// Standard tabs
<Tabs
  items={[
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' }
  ]}
  value={activeTab}
  onChange={setActiveTab}
/>

// iOS-style segmented control
<Segmented
  items={[
    { label: 'Overview', value: 'overview' },
    { label: 'Details', value: 'details' }
  ]}
  value={selected}
  onChange={setSelected}
  fullWidth
/>
```

### Drawers

```tsx
import Drawer from '@/app/design/components/Drawer'

// Bottom sheet with grabber
<Drawer
  variant="bottom"
  open={open}
  onClose={() => setOpen(false)}
  showGrabber
>
  <div>Drawer content</div>
</Drawer>
```

### Feedback

```tsx
import Toast from '@/app/design/components/Toast'
import EmptyState from '@/app/design/components/EmptyState'

// Toast notifications
<Toast
  open={showToast}
  severity="success"
  message="Item saved successfully!"
  onClose={() => setShowToast(false)}
/>

// Empty states
<EmptyState
  title="No items found"
  description="Try adjusting your filters"
  primaryAction={{
    label: 'Add Item',
    onClick: handleAdd
  }}
/>
```

### Progress

```tsx
import Progress from '@/app/design/components/Progress'

// Linear progress
<Progress variant="linear" value={65} showValue />

// Circular progress
<Progress variant="circular" value={75} showValue size="lg" />
```

### Layout

```tsx
import ToolbarHeader from '@/app/design/components/ToolbarHeader'
import CTAButtons from '@/app/design/components/CTAButtons'

// Mobile toolbar
<ToolbarHeader
  title="Page Title"
  showBack
  onBack={() => router.back()}
  actions={<IconButton><Settings /></IconButton>}
  blur
/>

// CTA button stack
<CTAButtons
  primary={{
    label: 'Save Changes',
    onClick: handleSave
  }}
  secondary={{
    label: 'Cancel',
    onClick: handleCancel
  }}
/>
```

## 🎭 Icons

Uses Lucide React for all icons. Common icons are re-exported from the design system:

```tsx
import { 
  Plus, Search, Settings, ChevronLeft,
  CheckCircle, AlertTriangle, Users,
  TrendingUp, MoreVertical 
} from '@/app/design/icons'

// With size helpers
import { getIconSize, iconProps } from '@/app/design/icons'

<Search {...iconProps.md} /> // 20px
<Plus {...iconProps.lg} />   // 24px
```

## 🖼️ Illustrations

Recommended illustration sources:
- [3dicons.co](https://3dicons.co/) (free)
- [Figma 3D Icons](https://www.figma.com/community/file/928108847914589057/3D-Icons) (free)
- Iconify: fluent-emoji, 3dicons, OpenMoji

Place illustrations in `/public/illustrations/` and reference them:

```tsx
<EmptyState 
  illustration="/illustrations/empty-box.png"
  title="No items"
/>
```

## 🧪 Playground

Test all components in the interactive playground:

```tsx
import Playground from '@/app/design/examples/Playground'

// Use in development to test components
<Playground />
```

## 🎯 Dashboard Example

See complete dashboard layout:

```tsx
import DashboardTiles from '@/app/design/examples/DashboardTiles'

<DashboardTiles 
  data={{
    revenue: { value: '2.4M kr', progress: 75 },
    users: { value: '1,234', progress: 60 }
  }}
  onTileClick={{
    revenue: () => router.push('/revenue')
  }}
/>
```

## ♿ Accessibility

- All components include proper ARIA labels
- Focus states are clearly visible (2px ring)
- Keyboard navigation support
- High contrast text and colors
- Screen reader friendly

## 🔄 Responsive Design

All components are mobile-first and responsive:
- Touch-friendly sizing (minimum 44px touch targets)
- Flexible layouts with Grid and Stack
- Adaptive spacing and typography
- Optimized for iOS and Android

## 📁 File Structure

```
app/design/
├── theme/
│   ├── tokens.ts      # Design tokens
│   └── index.ts       # MUI theme with overrides
├── components/        # All UI components
├── icons/            # Icon exports and utilities
└── examples/         # Playground and examples
```

## 🚀 Performance

- Tree-shakeable exports
- Minimal dependencies
- Optimized styled-components
- Efficient re-renders with React.memo where needed

## 🤝 Contributing

1. Follow existing component patterns
2. Include TypeScript types
3. Add JSDoc documentation
4. Test in Playground component
5. Update README for new components

---

Built with ❤️ for Timla using modern React patterns and Material-UI v5.
