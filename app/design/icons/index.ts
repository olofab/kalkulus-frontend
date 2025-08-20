/**
 * Lucide React icon re-exports and helpers
 * Commonly used icons for the design system
 */

import React from 'react'

// Navigation & Actions
export {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  X,
  MoreVertical,
  MoreHorizontal,
  Menu,
  Home,
  Settings,
} from 'lucide-react'

// Interface
export {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Eye,
  EyeOff,
  Edit,
  Trash2 as Delete,
  Download,
  Upload,
  Share,
  Copy,
  ExternalLink,
} from 'lucide-react'

// Status & Feedback
export {
  CheckCircle2 as CheckCircle,
  XCircle,
  AlertTriangle,
  AlertCircle,
  Info,
  Bell,
  BellOff,
  Heart,
  Star,
  Bookmark,
} from 'lucide-react'

// Communication
export {
  Mail,
  MessageCircle,
  Phone,
  Video,
  Send,
  Paperclip,
} from 'lucide-react'

// Files & Media
export {
  File,
  FileText,
  Image,
  Calendar,
  Clock,
  MapPin,
  Camera,
  Mic,
  Volume2,
  VolumeX,
} from 'lucide-react'

// Business & Analytics
export {
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  DollarSign,
  CreditCard,
  ShoppingCart,
  Package,
  Truck,
  Building,
  Users,
  User,
  UserPlus,
} from 'lucide-react'

// Utility function to get icon size based on design system tokens
export const getIconSize = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'): number => {
  const sizes = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  }
  return sizes[size]
}

// Common icon props for consistency
export const iconProps = {
  xs: { size: getIconSize('xs') },
  sm: { size: getIconSize('sm') },
  md: { size: getIconSize('md') },
  lg: { size: getIconSize('lg') },
  xl: { size: getIconSize('xl') },
}

// Icon component wrapper with design system integration
export interface IconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  className?: string
}

export const createIcon = (LucideIcon: React.ComponentType<any>) => {
  return ({ size = 'md', color, className, ...props }: IconProps) => (
    React.createElement(LucideIcon, {
      size: getIconSize(size),
      color,
      className,
      ...props
    })
  )
}
