import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Subtle, decorative floating-particle field rendered with Three.js.
// Sits absolutely inside a relatively-positioned parent. Non-interactive.
export default function ThreeBackground({
  className = '',
  count = 1400,
  color = '#E10600',
  accent = '#F5F5F5',
  style,
}) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = mount.clientWidth || window.innerWidth
    let height = mount.clientHeight || window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 14

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.display = 'block'
    mount.appendChild(renderer.domElement)

    // Build the point cloud.
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const cMain = new THREE.Color(color)
    const cAccent = new THREE.Color(accent)
    const spread = 26
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread
      const col = Math.random() < 0.18 ? cMain : cAccent
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Pointer parallax (eased).
    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0
    function onMove(e) {
      targetX = e.clientX / window.innerWidth - 0.5
      targetY = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const clock = new THREE.Clock()
    let raf
    function animate() {
      const t = clock.getElapsedTime()
      points.rotation.y = t * 0.04
      points.rotation.x = Math.sin(t * 0.1) * 0.08
      curX += (targetX - curX) * 0.04
      curY += (targetY - curY) * 0.04
      camera.position.x = curX * 3
      camera.position.y = -curY * 3
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    if (reduceMotion) {
      renderer.render(scene, camera)
    } else {
      animate()
    }

    function onResize() {
      width = mount.clientWidth || window.innerWidth
      height = mount.clientHeight || window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [count, color, accent])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }}
    />
  )
}
