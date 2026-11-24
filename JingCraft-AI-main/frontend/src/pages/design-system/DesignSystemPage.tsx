
import ColorPalette from '../../components/ui/ColorPalette'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Checkbox from '../../components/ui/Checkbox'
import RadioGroup from '../../components/ui/RadioGroup'
import Switch from '../../components/ui/Switch'
import Progress from '../../components/ui/Progress'
import Spinner from '../../components/ui/Spinner'
import Skeleton from '../../components/ui/Skeleton'
import Card from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import Tooltip from '../../components/ui/Tooltip'
import Tabs from '../../components/ui/Tabs'
import Accordion from '../../components/ui/Accordion'
import Dropdown from '../../components/ui/Dropdown'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Pagination from '../../components/ui/Pagination'
import { useState } from 'react'
import Table, { type TableColumn } from '../../components/ui/Table'
import Toast, { ToastContainer } from '../../components/ui/Toast'
import Textarea from '../../components/ui/Textarea'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import Alert from '../../components/ui/Alert'

import EmptyState, {
  EmptyStateIcons,
} from '../../components/ui/EmptyState'


import {
  ArrowRight,
  Sparkles,
  Mail,
  LockKeyhole,
  Search,
  Globe,
  Palette,
  Settings, 
  Trash2
} from 'lucide-react'


// Development-only page for reviewing and testing the design system.
// This page will not be included in the public website navigation.

