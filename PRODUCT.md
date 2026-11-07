# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Públicos atendidos, sin prioridad entre ellos (confirmado: "mixto"):

- Empresas y privados: desarrolladores de loteos, industrias, logística, barrios privados.
- Sector público: municipios, comunas y organismos viales.
- Particulares y vecinos: dueños de terrenos, consorcios, grupos de vecinos.

Todos llegan con la misma tarea: tienen una obra vial por resolver y quieren saber si Cuellar puede hacerla y cómo pedirle presupuesto.

**Decisión abierta:** la lista de públicos salió de la pregunta de entrevista; no se precisó si los tres se atienden hoy con el mismo peso ni si el sector público contrata por licitación.

## Product Purpose

Sitio de Cuellar Obras Viales, constructora vial. Existe para presentar lo que la empresa construye y convertir visitas en consultas de obra. El éxito es una consulta concreta (qué obra, dónde, para cuándo) que termine en una visita o un presupuesto.

## Positioning

El diferencial elegido es la **trayectoria local**: experiencia y conocimiento de la zona donde trabaja.

**Decisión abierta:** todavía no están definidos los años de experiencia ni la zona (`site.zona` está vacío). Hasta tenerlos, el diferencial orienta las decisiones pero no se publica como afirmación con cifras, lugares ni antigüedad.

## Operating Context

Recorrido actual: el visitante conoce los servicios y las obras, y deja una consulta con nombre, teléfono o email, tipo de obra y descripción. WhatsApp y email se muestran como contacto directo solo cuando están cargados en `lib/site.ts`.

## Capabilities and Constraints

Servicios publicados:

- Pavimento asfáltico
- Pavimento de hormigón
- Movimiento de suelos
- Bacheo y mantenimiento
- Drenaje y cordón cuneta
- Señalización vial

Se puede contratar por etapa o por la obra completa, según el texto actual de la web.

Restricciones vigentes:

- **El formulario de contacto no envía nada.** `components/Contact.tsx` solo muestra la confirmación; la entrega real está pendiente. La web no debe publicarse como canal de consultas hasta conectarla.
- Los datos de la empresa viven en `lib/site.ts`; un campo vacío no se muestra.
- Las obras viven en `data/proyectos.ts`.

Terminología del sitio: "obra", "presupuesto", "consulta", "carpeta", "cordón cuneta", "bacheo", "calzada".

## Brand Commitments

- Nombre: Cuellar Obras Viales; forma corta: Cuellar.
- Idioma y voz del texto actual: español de Argentina con voseo (`es-AR`), directo y sin jerga innecesaria.
- No hay logo ni otros activos de marca en el repo.

## Evidence on Hand

- **Obras:** las seis de `data/proyectos.ts` son ejemplos inventados, no antecedentes reales. No deben presentarse como trabajos hechos en una versión publicada.
- **Promesas de "Cómo trabajamos"** (presupuesto claro, un responsable por obra, obra ordenada y señalizada): son texto vigente; no fueron objetadas, pero tampoco confirmadas una por una.
- **Pendiente de averiguar:** obras reales, fotos, años de trayectoria, zona, email y WhatsApp.
- **No existen en el repo y no deben inventarse:** testimonios, clientes, certificaciones, cifras de obra, equipamiento ni plazos.

## Product Principles

1. **Nada sin respaldo.** Lo que se afirme de la empresa tiene que poder demostrarse; lo que falta queda fuera, no se rellena.
2. **Lo local se demuestra.** La trayectoria se prueba con obras, lugares y años reales, no con adjetivos.
3. **Tres públicos, una misma puerta.** Ni el municipio, ni la empresa, ni el vecino deben sentir que la web está hecha para otro.
4. **La consulta es la meta.** Cada parte del sitio ayuda a entender qué hace Cuellar o a pedirle una obra.
