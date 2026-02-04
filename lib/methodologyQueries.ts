export const METHODOLOGY_SECTION_QUERY = `*[_type == "methodologySection"][0]{
  title,
  subtitle,
  backgroundColor,
  headingColor,
  textColor
}`

export const METHODOLOGY_STEPS_QUERY = `*[_type == "methodologyStep"] | order(stepNumber asc)`