function DesignSystemPage() {
    const [basicModalOpen, setBasicModalOpen] = useState(false)
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
    const [largeModalOpen, setLargeModalOpen] = useState(false)
    const [basicPage, setBasicPage] = useState(1)
    const [museumPage, setMuseumPage] = useState(5)
    const [historyPage, setHistoryPage] = useState(1)
    const [alertVisible, setAlertVisible] = useState(true)

    type CeramicRecord = {
    id: number
    name: string
    dynasty: string
    material: string
    status: string
}

const ceramicData: CeramicRecord[] = [
  {
    id: 1,
    name: 'Blue and White Porcelain',
    dynasty: 'Ming Dynasty',
    material: 'Porcelain',
    status: 'Verified',
  },
  {
    id: 2,
    name: 'Celadon Vase',
    dynasty: 'Song Dynasty',
    material: 'Stoneware',
    status: 'Verified',
  },
  {
    id: 3,
    name: 'Famille Rose Plate',
    dynasty: 'Qing Dynasty',
    material: 'Porcelain',
    status: 'Pending',
  },
]

const ceramicColumns: TableColumn<CeramicRecord>[] = [
  { key: 'name', header: 'Ceramic Name' },
  { key: 'dynasty', header: 'Dynasty' },
  { key: 'material', header: 'Material' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          row.status === 'Verified'
            ? 'bg-green-100 text-green-800'
            : 'bg-amber-100 text-amber-800'
        }`}
      >
        {row.status}
      </span>
    ),
  },
]

const [toastVariant, setToastVariant] = useState<
  'success' | 'error' | 'warning' | 'info'
>('success')

const [toastVisible, setToastVisible] = useState(false)

const showToast = (
  variant: 'success' | 'error' | 'warning' | 'info',
) => {
  setToastVariant(variant)
  setToastVisible(true)
}

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">

      {/* Design system page header */}
      <div className="mx-auto mb-12 max-w-7xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
          JingCraft AI
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl">
          Design System
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">
          A centralized visual foundation for the JingCraft AI
          experience, combining traditional Chinese ceramic heritage
          with modern digital design.
        </p>

        <div className="mt-6 h-px w-full bg-border" />
      </div>

      {/* Color palette preview */}
      <div className="mx-auto max-w-7xl">
        <ColorPalette />
      </div>

      {/* Button components */}
      <section className="mx-auto mt-16 max-w-7xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Button Components
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            Reusable button styles with consistent sizing,
            interaction states, and Motion-powered animations.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Button Variants
          </h3>
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-white p-6">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Button Sizes
          </h3>
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-white p-6">
            <Button size="sm">Small Button</Button>
            <Button size="md">Medium Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Button States
          </h3>
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-white p-6">
            <Button>Normal State</Button>
            <Button loading>Loading State</Button>
            <Button disabled>Disabled State</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Buttons with Icons
          </h3>
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-white p-6">
            <Button leftIcon={<Sparkles size={16} />}>
              Explore AI Studio
            </Button>
            <Button
              variant="outline"
              rightIcon={<ArrowRight size={16} />}
            >
              Explore Museum
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5">
          <h3 className="font-semibold text-foreground">
            Motion Interaction
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Hover over the buttons to test the subtle lift animation.
            Press a button to test its tap interaction. Disabled and
            loading buttons should not animate.
          </p>
        </div>
      </section>

      {/* Input components */}
      <section className="mx-auto mt-20 max-w-7xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Input Components
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            Accessible form inputs with consistent styling,
            focus interactions, helper messages, and validation states.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-white p-6 md:grid-cols-2">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            helperText="Please enter your first and last name."
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            leftIcon={<Mail size={18} />}
            helperText="We will use this email for account communication."
          />
          <Input
            label="Search Museum"
            placeholder="Search ceramic collections..."
            leftIcon={<Search size={18} />}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            leftIcon={<LockKeyhole size={18} />}
            helperText="Click the eye icon to show or hide your password."
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Validation States
          </h3>
          <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-white p-6 md:grid-cols-2">
            <Input
              label="Default State"
              placeholder="Enter your information"
            />
            <Input
              label="Success State"
              defaultValue="shahariar@example.com"
              type="email"
              success="Email address looks good."
            />
            <Input
              label="Error State"
              defaultValue="invalid-email"
              type="email"
              error="Please enter a valid email address."
            />
            <Input
              label="Disabled State"
              defaultValue="This field is disabled"
              disabled
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5">
          <h3 className="font-semibold text-foreground">
            Input Interaction
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Test keyboard navigation, focus styling, password visibility,
            and validation messages. Inputs use native HTML behavior
            and support standard form attributes.
          </p>
        </div>
      </section>

      {/* Select components */}
      <section className="mx-auto mt-20 max-w-7xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Select Components
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            Custom dropdown components with searchable options,
            keyboard navigation, and accessible validation states.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-white p-6 md:grid-cols-2">
          <Select
            label="Chinese Dynasty"
            placeholder="Choose a dynasty"
            options={[
              { label: 'Tang Dynasty', value: 'tang' },
              { label: 'Song Dynasty', value: 'song' },
              { label: 'Yuan Dynasty', value: 'yuan' },
              { label: 'Ming Dynasty', value: 'ming' },
              { label: 'Qing Dynasty', value: 'qing' },
            ]}
            helperText="Select a historical period to explore."
          />

          <Select
            label="Ceramic Category"
            placeholder="Select ceramic category"
            searchable
            searchPlaceholder="Search categories..."
            options={[
              { label: 'Blue and White Porcelain', value: 'blue-white' },
              { label: 'Celadon', value: 'celadon' },
              { label: 'Famille Rose', value: 'famille-rose' },
              { label: 'Doucai', value: 'doucai' },
              { label: 'Jun Ware', value: 'jun-ware' },
            ]}
            helperText="Search and select a ceramic category."
          />

          <Select
            label="Design Style"
            placeholder="Choose a design style"
            defaultValue="traditional"
            options={[
              { label: 'Traditional Chinese', value: 'traditional' },
              { label: 'Minimalist', value: 'minimalist' },
              { label: 'Contemporary', value: 'contemporary' },
              { label: 'Experimental', value: 'experimental' },
            ]}
          />

          <Select
            label="Museum Collection"
            placeholder="Choose a collection"
            options={[
              { label: 'Imperial Collection', value: 'imperial' },
              { label: 'Royal Ceramics', value: 'royal' },
              { label: 'Ancient Pottery', value: 'pottery', disabled: true },
              { label: 'Contemporary Works', value: 'contemporary' },
            ]}
            helperText="Some collections are currently unavailable."
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Validation States
          </h3>
          <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-white p-6 md:grid-cols-2">
            <Select
              label="Default State"
              placeholder="Select an option"
              options={[
                { label: 'Option One', value: 'one' },
                { label: 'Option Two', value: 'two' },
              ]}
            />
            <Select
              label="Success State"
              defaultValue="verified"
              options={[
                { label: 'Verified', value: 'verified' },
                { label: 'Pending', value: 'pending' },
              ]}
              success="Your selection has been verified."
            />
            <Select
              label="Error State"
              placeholder="Select a required option"
              options={[
                { label: 'Option One', value: 'one' },
                { label: 'Option Two', value: 'two' },
              ]}
              error="Please select a valid option."
            />
            <Select
              label="Disabled State"
              placeholder="Selection unavailable"
              disabled
              options={[
                { label: 'Option One', value: 'one' },
                { label: 'Option Two', value: 'two' },
              ]}
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5">
          <h3 className="font-semibold text-foreground">
            Select Interaction
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Test dropdown opening, searchable options, disabled options,
            keyboard navigation, Escape to close, and clear selection.
            The component supports both controlled and uncontrolled usage.
          </p>
        </div>
      </section>

      {/* Checkbox components */}
      <section className="mx-auto mt-20 max-w-7xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Checkbox Components
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            Accessible checkbox controls for preferences, filters,
            and multi-selection forms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-white p-6 md:grid-cols-2">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-foreground">
              Basic States
            </h3>
            <Checkbox label="Unchecked Checkbox" />
            <Checkbox label="Checked Checkbox" defaultChecked />
            <Checkbox label="Disabled Checkbox" disabled />
            <Checkbox
              label="Disabled Checked Checkbox"
              defaultChecked
              disabled
            />
          </div>

          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-foreground">
              Helper and Validation
            </h3>
            <Checkbox
              label="Accept Terms and Conditions"
              helperText="You must accept the terms before continuing."
            />
            <Checkbox
              label="Verified Preference"
              defaultChecked
              success="Your preference has been saved."
            />
            <Checkbox
              label="Required Agreement"
              error="Please accept this agreement to continue."
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Ceramic Interest Filters
          </h3>
          <div className="rounded-xl border border-border bg-white p-6">
            <p className="mb-5 text-sm text-text-muted">
              Select the ceramic topics you want to explore.
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Checkbox
                label="Blue and White Porcelain"
                defaultChecked
              />
              <Checkbox label="Chinese Celadon" />
              <Checkbox label="Traditional Ceramic Motifs" />
              <Checkbox label="Imperial Ceramics" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5">
          <h3 className="font-semibold text-foreground">
            Checkbox Interaction
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Test checked and unchecked states, keyboard interaction
            using Tab and Space, disabled controls, and validation
            messages. Checkboxes support controlled and uncontrolled usage.
          </p>
        </div>
      </section>

      {/* Radio group components */}
      <section className="mx-auto mt-20 max-w-7xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Radio Group Components
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            Accessible single-selection controls with horizontal and
            vertical layouts, descriptions, and validation states.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-white p-6 md:grid-cols-2">
          <RadioGroup
            label="Ceramic Design Style"
            defaultValue="traditional"
            options={[
              {
                label: 'Traditional Chinese',
                value: 'traditional',
                description: 'Inspired by historical Chinese ceramic art.',
              },
              {
                label: 'Minimalist',
                value: 'minimalist',
                description: 'Clean shapes and restrained decoration.',
              },
              {
                label: 'Contemporary',
                value: 'contemporary',
                description: 'Modern interpretations of ceramic design.',
              },
            ]}
            helperText="Choose one preferred design direction."
          />

          <RadioGroup
            label="Museum Display Layout"
            direction="horizontal"
            defaultValue="grid"
            options={[
              { label: 'Grid View', value: 'grid' },
              { label: 'List View', value: 'list' },
              { label: 'Gallery View', value: 'gallery' },
            ]}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Disabled Options
          </h3>
          <div className="rounded-xl border border-border bg-white p-6">
            <RadioGroup
              label="AI Rendering Quality"
              defaultValue="standard"
              options={[
                {
                  label: 'Standard',
                  value: 'standard',
                  description: 'Balanced quality and processing time.',
                },
                {
                  label: 'High Quality',
                  value: 'high',
                  description: 'More detailed visual output.',
                },
                {
                  label: 'Ultra Quality',
                  value: 'ultra',
                  description: 'Currently unavailable.',
                  disabled: true,
                },
              ]}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Validation States
          </h3>
          <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-white p-6 md:grid-cols-2">
            <RadioGroup
              label="Default State"
              options={[
                { label: 'Option One', value: 'one' },
                { label: 'Option Two', value: 'two' },
              ]}
            />
            <RadioGroup
              label="Success State"
              defaultValue="approved"
              options={[
                { label: 'Approved', value: 'approved' },
                { label: 'Pending', value: 'pending' },
              ]}
              success="Your selection has been saved."
            />
            <RadioGroup
              label="Error State"
              options={[
                { label: 'Option One', value: 'one' },
                { label: 'Option Two', value: 'two' },
              ]}
              error="Please select an option to continue."
            />
            <RadioGroup
              label="Disabled Group"
              defaultValue="enabled"
              disabled
              options={[
                { label: 'Enabled', value: 'enabled' },
                { label: 'Disabled', value: 'disabled' },
              ]}
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5">
          <h3 className="font-semibold text-foreground">
            Radio Group Interaction
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Test single-option selection, arrow-key navigation,
            Tab focus, disabled options, and validation messages.
            Only one option can be selected within each group.
          </p>
        </div>
      </section>

      {/* Switch components */}
      <section className="mx-auto mt-20 max-w-7xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Switch Components
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            Accessible toggle controls for settings, preferences,
            and interactive application features.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-white p-6 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Basic States
            </h3>
            <Switch
              label="Default Off"
              description="This setting is currently disabled."
            />
            <Switch
              label="Default On"
              defaultChecked
              description="This setting is currently enabled."
            />
            <Switch label="Disabled Off" disabled />
            <Switch
              label="Disabled On"
              defaultChecked
              disabled
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Sizes
            </h3>
            <Switch label="Small Switch" size="sm" defaultChecked />
            <Switch label="Medium Switch" size="md" defaultChecked />
            <Switch label="Large Switch" size="lg" defaultChecked />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            JingCraft AI Settings
          </h3>
          <div className="space-y-6 rounded-xl border border-border bg-white p-6">
            <Switch
              label="AI Auto-Enhancement"
              description="Enable automatic visual enhancement for ceramic designs."
              defaultChecked
            />
            <div className="h-px bg-border" />
            <Switch
              label="3D Preview"
              description="Enable interactive 3D previews when available."
              defaultChecked
            />
            <div className="h-px bg-border" />
            <Switch
              label="Design Notifications"
              description="Receive notifications about design updates."
            />
            <div className="h-px bg-border" />
            <Switch
              label="High Quality Rendering"
              description="Use higher-quality rendering when supported."
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Helper and Validation States
          </h3>
          <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-white p-6 md:grid-cols-2">
            <Switch
              label="Default State"
              helperText="This is a helper message."
            />
            <Switch
              label="Success State"
              defaultChecked
              success="Your preference has been saved."
            />
            <Switch
              label="Error State"
              error="This setting requires your attention."
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5">
          <h3 className="font-semibold text-foreground">
            Switch Interaction
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Test On/Off interaction, different sizes, disabled states,
            keyboard interaction using Tab and Space, and validation
            messages. Switches support controlled and uncontrolled usage.
          </p>
        </div>
      </section>

      {/* Progress components */}
      <section className="mx-auto mt-20 max-w-7xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Progress Components
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            Progress indicators for AI analysis, image uploads,
            and 3D model processing.
          </p>
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-white p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Progress Values
          </h3>
          <Progress label="Not Started" value={0} showValue />
          <Progress label="Image Upload" value={25} showValue />
          <Progress label="AI Analysis" value={50} showValue />
          <Progress label="3D Processing" value={75} showValue />
          <Progress
            label="Completed"
            value={100}
            showValue
            variant="success"
          />
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-white p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Color Variants
          </h3>
          <Progress label="Primary" value={70} variant="primary" showValue />
          <Progress label="Secondary" value={70} variant="secondary" showValue />
          <Progress label="Success" value={70} variant="success" showValue />
          <Progress label="Warning" value={70} variant="warning" showValue />
          <Progress label="Error" value={70} variant="error" showValue />
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-white p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Progress Sizes
          </h3>
          <Progress label="Small" value={65} size="sm" showValue />
          <Progress label="Medium" value={65} size="md" showValue />
          <Progress label="Large" value={65} size="lg" showValue />
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-white p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Indeterminate Loading
          </h3>
          <Progress label="Loading AI model" showValue />
          <Progress label="Preparing 3D environment" />
        </div>
      </section>

      {/* Spinner components */}
      <section className="mx-auto mt-20 max-w-7xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Spinner Components
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            Lightweight loading indicators for AI processing,
            image uploads, and 3D visualization tasks.
          </p>
        </div>

        <div className="space-y-5 rounded-xl border border-border bg-white p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Spinner Sizes
          </h3>
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <Spinner size="xs" />
              <span className="text-xs text-text-muted">Extra Small</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Spinner size="sm" />
              <span className="text-xs text-text-muted">Small</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Spinner size="md" />
              <span className="text-xs text-text-muted">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Spinner size="lg" />
              <span className="text-xs text-text-muted">Large</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Spinner size="xl" />
              <span className="text-xs text-text-muted">Extra Large</span>
            </div>
          </div>
        </div>

        <div className="space-y-5 rounded-xl border border-border bg-white p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Color Variants
          </h3>
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex items-center gap-3">
              <Spinner variant="primary" size="lg" />
              <span className="text-sm text-foreground">Primary</span>
            </div>
            <div className="flex items-center gap-3">
              <Spinner variant="secondary" size="lg" />
              <span className="text-sm text-foreground">Secondary</span>
            </div>
            <div className="flex items-center gap-3">
              <Spinner variant="muted" size="lg" />
              <span className="text-sm text-foreground">Muted</span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-primary p-5">
            <Spinner variant="white" size="lg" />
            <span className="text-sm text-white">
              White on dark background
            </span>
          </div>
        </div>

        <div className="space-y-5 rounded-xl border border-border bg-white p-6">
          <h3 className="text-lg font-semibold text-foreground">
            JingCraft AI Loading States
          </h3>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <Spinner label="Analyzing ceramic image" />
              <span className="text-sm text-text-muted">
                Analyzing ceramic image...
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Spinner variant="secondary" label="Loading 3D model" />
              <span className="text-sm text-text-muted">
                Loading 3D model...
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Spinner variant="muted" label="Preparing visualization" />
              <span className="text-sm text-text-muted">
                Preparing visualization...
              </span>
            </div>
          </div>
        </div>
      </section>


    
      {/* Reusable skeleton component preview */}
      <section className="mx-auto mt-20 max-w-7xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Skeleton Components
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            Loading placeholders for museum collections,
            ceramic galleries, AI results, and user profiles.
          </p>
        </div>

        {/* Skeleton variants */}
        <div className="space-y-6 rounded-xl border border-border bg-white p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Skeleton Variants
          </h3>

          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm text-text-muted">Text</p>
              <Skeleton variant="text" width="60%" />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-text-muted">Circular</p>
              <Skeleton variant="circular" width={56} height={56} />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-text-muted">Rectangular</p>
              <Skeleton variant="rectangular" width="100%" height={120} />
            </div>
          </div>
        </div>

        {/* Multiple text lines */}
        <div className="space-y-5 rounded-xl border border-border bg-white p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Text Loading
          </h3>

          <Skeleton variant="text" lines={3} />
          <Skeleton variant="text" lines={5} />
        </div>

        {/* Museum collection card skeleton */}
        <div className="space-y-5 rounded-xl border border-border bg-white p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Museum Collection Loading
          </h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="space-y-4 rounded-xl border border-border p-4"
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={180}
                />
                <Skeleton variant="text" width="65%" />
                <Skeleton variant="text" lines={2} />
              </div>
            ))}
          </div>
        </div>

        {/* User profile skeleton */}
        <div className="space-y-5 rounded-xl border border-border bg-white p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Profile Loading
          </h3>

          <div className="flex items-center gap-4">
            <Skeleton
              variant="circular"
              width={56}
              height={56}
            />

            <div className="flex-1 space-y-3">
              <Skeleton variant="text" width="35%" />
              <Skeleton variant="text" width="55%" />
            </div>
          </div>
        </div>

        {/* Animation control */}
        <div className="space-y-5 rounded-xl border border-border bg-white p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Animation Control
          </h3>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm text-text-muted">
                Animated Skeleton
              </p>
              <Skeleton width="100%" height={48} />
            </div>

            <div>
              <p className="mb-2 text-sm text-text-muted">
                Static Skeleton
              </p>
              <Skeleton
                width="100%"
                height={48}
                animation={false}
              />
            </div>
          </div>
        </div>
      </section>
   
    

      {/* Reusable card component preview */}
      <section className="mx-auto mt-20 max-w-7xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Card Components
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            Flexible content containers for museum collections,
            ceramic artworks, AI results, and heritage information.
          </p>
        </div>

        {/* Card variants */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-foreground">
            Card Variants
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card variant="default">
              <h4 className="font-semibold text-primary">Default Card</h4>
              <p className="mt-2 text-sm text-text-muted">
                A clean content container with a subtle shadow.
              </p>
            </Card>

            <Card variant="outlined">
              <h4 className="font-semibold text-primary">Outlined Card</h4>
              <p className="mt-2 text-sm text-text-muted">
                A minimal card with a refined border.
              </p>
            </Card>

            <Card variant="elevated">
              <h4 className="font-semibold text-primary">Elevated Card</h4>
              <p className="mt-2 text-sm text-text-muted">
                A card with stronger visual elevation.
              </p>
            </Card>
          </div>
        </div>

        {/* Card padding */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-foreground">
            Card Padding
          </h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card padding="none" variant="outlined">
              <div className="bg-primary/10 p-4 text-sm text-primary">
                No Padding
              </div>
            </Card>

            <Card padding="sm" variant="outlined">
              <p className="text-sm text-foreground">Small Padding</p>
            </Card>

            <Card padding="md" variant="outlined">
              <p className="text-sm text-foreground">Medium Padding</p>
            </Card>

            <Card padding="lg" variant="outlined">
              <p className="text-sm text-foreground">Large Padding</p>
            </Card>
          </div>
        </div>

        {/* Museum collection cards */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-foreground">
            Museum Collection Cards
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card hoverable padding="none">
              <div className="flex h-44 items-center justify-center rounded-t-2xl bg-[#E8EDF1]">
                <span className="font-chinese text-5xl text-primary">
                  青瓷
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Song Dynasty
                </p>
                <h4 className="mt-2 font-semibold text-primary">
                  Celadon Collection
                </h4>
                <p className="mt-2 text-sm text-text-muted">
                  Discover the elegance of traditional Chinese celadon.
                </p>
              </div>
            </Card>

            <Card hoverable padding="none">
              <div className="flex h-44 items-center justify-center rounded-t-2xl bg-[#E5EAF2]">
                <span className="font-chinese text-5xl text-primary">
                  青花
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Ming Dynasty
                </p>
                <h4 className="mt-2 font-semibold text-primary">
                  Blue & White Porcelain
                </h4>
                <p className="mt-2 text-sm text-text-muted">
                  Explore the iconic blue-and-white ceramic tradition.
                </p>
              </div>
            </Card>

            <Card hoverable padding="none">
              <div className="flex h-44 items-center justify-center rounded-t-2xl bg-[#F0E8DC]">
                <span className="font-chinese text-5xl text-primary">
                  粉彩
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Qing Dynasty
                </p>
                <h4 className="mt-2 font-semibold text-primary">
                  Famille Rose Collection
                </h4>
                <p className="mt-2 text-sm text-text-muted">
                  Explore colorful decorative porcelain traditions.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Hover interaction */}
        <div className="rounded-xl border border-border bg-white p-5">
          <h3 className="font-semibold text-foreground">
            Card Interaction
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Hover over the collection cards to test the lift and shadow
            effects. Resize the browser to check responsive layouts.
          </p>
        </div>
      </section>


    
      {/* Reusable modal component preview */}
      <section className="mx-auto mt-20 max-w-7xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            Modal Components
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            Accessible dialog windows for confirmations, artwork details,
            and AI analysis information.
          </p>
        </div>

        {/* Modal triggers */}
        <div className="flex flex-wrap gap-4 rounded-xl border border-border bg-white p-6">
          <Button onClick={() => setBasicModalOpen(true)}>
            Open Basic Modal
          </Button>

          <Button
            variant="outline"
            onClick={() => setConfirmationModalOpen(true)}
          >
            Open Confirmation Modal
          </Button>

          <Button
            variant="secondary"
            onClick={() => setLargeModalOpen(true)}
          >
            Open Large Modal
          </Button>
        </div>

        {/* Basic modal */}
        <Modal
          open={basicModalOpen}
          onClose={() => setBasicModalOpen(false)}
          title="Ceramic Artwork Details"
          description="Explore the cultural background of this ceramic artwork."
        >
          <div className="space-y-4">
            <div className="flex h-48 items-center justify-center rounded-xl bg-[#E5EAF2]">
              <span className="font-chinese text-6xl text-primary">
                青花
              </span>
            </div>

            <h3 className="font-semibold text-primary">
              Blue and White Porcelain
            </h3>

            <p className="text-sm leading-relaxed text-text-muted">
              Blue and white porcelain is a celebrated Chinese ceramic
              tradition known for its blue decoration on a white surface.
            </p>
          </div>
        </Modal>

        {/* Confirmation modal */}
        <Modal
          open={confirmationModalOpen}
          onClose={() => setConfirmationModalOpen(false)}
          title="Confirm Your Action"
          description="This is an example confirmation dialog."
          size="sm"
          footer={
            <>
              <Button
                variant="outline"
                onClick={() => setConfirmationModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setConfirmationModalOpen(false)}
              >
                Confirm
              </Button>
            </>
          }
        >
          <p className="text-sm leading-relaxed text-text-muted">
            Are you sure you want to continue? This preview does not
            perform any permanent action.
          </p>
        </Modal>

        {/* Large modal */}
        <Modal
          open={largeModalOpen}
          onClose={() => setLargeModalOpen(false)}
          title="AI Analysis Preview"
          description="Example of a larger dialog for displaying AI evaluation results."
          size="lg"
          footer={
            <Button onClick={() => setLargeModalOpen(false)}>
              Close Preview
            </Button>
          }
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card variant="outlined">
                <p className="text-sm text-text-muted">
                  Cultural Accuracy
                </p>
                <p className="mt-2 text-2xl font-semibold text-primary">
                  92/100
                </p>
              </Card>

              <Card variant="outlined">
                <p className="text-sm text-text-muted">
                  Visual Quality
                </p>
                <p className="mt-2 text-2xl font-semibold text-primary">
                  88/100
                </p>
              </Card>
            </div>

            <div className="rounded-xl bg-background p-4">
              <h3 className="font-semibold text-foreground">
                Analysis Summary
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                This is illustrative demonstration content, not a real
                AI evaluation result.
              </p>
            </div>
          </div>
        </Modal>
      </section>


    
{/* Reusable tooltip component preview */}
<section className="mx-auto mt-20 max-w-7xl space-y-8">
  <div>
    <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
      Tooltip Components
    </h2>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
      Contextual information displayed when users hover over or focus on
      interactive elements.
    </p>
  </div>

  {/* Tooltip placements */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Tooltip Placements
    </h3>

    <div className="flex flex-wrap items-center justify-center gap-10 py-10">
      <Tooltip content="This tooltip appears above the button." placement="top">
        <Button variant="outline">Top Tooltip</Button>
      </Tooltip>

      <Tooltip content="This tooltip appears below the button." placement="bottom">
        <Button variant="outline">Bottom Tooltip</Button>
      </Tooltip>

      <Tooltip content="This tooltip appears to the left." placement="left">
        <Button variant="outline">Left Tooltip</Button>
      </Tooltip>

      <Tooltip content="This tooltip appears to the right." placement="right">
        <Button variant="outline">Right Tooltip</Button>
      </Tooltip>
    </div>
  </div>

  {/* Different tooltip content */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      JingCraft AI Examples
    </h3>

    <div className="flex flex-wrap items-center gap-6">
      <Tooltip content="Explore historical Chinese ceramic collections.">
        <Button>Explore Museum</Button>
      </Tooltip>

      <Tooltip content="Upload an image to begin the design process.">
        <Button variant="secondary">Upload Artwork</Button>
      </Tooltip>

      <Tooltip content="This feature is currently unavailable." placement="bottom">
        <Button variant="outline" disabled>
          Coming Soon
        </Button>
      </Tooltip>
    </div>
  </div>

  {/* Disabled tooltip */}
  <div className="rounded-xl border border-border bg-white p-6">
    <h3 className="font-semibold text-foreground">
      Disabled Tooltip
    </h3>

    <p className="mt-2 text-sm text-text-muted">
      This button does not display a tooltip.
    </p>

    <div className="mt-5">
      <Tooltip content="This message should not appear." disabled>
        <Button variant="outline">Tooltip Disabled</Button>
      </Tooltip>
    </div>
  </div>

  {/* Interaction guidance */}
  <div className="rounded-xl border border-border bg-white p-5">
    <h3 className="font-semibold text-foreground">
      Tooltip Interaction
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-text-muted">
      Test hover and keyboard focus interactions, all four placements,
      disabled tooltips, and responsive behavior.
    </p>
  </div>
</section>






{/* Reusable tabs component preview */}
<section className="mx-auto mt-20 max-w-7xl space-y-8">
  <div>
    <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
      Tabs Components
    </h2>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
      Flexible tab navigation for organizing museum collections,
      AI analysis results, and ceramic design information.
    </p>
  </div>

  {/* Underline variant */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Underline Tabs
    </h3>

    <Tabs
      variant="underline"
      items={[
        {
          label: 'Overview',
          value: 'overview',
          content: (
            <div className="rounded-lg bg-background p-5">
              <h4 className="font-semibold text-primary">Museum Overview</h4>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Explore the history and development of traditional
                Chinese ceramic art.
              </p>
            </div>
          ),
        },
        {
          label: 'Collections',
          value: 'collections',
          content: (
            <div className="rounded-lg bg-background p-5">
              <h4 className="font-semibold text-primary">Ceramic Collections</h4>
              <p className="mt-2 text-sm text-text-muted">
                Discover porcelain, celadon, and other ceramic traditions.
              </p>
            </div>
          ),
        },
        {
          label: 'History',
          value: 'history',
          content: (
            <div className="rounded-lg bg-background p-5">
              <h4 className="font-semibold text-primary">Historical Background</h4>
              <p className="mt-2 text-sm text-text-muted">
                Learn about the historical context of Chinese ceramics.
              </p>
            </div>
          ),
        },
      ]}
    />
  </div>

  {/* Pills variant */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Pills Tabs
    </h3>

    <Tabs
      variant="pills"
      defaultValue="cultural"
      items={[
        {
          label: 'Cultural Accuracy',
          value: 'cultural',
          content: (
            <p className="rounded-lg bg-background p-5 text-sm text-text-muted">
              Review the cultural accuracy of ceramic motifs and
              traditional visual elements.
            </p>
          ),
        },
        {
          label: 'Visual Quality',
          value: 'visual',
          content: (
            <p className="rounded-lg bg-background p-5 text-sm text-text-muted">
              Review visual composition, colors, and decorative details.
            </p>
          ),
        },
        {
          label: 'Recommendations',
          value: 'recommendations',
          content: (
            <p className="rounded-lg bg-background p-5 text-sm text-text-muted">
              Explore illustrative recommendations for improving a design.
            </p>
          ),
        },
      ]}
    />
  </div>

  {/* Boxed variant */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Boxed Tabs
    </h3>

    <Tabs
      variant="boxed"
      defaultValue="design"
      items={[
        {
          label: 'Design',
          value: 'design',
          content: (
            <div className="rounded-lg bg-background p-5">
              <h4 className="font-semibold text-primary">Design Workspace</h4>
              <p className="mt-2 text-sm text-text-muted">
                Configure your ceramic artwork and visual style.
              </p>
            </div>
          ),
        },
        {
          label: 'Patterns',
          value: 'patterns',
          content: (
            <div className="rounded-lg bg-background p-5">
              <h4 className="font-semibold text-primary">Pattern Library</h4>
              <p className="mt-2 text-sm text-text-muted">
                Explore traditional Chinese decorative patterns.
              </p>
            </div>
          ),
        },
        {
          label: 'Materials',
          value: 'materials',
          content: (
            <div className="rounded-lg bg-background p-5">
              <h4 className="font-semibold text-primary">Material Settings</h4>
              <p className="mt-2 text-sm text-text-muted">
                Explore ceramic surface and material settings.
              </p>
            </div>
          ),
        },
      ]}
    />
  </div>

  {/* Vertical tabs */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Vertical Tabs
    </h3>

    <Tabs
      orientation="vertical"
      variant="pills"
      defaultValue="blue-white"
      items={[
        {
          label: 'Blue & White',
          value: 'blue-white',
          content: (
            <div className="min-h-36 rounded-lg bg-background p-5">
              <h4 className="font-semibold text-primary">Blue and White Porcelain</h4>
              <p className="mt-2 text-sm text-text-muted">
                A ceramic tradition featuring blue decoration on a
                white porcelain surface.
              </p>
            </div>
          ),
        },
        {
          label: 'Celadon',
          value: 'celadon',
          content: (
            <div className="min-h-36 rounded-lg bg-background p-5">
              <h4 className="font-semibold text-primary">Celadon Ceramics</h4>
              <p className="mt-2 text-sm text-text-muted">
                Explore the distinctive glaze traditions associated
                with Chinese celadon.
              </p>
            </div>
          ),
        },
        {
          label: 'Famille Rose',
          value: 'famille-rose',
          content: (
            <div className="min-h-36 rounded-lg bg-background p-5">
              <h4 className="font-semibold text-primary">Famille Rose</h4>
              <p className="mt-2 text-sm text-text-muted">
                Explore colorful decorative porcelain traditions.
              </p>
            </div>
          ),
        },
      ]}
    />
  </div>

  {/* Disabled tab */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Disabled Tab
    </h3>

    <Tabs
      variant="underline"
      defaultValue="available"
      items={[
        {
          label: 'Available',
          value: 'available',
          content: (
            <p className="rounded-lg bg-background p-5 text-sm text-text-muted">
              This tab is currently available.
            </p>
          ),
        },
        {
          label: 'Coming Soon',
          value: 'coming-soon',
          disabled: true,
          content: <p>This content is unavailable.</p>,
        },
      ]}
    />
  </div>

  {/* Interaction guidance */}
  <div className="rounded-xl border border-border bg-white p-5">
    <h3 className="font-semibold text-foreground">
      Tabs Interaction
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-text-muted">
      Test all three visual variants, horizontal and vertical layouts,
      disabled tabs, keyboard navigation using arrow keys, Home and End,
      and responsive behavior.
    </p>
  </div>
</section>



{/* Reusable accordion component preview */}
<section className="mx-auto mt-20 max-w-7xl space-y-8">
  <div>
    <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
      Accordion Components
    </h2>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
      Expandable content panels for FAQs, ceramic history,
      museum information, and AI analysis details.
    </p>
  </div>

  {/* Default accordion */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Default Accordion
    </h3>

    <Accordion
      items={[
        {
          id: 'history',
          title: 'What is Chinese porcelain?',
          content: 'Chinese porcelain is a high-fired ceramic tradition known for its refined body, durability, and distinctive glazed surfaces.',
        },
        {
          id: 'celadon',
          title: 'What is Chinese celadon?',
          content: 'Celadon refers to ceramic wares associated with characteristic greenish glazes and a long history in East Asian ceramic traditions.',
        },
        {
          id: 'blue-white',
          title: 'What is blue and white porcelain?',
          content: 'Blue and white porcelain is decorated with blue designs, commonly using cobalt-based pigment beneath a transparent glaze.',
        },
      ]}
    />
  </div>

  {/* Bordered accordion */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Bordered Accordion
    </h3>

    <Accordion
      variant="bordered"
      defaultOpenItems={['accuracy']}
      items={[
        {
          id: 'accuracy',
          title: 'Cultural Accuracy',
          content: 'Review whether the generated ceramic design respects the cultural context of its selected motifs and decorative elements.',
        },
        {
          id: 'visual',
          title: 'Visual Quality',
          content: 'Review composition, color balance, pattern placement, and visual consistency.',
        },
        {
          id: 'recommendations',
          title: 'AI Recommendations',
          content: 'Explore suggested improvements and possible design refinements. This preview uses illustrative content.',
        },
      ]}
    />
  </div>

  {/* Separated accordion */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Separated Accordion
    </h3>

    <Accordion
      variant="separated"
      items={[
        {
          id: 'upload',
          title: 'Step 1 — Upload Artwork',
          content: 'Select a ceramic image from your device to begin the design workflow.',
        },
        {
          id: 'analysis',
          title: 'Step 2 — AI Analysis',
          content: 'The planned workflow analyzes visual and cultural characteristics when backend integration is available.',
        },
        {
          id: 'visualization',
          title: 'Step 3 — 3D Visualization',
          content: 'The planned 3D studio will let users explore ceramic models and design variations.',
        },
      ]}
    />
  </div>

  {/* Multiple open items */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Multiple Open Items
    </h3>

    <Accordion
      allowMultiple
      defaultOpenItems={['mission', 'vision']}
      items={[
        {
          id: 'mission',
          title: 'Our Mission',
          content: 'Connect traditional Chinese ceramic heritage with accessible digital experiences.',
        },
        {
          id: 'vision',
          title: 'Our Vision',
          content: 'Create a meaningful digital space for cultural exploration and AI-assisted ceramic creativity.',
        },
        {
          id: 'values',
          title: 'Our Values',
          content: 'Cultural respect, historical awareness, thoughtful innovation, and accessible design.',
        },
      ]}
    />
  </div>

  {/* Disabled item */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Disabled Accordion Item
    </h3>

    <Accordion
      variant="bordered"
      items={[
        {
          id: 'available',
          title: 'Available Information',
          content: 'This accordion item is available and can be expanded.',
        },
        {
          id: 'unavailable',
          title: 'Restricted Information',
          content: 'This content is currently unavailable.',
          disabled: true,
        },
      ]}
    />
  </div>

  {/* Interaction guidance */}
  <div className="rounded-xl border border-border bg-white p-5">
    <h3 className="font-semibold text-foreground">
      Accordion Interaction
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-text-muted">
      Test expand and collapse, single-open mode, multiple-open mode,
      default expanded items, disabled items, and responsive behavior.
    </p>
  </div>
</section>




{/* Reusable dropdown component preview */}
<section className="mx-auto mt-20 max-w-7xl space-y-8">
  <div>
    <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
      Dropdown Components
    </h2>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
      Flexible dropdown menus for navigation, language selection,
      museum filters, and application actions.
    </p>
  </div>

  {/* Dropdown variants */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Dropdown Variants
    </h3>

    <div className="flex flex-wrap gap-4">
      <Dropdown
        triggerLabel="Default Menu"
        variant="default"
        items={[
          { label: 'My Profile', value: 'profile' },
          { label: 'Settings', value: 'settings' },
          { label: 'Sign Out', value: 'signout' },
        ]}
      />

      <Dropdown
        triggerLabel="Outline Menu"
        variant="outline"
        items={[
          { label: 'Overview', value: 'overview' },
          { label: 'Collections', value: 'collections' },
          { label: 'History', value: 'history' },
        ]}
      />

      <Dropdown
        triggerLabel="Ghost Menu"
        variant="ghost"
        items={[
          { label: 'Edit Design', value: 'edit' },
          { label: 'Duplicate', value: 'duplicate' },
          { label: 'Delete', value: 'delete' },
        ]}
      />
    </div>
  </div>

  {/* Language selection */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Language Selection
    </h3>

    <Dropdown
      triggerLabel="Language"
      items={[
        { label: 'English', value: 'en', icon: <Globe size={16} /> },
        { label: '简体中文', value: 'zh-CN', icon: <Globe size={16} /> },
        { label: 'বাংলা', value: 'bn', icon: <Globe size={16} /> },
      ]}
    />
  </div>

  {/* Museum filters */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Museum Collection Filters
    </h3>

    <div className="flex flex-wrap gap-4">
      <Dropdown
        triggerLabel="Dynasty"
        items={[
          { label: 'Tang Dynasty', value: 'tang' },
          { label: 'Song Dynasty', value: 'song' },
          { label: 'Yuan Dynasty', value: 'yuan' },
          { label: 'Ming Dynasty', value: 'ming' },
          { label: 'Qing Dynasty', value: 'qing' },
        ]}
      />

      <Dropdown
        triggerLabel="Ceramic Type"
        items={[
          { label: 'Blue & White Porcelain', value: 'blue-white' },
          { label: 'Celadon', value: 'celadon' },
          { label: 'Famille Rose', value: 'famille-rose' },
        ]}
      />
    </div>
  </div>

  {/* Dropdown with icons and actions */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Artwork Actions
    </h3>

    <Dropdown
      triggerLabel="Artwork Actions"
      items={[
        {
          label: 'Edit Design',
          value: 'edit',
          icon: <Palette size={16} />,
        },
        {
          label: 'Settings',
          value: 'settings',
          icon: <Settings size={16} />,
        },
        {
          label: 'Export Artwork',
          value: 'export',
          disabled: true,
        },
        {
          label: 'Delete Artwork',
          value: 'delete',
          destructive: true,
          icon: <Trash2 size={16} />,
        },
      ]}
    />
  </div>

  {/* Placement and alignment */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Placement and Alignment
    </h3>

    <div className="flex flex-wrap items-center justify-between gap-6 py-10">
      <Dropdown
        triggerLabel="Align Start"
        placement="bottom"
        align="start"
        items={[
          { label: 'Option One', value: 'one' },
          { label: 'Option Two', value: 'two' },
        ]}
      />

      <Dropdown
        triggerLabel="Align End"
        placement="bottom"
        align="end"
        items={[
          { label: 'Option One', value: 'one' },
          { label: 'Option Two', value: 'two' },
        ]}
      />

      <Dropdown
        triggerLabel="Open Above"
        placement="top"
        items={[
          { label: 'Option One', value: 'one' },
          { label: 'Option Two', value: 'two' },
        ]}
      />
    </div>
  </div>

  {/* Disabled dropdown */}
  <div className="rounded-xl border border-border bg-white p-6">
    <h3 className="font-semibold text-foreground">
      Disabled Dropdown
    </h3>

    <div className="mt-4">
      <Dropdown
        triggerLabel="Unavailable Menu"
        disabled
        items={[
          { label: 'Option One', value: 'one' },
          { label: 'Option Two', value: 'two' },
        ]}
      />
    </div>
  </div>

  {/* Interaction guidance */}
  <div className="rounded-xl border border-border bg-white p-5">
    <h3 className="font-semibold text-foreground">
      Dropdown Interaction
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-text-muted">
      Test all three variants, menu placement, alignment, disabled
      options, destructive actions, outside click, Escape, and
      keyboard navigation.
    </p>
  </div>
</section>




{/* Reusable breadcrumb component preview */}
<section className="mx-auto mt-20 max-w-7xl space-y-8">
  <div>
    <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
      Breadcrumb Components
    </h2>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
      Clear navigation paths that help users understand their current
      location within the JingCraft AI platform.
    </p>
  </div>

  {/* Basic breadcrumb */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Basic Breadcrumb
    </h3>

    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Museum', href: '/museum' },
        { label: 'Collections', href: '/museum' },
        { label: 'Blue and White Porcelain' },
      ]}
    />
  </div>

  {/* Short breadcrumb */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Short Breadcrumb
    </h3>

    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Design Studio', href: '/design-studio' },
        { label: 'AI Analysis' },
      ]}
    />
  </div>

  {/* Custom separator */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Custom Separator
    </h3>

    <Breadcrumb
      separator={<span className="text-accent">/</span>}
      items={[
        { label: 'Home', href: '/' },
        { label: 'Heritage', href: '/heritage' },
        { label: 'Ceramic Motifs' },
      ]}
    />
  </div>

  {/* Collapsed breadcrumb */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Collapsed Breadcrumb
    </h3>

    <p className="text-sm text-text-muted">
      Long navigation paths automatically collapse intermediate items.
    </p>

    <Breadcrumb
      maxItems={3}
      items={[
        { label: 'Home', href: '/' },
        { label: 'Museum', href: '/museum' },
        { label: 'Collections', href: '/museum' },
        { label: 'Chinese Ceramics', href: '/museum' },
        { label: 'Ming Dynasty', href: '/museum' },
        { label: 'Blue and White Porcelain' },
      ]}
    />
  </div>

  {/* Click callback */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Click Callback
    </h3>

    <Breadcrumb
      items={[
        {
          label: 'Home',
          onClick: () => console.info('Home clicked'),
        },
        {
          label: 'Museum',
          onClick: () => console.info('Museum clicked'),
        },
        { label: 'Current Collection' },
      ]}
    />

    <p className="text-xs text-text-muted">
      Click the previous breadcrumb items and check the browser console.
    </p>
  </div>

  {/* Interaction guidance */}
  <div className="rounded-xl border border-border bg-white p-5">
    <h3 className="font-semibold text-foreground">
      Breadcrumb Interaction
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-text-muted">
      Test navigation links, custom separators, collapsed items,
      current-page indication, and responsive wrapping.
    </p>
  </div>
</section>




{/* Reusable pagination component preview */}
<section className="mx-auto mt-20 max-w-7xl space-y-8">
  <div>
    <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
      Pagination Components
    </h2>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
      Navigation controls for browsing museum collections,
      ceramic galleries, and AI analysis history.
    </p>
  </div>

  {/* Basic pagination */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Basic Pagination
    </h3>

    <Pagination
      currentPage={basicPage}
      totalPages={5}
      onPageChange={setBasicPage}
      showPageInfo
    />
  </div>

  {/* Large page count */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Large Page Count
    </h3>

    <Pagination
      currentPage={museumPage}
      totalPages={20}
      onPageChange={setMuseumPage}
      siblingCount={1}
      showPageInfo
    />
  </div>

  {/* Compact pagination */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Compact Pagination
    </h3>

    <Pagination
      currentPage={historyPage}
      totalPages={8}
      onPageChange={setHistoryPage}
      showFirstLast={false}
    />
  </div>

  {/* Different sibling count */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Expanded Page Numbers
    </h3>

    <Pagination
      currentPage={5}
      totalPages={15}
      onPageChange={() => {}}
      siblingCount={2}
    />
  </div>

  {/* Disabled state */}
  <div className="space-y-5 rounded-xl border border-border bg-white p-6">
    <h3 className="text-lg font-semibold text-foreground">
      Disabled Pagination
    </h3>

    <Pagination
      currentPage={3}
      totalPages={10}
      onPageChange={() => {}}
      disabled
      showPageInfo
    />
  </div>

  {/* Interaction guidance */}
  <div className="rounded-xl border border-border bg-white p-5">
    <h3 className="font-semibold text-foreground">
      Pagination Interaction
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-text-muted">
      Test page selection, first and last navigation, previous and
      next buttons, ellipsis behavior, and disabled states.
    </p>
  </div>
</section>





{/* Table Component Preview */}
<section className="space-y-6">
  <div>
    <h2 className="text-2xl font-semibold text-ink">
      Table
    </h2>
    <p className="mt-1 text-sm text-muted">
      Responsive data tables for museum collections and AI results.
    </p>
  </div>

  <Card padding="lg">
    <h3 className="mb-4 font-semibold text-ink">
      Default Table
    </h3>
    <Table
      columns={ceramicColumns}
      data={ceramicData}
      rowKey="id"
    />
  </Card>

  <Card padding="lg">
    <h3 className="mb-4 font-semibold text-ink">
      Striped Table
    </h3>
    <Table
      columns={ceramicColumns}
      data={ceramicData}
      rowKey="id"
      variant="striped"
    />
  </Card>

  <Card padding="lg">
    <h3 className="mb-4 font-semibold text-ink">
      Bordered Table
    </h3>
    <Table
      columns={ceramicColumns}
      data={ceramicData}
      rowKey="id"
      variant="bordered"
    />
  </Card>

  <Card padding="lg">
    <h3 className="mb-4 font-semibold text-ink">
      Loading State
    </h3>
    <Table
      columns={ceramicColumns}
      data={[]}
      rowKey="id"
      loading
    />
  </Card>

  <Card padding="lg">
    <h3 className="mb-4 font-semibold text-ink">
      Empty State
    </h3>
    <Table
      columns={ceramicColumns}
      data={[]}
      rowKey="id"
      emptyMessage="No ceramic records found"
      emptyDescription="Try adding a new ceramic collection."
    />
  </Card>
</section>



{/* Toast Component Preview */}
<section className="space-y-6">
  <div>
    <h2 className="text-2xl font-semibold text-ink">Toast</h2>
    <p className="mt-1 text-sm text-muted">
      Temporary notifications for user actions and system feedback.
    </p>
  </div>

  <Card padding="lg">
    <h3 className="mb-4 font-semibold text-ink">
      Notification Variants
    </h3>

    <div className="flex flex-wrap gap-3">
      <Button onClick={() => showToast('success')}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => showToast('error')}>
        Error
      </Button>
      <Button variant="outline" onClick={() => showToast('warning')}>
        Warning
      </Button>
      <Button variant="ghost" onClick={() => showToast('info')}>
        Info
      </Button>
    </div>
  </Card>

  <Card padding="lg">
    <h3 className="mb-4 font-semibold text-ink">
      Toast Examples
    </h3>

    <div className="space-y-3">
      <Toast
        variant="success"
        title="Image uploaded successfully"
        description="Your ceramic image is ready for AI analysis."
        duration={0}
        onClose={() => {}}
      />

      <Toast
        variant="warning"
        title="Processing may take longer"
        description="Please keep this page open while analysis continues."
        duration={0}
        onClose={() => {}}
      />

      <Toast
        variant="error"
        title="Upload failed"
        description="The selected file could not be uploaded. Please try again."
        duration={0}
        onClose={() => {}}
      />

      <Toast
        variant="info"
        title="New cultural insights available"
        description="Explore additional information about this ceramic tradition."
        duration={0}
        onClose={() => {}}
      />
    </div>
  </Card>

  <ToastContainer>
    {toastVisible && (
      <Toast
        key={toastVariant}
        variant={toastVariant}
        title={
          toastVariant === 'success'
            ? 'Changes saved successfully'
            : toastVariant === 'error'
              ? 'Something went wrong'
              : toastVariant === 'warning'
                ? 'Attention required'
                : 'New information available'
        }
        description="This is an interactive Toast notification preview."
        onClose={() => setToastVisible(false)}
        action={{
          label: 'View details',
          onClick: () => setToastVisible(false),
        }}
      />
    )}
  </ToastContainer>
</section>





{/* EmptyState Component Preview */}
<section className="space-y-6">
  <div>
    <h2 className="text-2xl font-semibold text-ink">
      Empty State
    </h2>
    <p className="mt-1 text-sm text-muted">
      Helpful placeholders for empty collections, search results and uploads.
    </p>
  </div>

  <Card padding="lg">
    <h3 className="mb-4 font-semibold text-ink">
      Default Empty State
    </h3>

    <EmptyState
      title="No ceramic collections yet"
      description="Your museum collections will appear here when they become available."
    />
  </Card>

  <Card padding="lg">
    <h3 className="mb-4 font-semibold text-ink">
      Search Empty State
    </h3>

    <EmptyState
      icon={<EmptyStateIcons.search size={32} />}
      title="No results found"
      description="Try changing your search keywords or filters."
      variant="compact"
    />
  </Card>

  <Card padding="lg">
    <h3 className="mb-4 font-semibold text-ink">
      Upload Empty State
    </h3>

    <EmptyState
      icon={<EmptyStateIcons.upload size={32} />}
      title="Upload your ceramic image"
      description="Start exploring your ceramic artwork with AI-powered cultural analysis."
      action={
        <Button onClick={() => window.alert('Demo: Upload action')}>
          Upload Image
        </Button>
      }
    />
  </Card>

  <Card padding="lg">
    <h3 className="mb-4 font-semibold text-ink">
      Compact Empty State
    </h3>

    <EmptyState
      title="No saved designs"
      description="Your saved ceramic designs will appear here."
      variant="compact"
    />
  </Card>
</section>



{/* Textarea Component Preview */}
<section className="space-y-6">
  <div>
    <h2 className="text-2xl font-semibold text-ink">Textarea</h2>
    <p className="mt-1 text-sm text-muted">
      Multiline text input with validation and character count.
    </p>
  </div>

  <Card padding="lg">
    <div className="max-w-xl space-y-5">
      <Textarea
        label="Cultural Description"
        placeholder="Describe the ceramic artwork..."
        helperText="Provide details about the artwork."
      />

      <Textarea
        label="Research Notes"
        placeholder="Write your research notes..."
        defaultValue="Traditional Chinese ceramic art reflects centuries of craftsmanship."
        showCount
        maxLength={200}
      />

      <Textarea
        label="Validation Example"
        placeholder="Enter your description..."
        error="Please provide a valid description."
      />

      <Textarea
        label="Auto Resize"
        placeholder="Start typing..."
        autoResize
      />
    </div>
  </Card>
</section>

{/* Badge Component Preview */}
<section className="space-y-6">
  <div>
    <h2 className="text-2xl font-semibold text-ink">Badge</h2>
    <p className="mt-1 text-sm text-muted">
      Status indicators and compact labels.
    </p>
  </div>

  <Card padding="lg">
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Verified</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Failed</Badge>
      <Badge variant="info">Information</Badge>
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>

    <div className="mt-6 flex flex-wrap items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
      <Badge variant="success" dot>AI Verified</Badge>
      <Badge variant="primary" pill>Featured Collection</Badge>
    </div>
  </Card>
</section>

{/* Avatar Component Preview */}
<section className="space-y-6">
  <div>
    <h2 className="text-2xl font-semibold text-ink">Avatar</h2>
    <p className="mt-1 text-sm text-muted">
      User identity and profile placeholders.
    </p>
  </div>

  <Card padding="lg">
    <div className="flex flex-wrap items-center gap-5">
      <Avatar name="Shahariar Hossen" size="xs" />
      <Avatar name="Shahariar Hossen" size="sm" />
      <Avatar name="Shahariar Hossen" size="md" />
      <Avatar name="Shahariar Hossen" size="lg" />
      <Avatar name="Shahariar Hossen" size="xl" bordered />
    </div>

    <div className="mt-6 flex flex-wrap items-center gap-5">
      <Avatar name="Chinese Museum" fallback="CM" size="lg" />
      <Avatar name="AI Design Studio" fallback="AI" size="lg" />
    </div>
  </Card>
</section>

{/* Alert Component Preview */}
<section className="space-y-6">
  <div>
    <h2 className="text-2xl font-semibold text-ink">Alert</h2>
    <p className="mt-1 text-sm text-muted">
      Important messages and contextual feedback.
    </p>
  </div>

  <Card padding="lg">
    <div className="space-y-4">
      <Alert
        variant="success"
        title="Analysis completed"
      >
        Your ceramic artwork analysis is ready.
      </Alert>

      <Alert
        variant="info"
        title="Cultural information"
      >
        Historical context is provided for educational reference.
      </Alert>

      <Alert
        variant="warning"
        title="Review recommended"
      >
        Some cultural details may require further verification.
      </Alert>

      <Alert
        variant="error"
        title="Upload failed"
      >
        The image could not be processed. Please try again.
      </Alert>

      {alertVisible && (
        <Alert
          variant="success"
          title="Dismissible notification"
          dismissible
          onDismiss={() => setAlertVisible(false)}
        >
          Click the close button to dismiss this message.
        </Alert>
      )}
    </div>
  </Card>
</section>



      {/* Development notice */}
      <footer className="mx-auto mt-16 max-w-7xl border-t border-border pt-6">
        <p className="text-xs text-text-muted">
          Internal development preview — Not part of the public website.
        </p>
      </footer>
    </main>
  )
}

export default DesignSystemPage
