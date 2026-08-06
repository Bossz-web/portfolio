/**
 * Central content type definitions.
 *
 * This file contains no runtime code — it exists purely to describe the shape
 * of every editable piece of site content as JSDoc `@typedef`s. Editors read
 * these to give you autocomplete and inline docs while you fill in `content/*`,
 * without the project depending on TypeScript.
 *
 * Reference a type from any file like so:
 *
 *   \@type {import('@/types').Project[]}
 *
 * @module types
 */

/**
 * @typedef {import('lucide-react').LucideIcon} LucideIcon
 */

/**
 * @typedef {Object} NavItem
 * @property {string} label
 * @property {string} href In-page anchor target, e.g. "#projects".
 */

/**
 * @typedef {Object} SocialLink
 * @property {string} label
 * @property {string} href
 * @property {LucideIcon} icon Lucide icon component.
 */

/**
 * @typedef {Object} PersonalInfo
 * @property {string} name
 * @property {string} headline Big hero headline / role.
 * @property {string} role One-line role descriptor used in nav + SEO.
 * @property {string} summary Short hero paragraph.
 * @property {string} bio One-line intro shown under the About heading.
 * @property {string[]} story Longer About paragraphs (personal story).
 * @property {string} location
 * @property {string} email
 * @property {string} avatar Public-facing avatar image path (in /public).
 * @property {string} aboutImage Secondary portrait used in the About section.
 * @property {string} resumeUrl Resume file path (in /public).
 * @property {string} [availability] Availability badge text, e.g. "Available for freelance".
 */

/**
 * @typedef {Object} Strength
 * @property {string} title
 * @property {string} description
 * @property {LucideIcon} icon
 */

/**
 * @typedef {Object} SkillCategory
 * @property {string} name
 * @property {LucideIcon} icon Lucide icon representing the category.
 * @property {string[]} skills
 */

/**
 * @typedef {Object} CaseStudy
 * @property {string} challenge
 * @property {string} solution
 * @property {string[]} results
 */

/**
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {string} [overview] Longer case-study body.
 * @property {string} image
 * @property {string[]} tech Technologies — also power the filter UI.
 * @property {string} [liveUrl]
 * @property {string} [repoUrl]
 * @property {boolean} [featured]
 * @property {CaseStudy} [caseStudy] Case study detail.
 * @property {number} year
 */

/**
 * @typedef {Object} ExperienceItem
 * @property {string} company
 * @property {string} role
 * @property {string} duration e.g. "2023 — Present".
 * @property {string} [location]
 * @property {string} description
 * @property {string[]} responsibilities
 * @property {string[]} technologies
 * @property {string[]} [achievements]
 */

/**
 * @typedef {"degree" | "bootcamp" | "certificate" | "course"} CredentialType
 */

/**
 * @typedef {Object} EducationItem
 * @property {string} institution
 * @property {string} qualification
 * @property {string} duration
 * @property {string} [description]
 * @property {CredentialType} type Credential type for iconography.
 */

/**
 * @typedef {Object} Testimonial
 * @property {string} quote
 * @property {string} author
 * @property {string} role
 * @property {string} company
 * @property {string} avatar
 * @property {number} rating 1–5 star rating.
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} title
 * @property {string} excerpt
 * @property {string} date ISO date string.
 * @property {string} readingTime
 * @property {string} url
 * @property {string} tag
 */

/**
 * @typedef {Object} SeoConfig
 * @property {string} siteName
 * @property {string} title
 * @property {string} description
 * @property {string} url Canonical site URL, no trailing slash.
 * @property {string} ogImage
 * @property {string} [twitterHandle]
 * @property {string[]} keywords
 */

export {};
