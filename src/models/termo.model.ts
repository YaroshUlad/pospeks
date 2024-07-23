interface TermoDataItem {
  value: number
  isValid: boolean
}

export interface TermoModel {
  time: string
  objectId: string
  sensorType: string
  status: boolean
  data: Record<number, TermoDataItem>
  state: string
  criticalTemperature: number
  minDepth: number
  maxDepth: number
  averageTemperature: number
}
