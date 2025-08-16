# [BUSINESS TYPE] Website

## Company
[One-line description from brief]

## Requirements

### Services/Products
- [Extract from brief]
- [Expand to 3-5 items]
- [Add CTA to each]

### [Industry-specific section]
- [Consulting → FAQ on process]
- [Agency → Portfolio]
- [Personal → About/philosophy]

### Booking/Contact
- [Main conversion action]
- [Required fields]
- [Follow-up process]

### Design
- Style: [Industry standard]
- Audience: [From WHO]
- Features: [Modern basics]

## Goal
[Primary conversion metric]


// Always include:
// 1. Types
type Service = { title, description, cta }
type [Industry]Data = { specific fields }

// 2. Main page
function HomePage() {
  return (
    <Hero />
    <Services />
    <[IndustrySection] />
    <CTA />
  )
}

// 3. Conversion component
function [BookingForm/ContactForm/IntakeForm]() {
  // Multi-step if complex
  // Validation
  // Success state
}

// 4. Data
const content = {
  services: [...],
  testimonials: [...],
  team: [...]
}