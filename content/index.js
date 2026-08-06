/**
 * Barrel export for all site content.
 *
 * Import from "@/content" anywhere in the app to access site content data.
 * This keeps component imports tidy and gives a single mental model:
 * "everything editable lives in @/content".
 */
export { personalInfo, strengths, navItems, socialLinks } from "./personal";
export { skillCategories } from "./skills";
export { projects } from "./projects";
export { experience, education } from "./experience";
export { testimonials } from "./testimonials";
export { blogPosts } from "./blog";
