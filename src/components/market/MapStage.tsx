'use client'

import React, { useEffect, useRef } from 'react'

import { areaFeature, type AreaPoint } from '@/lib/mapArea'
import { pinFeatureCollection, type MapPinInput } from '@/lib/mapPins'
import { mapCluster, mapStyle } from '@/lib/mapStage'
import { mapPhoto } from '@/lib/pageImages'

type MapboxMap = {
  addSource: (id: string, source: unknown) => void
  addLayer: (layer: unknown) => void
  getSource: (id: string) => { setData: (data: unknown) => void } | undefined
  getLayer: (id: string) => unknown
  removeLayer: (id: string) => void
  removeSource: (id: string) => void
  isStyleLoaded: () => boolean
  once: (event: string, handler: () => void) => void
  on: (event: string, handler: (event: { lngLat?: { lat: number; lng: number } }) => void) => void
  setStyle: (style: string) => void
  zoomIn: () => void
  zoomOut: () => void
  flyTo: (options: { center: [number, number]; zoom: number }) => void
  remove: () => void
}

export type MapHandle = {
  zoomIn: () => void
  zoomOut: () => void
  flyTo: (latitude: number, longitude: number) => void
}

export function MapStage({
  token,
  points,
  satellite,
  area = [],
  drawing = false,
  onPick,
  onHandle,
}: {
  token: string
  points: MapPinInput[]
  satellite: boolean
  area?: AreaPoint[]
  drawing?: boolean
  onPick?: (point: AreaPoint) => void
  onHandle: (handle: MapHandle | null) => void
}) {
  const node = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapboxMap | null>(null)
  const pointsRef = useRef(points)
  const areaRef = useRef(area)
  const drawingRef = useRef(drawing)
  const onPickRef = useRef(onPick)
  pointsRef.current = points
  areaRef.current = area
  drawingRef.current = drawing
  onPickRef.current = onPick

  useEffect(() => {
    if (!token || !node.current) {
      onHandle(null)
      return
    }
    let removed = false
    let created: MapboxMap | null = null
    void import('mapbox-gl').then(async (mod) => {
      await import('mapbox-gl/dist/mapbox-gl.css')
      if (removed || !node.current) return
      const mapbox = mod.default
      mapbox.accessToken = token
      const first = pointsRef.current[0]
      created = new mapbox.Map({
        container: node.current,
        style: mapStyle(false),
        center: first ? [first.longitude, first.latitude] : [-118.25, 34.05],
        zoom: first ? 11 : 8,
      }) as MapboxMap
      mapRef.current = created
      created.on('click', (event) => {
        const latitude = event.lngLat?.lat
        const longitude = event.lngLat?.lng
        if (!drawingRef.current || latitude == null || longitude == null) return
        onPickRef.current?.({ latitude, longitude })
      })
      paintListings(created, pointsRef.current)
      paintArea(created, areaRef.current)
      onHandle({
        zoomIn: () => created?.zoomIn(),
        zoomOut: () => created?.zoomOut(),
        flyTo: (latitude, longitude) => created?.flyTo({ center: [longitude, latitude], zoom: 14 }),
      })
    })
    return () => {
      removed = true
      created?.remove()
      mapRef.current = null
      onHandle(null)
    }
  }, [token, onHandle])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.setStyle(mapStyle(satellite))
    map.once('style.load', () => {
      paintListings(map, pointsRef.current)
      paintArea(map, areaRef.current)
    })
  }, [satellite])

  useEffect(() => {
    const map = mapRef.current
    if (!map?.isStyleLoaded()) return
    map.getSource('listings')?.setData(pinFeatureCollection(points))
    paintArea(map, area)
  }, [points, area])

  if (!token) return <img src={mapPhoto} alt="" className="map-fallback" />
  return <div ref={node} className="map-stage" />
}

function paintListings(map: MapboxMap, points: MapPinInput[]) {
  const draw = () => {
    if (map.getLayer('clusters')) map.removeLayer('clusters')
    if (map.getLayer('pins')) map.removeLayer('pins')
    if (map.getSource('listings')) map.removeSource('listings')
    map.addSource('listings', {
      type: 'geojson',
      data: pinFeatureCollection(points),
      ...mapCluster,
    })
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'listings',
      filter: ['has', 'point_count'],
      paint: { 'circle-color': '#2563eb', 'circle-radius': 18 },
    })
    map.addLayer({
      id: 'pins',
      type: 'circle',
      source: 'listings',
      filter: ['!', ['has', 'point_count']],
      paint: { 'circle-color': '#0f172a', 'circle-radius': 7 },
    })
  }
  if (map.isStyleLoaded()) draw()
  else map.once('load', draw)
}

function paintArea(map: MapboxMap, area: AreaPoint[]) {
  const draw = () => {
    const data = areaFeature(area)
    const source = map.getSource('area')
    if (source) {
      source.setData(data)
      return
    }
    map.addSource('area', { type: 'geojson', data })
    map.addLayer({
      id: 'area-fill',
      type: 'fill',
      source: 'area',
      paint: { 'fill-color': '#2563eb', 'fill-opacity': 0.15 },
    })
    map.addLayer({
      id: 'area-line',
      type: 'line',
      source: 'area',
      paint: { 'line-color': '#2563eb', 'line-width': 2 },
    })
  }
  if (map.isStyleLoaded()) draw()
  else map.once('load', draw)
}
