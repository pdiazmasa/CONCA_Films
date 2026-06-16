import { lazy, Suspense } from 'react'

// Three.js is heavy and the particle field is purely decorative, so we load it
// as a separate async chunk after the page has painted.
const ThreeBackground = lazy(() => import('./ThreeBackground'))

export default function LazyThree(props) {
  return (
    <Suspense fallback={null}>
      <ThreeBackground {...props} />
    </Suspense>
  )
}
