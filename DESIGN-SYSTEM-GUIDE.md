# 🎨 Blue Rock Design System Guide

> A comprehensive guide to building pages using the Blue Rock design system

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Page Structure](#page-structure)
3. [Typography Components](#typography-components)
4. [Images](#images)
5. [UI Components](#ui-components)
6. [Layout Patterns](#layout-patterns)
7. [Color Palette](#color-palette)
8. [Dark Mode](#dark-mode)
9. [Best Practices](#best-practices)

---

## 🚀 Getting Started

Every page should start with these imports:

```tsx
import PageLayout from "@/components/layouts/PageLayout";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Display from "@/components/typography/Display"; // For hero sections
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Image from "next/image";
```

---

## 📄 Page Structure

### Basic Page Template

```tsx
export default function YourPage() {
    return (
        <PageLayout
            title="Page Title"
            description="Brief description that appears under the title"
        >
            {/* Your content sections go here */}
        </PageLayout>
    );
}
```

### What PageLayout Provides

- ✅ Automatic h1 with proper sizing
- ✅ Lead paragraph (description)
- ✅ Consistent padding and max-width
- ✅ Proper semantic HTML structure

---

## 📝 Typography Components

### 1. Headings

Use semantic heading levels (h1-h6) with customizable sizes.

```tsx
// Section heading
<Heading level="h2" size="3xl" className="mb-6">
    Section Title
</Heading>

// Subsection
<Heading level="h3" size="2xl" className="mb-4">
    Subsection Title
</Heading>

// Minor heading
<Heading level="h4" size="xl" className="mb-3">
    Minor Heading
</Heading>

// With fluid scaling (responsive)
<Heading level="h2" fluid>
    Responsive Heading
</Heading>
```

**Available Sizes:** `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`

**Default Sizes:**
- h1 → 5xl (49px mobile → 78px+ desktop)
- h2 → 4xl (39px mobile → 59px+ desktop)
- h3 → 3xl (31px mobile → 44px+ desktop)
- h4 → 2xl (25px mobile → 33px+ desktop)
- h5 → xl (20px mobile → 25px+ desktop)
- h6 → xl

---

### 2. Text (Body Copy)

```tsx
// Regular paragraph
<Text variant="body">
    Regular paragraph text with optimal line height and spacing.
</Text>

// Lead paragraph (larger, emphasized)
<Text variant="lead" className="mb-6">
    Important introductory paragraph or callout text.
</Text>

// Small text
<Text variant="small" className="text-gray-600">
    Fine print, metadata, or secondary information.
</Text>

// Caption (tiny text)
<Text variant="caption">
    Image captions or helper text.
</Text>

// Fluid scaling
<Text variant="body" fluid>
    Text that scales smoothly with viewport size.
</Text>

// As different HTML elements
<Text variant="body" as="span">Inline text</Text>
<Text variant="body" as="div">Block text</Text>
```

**Variants:**
- `body` - Default paragraph (16px)
- `lead` - Emphasized intro (18px, medium weight)
- `small` - Secondary text (14px)
- `caption` - Tiny text (12px)

---

### 3. Display (Hero Text)

For large, impactful headlines in hero sections.

```tsx
<Display size="lg" className="text-white mb-6">
    HERO HEADLINE
</Display>

<Display size="xl">
    Extra Large Display
</Display>
```

**Available Sizes:**
- `xs` - Small hero (31px)
- `sm` - Modest hero (39px)
- `md` - Standard hero (49px)
- `lg` - Bold hero (49px → 61px+) **← Default**
- `xl` - Large displays (49px → 76px+)
- `2xl` - Maximum impact (49px → 96px+)

---

## 🖼️ Images

### Basic Image

```tsx
<Image
    src="/images/your-image.jpg"
    alt="Descriptive alt text for accessibility"
    width={800}
    height={600}
    className="rounded-lg"
/>
```

### Responsive Full-Width Image

```tsx
<div className="relative w-full h-[400px] mb-8">
    <Image
        src="/images/office.jpg"
        alt="Modern office space"
        fill
        className="object-cover rounded-lg"
    />
</div>
```

### Hero Image with Overlay

```tsx
<div className="relative w-full h-[500px] mb-16">
    <Image
        src="/images/hero.jpg"
        alt="Hero background"
        fill
        className="object-cover"
        priority
    />
    <div className="absolute inset-0 bg-black/50" />

    <div className="relative z-10 h-full flex items-center justify-center">
        <Display size="lg" className="text-white">
            Overlay Text
        </Display>
    </div>
</div>
```

### Image + Text Side-by-Side

```tsx
<div className="grid md:grid-cols-2 gap-8 mb-16">
    {/* Image Column */}
    <div className="relative h-[400px]">
        <Image
            src="/images/team.jpg"
            alt="Our team at work"
            fill
            className="object-cover rounded-lg"
        />
    </div>

    {/* Text Column */}
    <div>
        <Heading level="h2" size="3xl" className="mb-4">
            About Our Team
        </Heading>
        <Text variant="body" className="mb-4">
            Our experienced professionals...
        </Text>
        <Button href="/contact" variant="primary">
            Get in Touch
        </Button>
    </div>
</div>
```

### Image Gallery Grid

```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div className="relative h-[250px]">
        <Image
            src="/images/project1.jpg"
            alt="Project 1"
            fill
            className="object-cover rounded"
        />
    </div>
    <div className="relative h-[250px]">
        <Image
            src="/images/project2.jpg"
            alt="Project 2"
            fill
            className="object-cover rounded"
        />
    </div>
    <div className="relative h-[250px]">
        <Image
            src="/images/project3.jpg"
            alt="Project 3"
            fill
            className="object-cover rounded"
        />
    </div>
</div>
```

### Team Member Card with Circular Image

```tsx
<div className="text-center">
    <div className="relative w-48 h-48 mx-auto mb-4">
        <Image
            src="/images/team-member.jpg"
            alt="John Doe"
            fill
            className="object-cover rounded-full"
        />
    </div>
    <Heading level="h3" size="xl">John Doe</Heading>
    <Text variant="small" className="text-gray-600">
        Founder & CEO
    </Text>
</div>
```

---

## 🎨 UI Components

### Buttons

```tsx
// Primary button
<Button href="/contact" variant="primary">
    Get Started
</Button>

// Secondary button (transparent with border)
<Button href="/projects" variant="secondary">
    View Projects
</Button>

// Ghost button (transparent)
<Button href="/about" variant="ghost">
    Learn More
</Button>

// Custom styling
<Button
    href="/contact"
    variant="primary"
    className="bg-success hover:bg-success/90"
>
    Success Button
</Button>
```

**Button Variants:**
- `primary` - Solid main-blue background
- `secondary` - Transparent with white border
- `ghost` - Fully transparent

### Container

Provides consistent max-width and padding:

```tsx
<Container>
    <Heading level="h2">Contained Content</Heading>
    <Text variant="body">
        This content has proper max-width and responsive padding.
    </Text>
</Container>

// With custom styling
<Container className="bg-light-bg py-8 rounded-lg">
    {/* Contained content */}
</Container>
```

---

## 📐 Layout Patterns

### Basic Section

```tsx
<section className="mb-16">
    <Heading level="h2" size="3xl" className="mb-6">
        Section Title
    </Heading>
    <Text variant="body" className="mb-4">
        Section content...
    </Text>
</section>
```

### Two-Column Layout

```tsx
<div className="grid md:grid-cols-2 gap-8">
    <div>Left column content</div>
    <div>Right column content</div>
</div>
```

### Three-Column Grid

```tsx
<div className="grid md:grid-cols-3 gap-8">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
</div>
```

### Call-to-Action Section

```tsx
<section className="bg-light-bg p-8 rounded-lg text-center mb-16">
    <Heading level="h2" size="2xl" className="mb-4">
        Ready to Get Started?
    </Heading>
    <Text variant="body" className="mb-6 max-w-2xl mx-auto">
        Let's discuss how we can help transform your space.
    </Text>
    <div className="flex gap-4 justify-center">
        <Button href="/contact" variant="primary">
            Contact Us
        </Button>
        <Button href="/projects" variant="primary" className="bg-white text-main-blue border-2 border-main-blue hover:bg-light-bg">
            View Projects
        </Button>
    </div>
</section>
```

---

## 🎨 Color Palette

Use these Tailwind classes for colors:

### Brand Colors
- `bg-main-blue` / `text-main-blue` - #0E48CC (Primary brand)
- `bg-light-blue` / `text-light-blue` - #5A87DD (Secondary)
- `bg-dark` / `text-dark` - #1A1A1A (Dark text/backgrounds)
- `bg-gray` / `text-gray` - #7C7C7C (UI elements)

### Background Colors
- `bg-light-bg` - #F8F9FA (Light backgrounds, cards)
- `bg-white` - White
- `bg-black/50` - 50% transparent black (overlays)

### Feedback Colors
- `bg-success` / `text-success` - #10B981 (Success states)
- `bg-error` / `text-error` - #EF4444 (Errors)
- `bg-warning` / `text-warning` - #F59E0B (Warnings)

### Text Colors
- `text-dark` - Default dark text
- `text-gray-600` - Secondary text
- `text-gray-700` - Body text
- `text-white` - White text

---

## 🌓 Dark Mode

The Blue Rock website features automatic dark mode support with smooth transitions and animated theme toggle.

### How Dark Mode Works

- **Automatic Detection**: Respects user's system preference (light/dark)
- **Manual Toggle**: Users can override with the animated moon/sun toggle button
- **Persistent**: Choice is saved in localStorage
- **Zero Flicker**: No flash of unstyled content on page load

### Dark Mode Color System

Colors automatically adapt when dark mode is active:

#### Light Mode Colors
```css
main-blue:  #0E48CC  →  (Dark mode) #5A87DD
light-blue: #5A87DD  →  (Dark mode) #7BA3E8
gray:       #7C7C7C  →  (Dark mode) #9CA3AF
dark:       #1A1A1A  →  (Dark mode) #F9FAFB
light-bg:   #F8F9FA  →  (Dark mode) #1F2937
```

### Using Dark Mode in Components

All components automatically support dark mode. Use Tailwind's `dark:` prefix:

```tsx
// Text that changes color in dark mode
<Text variant="body" className="text-gray-700 dark:text-gray-300">
    This text adapts to dark mode
</Text>

// Background that changes
<div className="bg-white dark:bg-gray-900">
    Content here
</div>

// Border that changes
<div className="border border-gray-300 dark:border-gray-700">
    Bordered content
</div>

// Button with dark mode hover states
<button className="bg-main-blue dark:bg-light-blue hover:bg-main-blue/90 dark:hover:bg-light-blue/90">
    Adaptive Button
</button>
```

### Common Dark Mode Patterns

#### Card with Dark Mode Support
```tsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
    <Heading level="h3" className="text-dark dark:text-white mb-4">
        Card Title
    </Heading>
    <Text variant="body" className="text-gray-700 dark:text-gray-300">
        Card content that looks great in both modes.
    </Text>
</div>
```

#### Section with Background
```tsx
<section className="bg-light-bg dark:bg-gray-900 py-16">
    <Container>
        <Heading level="h2" className="text-dark dark:text-white mb-6">
            Section Title
        </Heading>
        <Text variant="body" className="text-gray-700 dark:text-gray-300">
            Section content...
        </Text>
    </Container>
</section>
```

#### Image with Dark Mode Overlay
```tsx
<div className="relative h-[400px]">
    <Image
        src="/images/hero.jpg"
        alt="Hero image"
        fill
        className="object-cover"
    />
    {/* Overlay adjusts opacity in dark mode */}
    <div className="absolute inset-0 bg-black/30 dark:bg-black/60" />
</div>
```

### Pre-Built Dark Mode Components

These components already have dark mode built in:

- **TopBar**: Light blue → Dark gray-800
- **Header**: White → Gray-900
- **Footer**: White → Gray-900 with border transitions
- **NavLink**: Gray-700 → Gray-300 with blue hover states
- **ThemeToggle**: Animated moon (light mode) → sun (dark mode)
- **Container**: Transparent (adapts to parent)
- **Button**: Main-blue with dark variants

### Dark Mode Color Reference

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| **Body Background** | `#ffffff` | `#0a0a0a` |
| **Body Text** | `#1A1A1A` | `#F9FAFB` |
| **Primary Blue** | `#0E48CC` | `#5A87DD` |
| **Secondary Blue** | `#5A87DD` | `#7BA3E8` |
| **Gray Text** | `#7C7C7C` | `#9CA3AF` |
| **Light Background** | `#F8F9FA` | `#1F2937` |
| **Header Background** | `#ffffff` | `#111827` (gray-900) |
| **TopBar Background** | `#5A87DD` | `#1F2937` (gray-800) |

### Transition Classes

All color changes use smooth transitions:

```tsx
// Default transition (300ms)
className="transition-colors duration-300"

// Custom transition timing
className="transition-all duration-500 ease-in-out"
```

### Testing Dark Mode

1. **System Preference**: Change your OS dark mode setting
2. **Manual Toggle**: Click the moon/sun icon in the header
3. **DevTools**: Use browser DevTools to emulate dark mode
4. **Persistence**: Toggle mode, refresh page - should maintain your choice

### Theme Toggle Animation

The theme toggle features:
- **Moon Icon** (light mode): Breathing + swaying + twinkling stars
- **Sun Icon** (dark mode): Continuous 360° rotation + pulsing
- **Smooth Transitions**: 300ms opacity/scale/rotate animations

### Dark Mode Best Practices

1. **Always use `dark:` prefix**: Never rely on single color mode
2. **Test both modes**: Check every page in light and dark mode
3. **Sufficient contrast**: Ensure WCAG AA compliance in both modes
4. **Avoid pure black**: Use `#0a0a0a` instead of `#000000`
5. **Consistent transitions**: Use `transition-colors duration-300`

```tsx
// Good - Both modes considered
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    Content
</div>

// Bad - Only works in light mode
<div className="bg-white text-gray-900">
    Content
</div>
```

### Disabling Transitions During Theme Change

The system automatically disables transitions during theme toggle to prevent jarring animations. This is configured in the ThemeProvider with `disableTransitionOnChange={false}`.

---

## ✅ Best Practices

### Typography

1. **Use semantic HTML**: Always use proper heading levels (h1 → h2 → h3)
2. **One h1 per page**: PageLayout provides this automatically
3. **Fluid scaling**: Use `fluid` prop for responsive text
4. **Readable line length**: Wrap long text in `max-w-2xl` or `max-w-3xl`

```tsx
// Good
<Text variant="body" className="max-w-2xl">
    Long paragraph text that won't be too wide on large screens...
</Text>

// Bad - text stretches too wide on large screens
<Text variant="body">
    Very long paragraph text...
</Text>
```

### Images

1. **Always include alt text**: Required for accessibility
2. **Use `priority` for above-the-fold images**: Improves LCP
3. **Specify dimensions**: Use `width`/`height` OR `fill`
4. **Optimize quality**: Use `quality={75-85}` for balance

```tsx
// Good - above the fold
<Image src="/hero.jpg" alt="Hero image" fill priority />

// Good - below the fold
<Image src="/content.jpg" alt="Content" width={800} height={600} />

// Bad - missing alt text
<Image src="/image.jpg" width={800} height={600} />
```

### Spacing

Use consistent spacing scale:

- `mb-2` - 0.5rem (8px) - Tight spacing
- `mb-4` - 1rem (16px) - Default spacing
- `mb-6` - 1.5rem (24px) - Section spacing
- `mb-8` - 2rem (32px) - Large spacing
- `mb-12` - 3rem (48px) - Major sections
- `mb-16` - 4rem (64px) - Page sections

### Sections

```tsx
// Standard section pattern
<section className="mb-16">
    <Heading level="h2" size="3xl" className="mb-6">
        Section Title
    </Heading>
    <Text variant="body" className="mb-4">
        Content...
    </Text>
</section>
```

### Responsive Design

Use Tailwind responsive prefixes:

- `md:` - 768px and up (tablet)
- `lg:` - 1024px and up (desktop)
- `xl:` - 1280px and up (large desktop)

```tsx
// Mobile: stacked, Desktop: side-by-side
<div className="grid md:grid-cols-2 gap-8">
    <div>Column 1</div>
    <div>Column 2</div>
</div>

// Hidden on mobile, visible on desktop
<div className="hidden md:block">Desktop only content</div>

// Visible on mobile, hidden on desktop
<div className="md:hidden">Mobile only content</div>
```

---

## 📚 Complete Page Example

```tsx
import PageLayout from "@/components/layouts/PageLayout";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function ExamplePage() {
    return (
        <PageLayout
            title="About Blue Rock"
            description="Building excellence since 2010"
        >
            {/* Hero Image */}
            <div className="relative w-full h-[500px] mb-16 -mt-8">
                <Image
                    src="/images/hero.jpg"
                    alt="Company headquarters"
                    fill
                    className="object-cover rounded-lg"
                    priority
                />
            </div>

            {/* Mission Section */}
            <section className="mb-16">
                <Heading level="h2" size="3xl" className="mb-6">
                    Our Mission
                </Heading>
                <Text variant="body" className="mb-4 max-w-3xl">
                    At Blue Rock, we transform spaces with precision and passion.
                    Every project receives meticulous attention to detail.
                </Text>
            </section>

            {/* Values Grid */}
            <section className="mb-16">
                <Heading level="h2" size="3xl" className="mb-8 text-center">
                    Our Core Values
                </Heading>

                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <Heading level="h3" size="xl" className="mb-3">
                            Quality First
                        </Heading>
                        <Text variant="body">
                            We never compromise on materials or workmanship.
                        </Text>
                    </div>

                    <div>
                        <Heading level="h3" size="xl" className="mb-3">
                            Client Partnership
                        </Heading>
                        <Text variant="body">
                            Your vision drives our work.
                        </Text>
                    </div>

                    <div>
                        <Heading level="h3" size="xl" className="mb-3">
                            Timely Delivery
                        </Heading>
                        <Text variant="body">
                            Projects completed on schedule.
                        </Text>
                    </div>
                </div>
            </section>

            {/* Image + Text */}
            <section className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                    <Heading level="h2" size="2xl" className="mb-4">
                        Expert Craftsmanship
                    </Heading>
                    <Text variant="body" className="mb-6">
                        Our team combines traditional techniques with modern innovation.
                    </Text>
                    <Button href="/projects" variant="primary">
                        View Our Work
                    </Button>
                </div>

                <div className="relative h-[400px]">
                    <Image
                        src="/images/craftsmanship.jpg"
                        alt="Detailed craftsmanship"
                        fill
                        className="object-cover rounded-lg shadow-lg"
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-light-bg p-8 rounded-lg text-center">
                <Heading level="h2" size="2xl" className="mb-4">
                    Ready to Start Your Project?
                </Heading>
                <Text variant="body" className="mb-6 max-w-2xl mx-auto">
                    Let's bring your vision to life.
                </Text>
                <Button href="/contact" variant="primary">
                    Get Started
                </Button>
            </section>
        </PageLayout>
    );
}
```

---

## 🎯 Quick Reference

| Element | Component | Common Props |
|---------|-----------|--------------|
| Page wrapper | `<PageLayout>` | `title`, `description` |
| Section heading | `<Heading level="h2">` | `size`, `fluid`, `className` |
| Subheading | `<Heading level="h3">` | `size`, `className` |
| Paragraph | `<Text variant="body">` | `fluid`, `className` |
| Lead text | `<Text variant="lead">` | `fluid`, `className` |
| Small text | `<Text variant="small">` | `className` |
| Hero text | `<Display>` | `size`, `className` |
| Image | `<Image>` | `src`, `alt`, `fill`, `width`, `height` |
| Button | `<Button>` | `href`, `variant`, `className` |
| Container | `<Container>` | `className` |

---

## 📞 Need Help?

- Check existing pages for examples (Hero, PageLayout)
- Refer to component files in `/src/components/`
- Test responsiveness at different screen sizes
- Verify accessibility with semantic HTML

**Happy building! 🚀**
