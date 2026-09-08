// Genera un `alt` descriptivo para las fotos y vídeos del portfolio,
// combinando título + tipo de evento + ciudad. Antes el alt de estas
// imágenes era solo el título del proyecto (p. ej. "Paellas Universitarias
// 2026") — sin ciudad ni tipo de contenido, un canal de SEO de imágenes sin
// explotar. Centralizado aquí para que ProjectCard, Lightbox y las
// miniaturas de Home usen siempre el mismo criterio.
//
// `project` viene de los JSON de public/uploads/{fotos,videos,valencia}/*.json
// y puede llevar un campo opcional "ciudad" (por defecto "Cuenca").
const TEMA_DESCRIPTOR = {
  Eventos: 'cobertura de evento',
  Deportes: 'fotografía deportiva',
  Tradición: 'fotografía de tradición popular',
  'Spots publicitarios': 'spot publicitario',
  Clubes: 'vídeo para club deportivo',
}

export function projectAlt(project, extra) {
  const { titulo, tema, ciudad } = project || {}
  const lugar = ciudad || 'Cuenca'
  const descriptor = TEMA_DESCRIPTOR[tema] || 'producción audiovisual'
  const base = titulo
    ? `${titulo} — ${descriptor} en ${lugar}, CONCA Films`
    : `${descriptor} en ${lugar}, CONCA Films`
  return extra ? `${base} (${extra})` : base
}
