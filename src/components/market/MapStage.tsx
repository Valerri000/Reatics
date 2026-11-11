'use client'

import React, { useEffect, useRef } from 'react'

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
  onHandle,
}: {
  token: string
  points: MapPinInput[]
  satellite: boolean
  onHandle: (handle: MapHandle | null) => void
}) {
  const node = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapboxMap | null>(null)
  const pointsRef = useRef(points)
  pointsRef.current = points

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
      paintListings(created, pointsRef.current)
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
    map.once('style.load', () => paintListings(map, pointsRef.current))
  }, [satellite])

  useEffect(() => {
    const source = mapRef.current?.getSource('listings')
    source?.setData(pinFeatureCollection(points))
  }, [points])

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
