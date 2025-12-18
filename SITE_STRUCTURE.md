# Saibaba Group Website - Multi-Page Structure

## Overview
The website has been converted from a single-page design to a multi-page structure for better organization and navigation.

## Pages Created

### 1. **index.html** (Landing Page)
- **Purpose**: Homepage with key overview
- **Sections**:
  - Hero banner
  - CEO testimonial
  - 3 feature cards linking to:
    - About page (Mission, Vision, & Values)
    - Team page
    - Locations page

### 2. **about.html**
- **Purpose**: Company information and values
- **Sections**:
  - About Saibaba Group
  - Our Story
  - The Saibaba Difference (#difference anchor)
  - Core values list
  - Statistics cards (15+ years, 25+ locations, 500+ team, $2M+ investment)

### 3. **team.html**
- **Purpose**: Meet the leadership team
- **Content**: 6 team members with:
  - Sunny Patel (CEO)
  - Rajesh Kumar (COO)
  - Priya Mehta (Director of Marketing)
  - Amit Shah (HR Director)
  - Sarah Davis (Community Relations Manager)
  - Michael Johnson (Operations Manager)
- Each includes: photo, title, bio, email

### 4. **locations.html**
- **Purpose**: Store location finder
- **Content**: 6 locations:
  - Downtown Boston
  - Cambridge Square
  - Newton Center
  - Brookline Village
  - Somerville Square
  - Quincy Bay
- Each includes: address, phone, hours, directions button

### 5. **careers.html**
- **Purpose**: Career opportunities
- **Sections**:
  - Career CTA section
  - Application form with:
    - Personal info (name, email, phone)
    - Position selector (Store Manager, Assistant Manager, Shift Leader, Crew Member, Other)
    - Location preference selector
    - Experience and motivation text areas

### 6. **community.html**
- **Purpose**: Community involvement and giving back
- **Sections**:
  - Community Involvement overview
  - Saibaba Cares (#cares anchor) with 6 programs:
    - Education Support
    - Healthcare Heroes
    - Youth Programs
    - Local Events
    - Environmental Initiatives
    - Emergency Relief

### 7. **news.html**
- **Purpose**: Latest news and updates
- **Content**: 6 news articles with:
  - Featured images
  - Headlines
  - Dates
  - Excerpts
  - Read More links

### 8. **contact.html**
- **Purpose**: Contact information and forms
- **Sections**:
  - Contact form (name, email, phone, subject, message)
  - Contact information (corporate office, phone, email)
  - Catering Services section (#catering anchor)
  - Request Charitable Contribution section (#contribution anchor)

## Shared Resources

### Header Navigation
All pages include consistent navigation with:
- Social links (LinkedIn, Facebook, Instagram)
- Action buttons (Order Catering, Join Our Team)
- Main menu:
  - Home
  - About Us (dropdown: About, Team, Difference, Saibaba Cares, News)
  - Giving (dropdown: Community Involvement, Request Contribution)
  - Locations
  - Contact Us

### Footer
All pages include:
- Quick links (Home, About, Contact)
- Action buttons (Join Our Team, Request Contribution)
- Logo and social media links
- Contact email addresses
- Copyright notice

### Shared Files
- **styles.css**: All styling for entire website
- **script.js**: JavaScript functionality including:
  - Mobile menu toggle
  - Smooth scrolling
  - Notification system
  - Form handlers
  - Scroll animations
- **saibaba_group_logo.png**: Company logo

## Key Features

### Navigation
- All internal links use page names (about.html, team.html, etc.)
- Anchor links for specific sections (#catering, #contribution, #cares, #difference)
- Breadcrumb-like navigation through header dropdowns

### Functionality
- All forms include inline validation
- Notification system shows success messages
- Mobile-responsive design
- Accessibility features (skip links, ARIA labels)
- Cross-browser compatible

### User Flow Examples
1. **Apply for Job**: Home → Join Our Team → careers.html → Fill form
2. **Find Location**: Home → Locations card → locations.html → Get Directions
3. **Request Donation**: Header → Giving → Request Contribution → contact.html#contribution
4. **Order Catering**: Header → Order Catering → contact.html#catering
5. **Learn About Team**: Home → Meet Our Team card → team.html

## Development Notes
- All pages use consistent header/footer structure
- Forms use inline JavaScript for submission handling
- Placeholder content is production-ready dummy data
- All images use placeholder.com or emoji icons
- Color scheme: Orange (#FF6200), Pink (#DA1884), Purple (#46166B)

## Next Steps (Optional)
- Replace placeholder images with real photos
- Connect forms to backend API
- Add actual Google Maps integration for locations
- Implement CMS for news articles
- Add real analytics tracking
- Set up actual social media accounts
