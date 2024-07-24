export interface DeformationModelData {
  value: number
  isValid: boolean
  delta?: number
}

export interface DeformationModel {
  time: string
  objectId: string
  sensorType: string
  status: boolean
  data: DeformationModelData
  state: string
  criticalDelta: number
}
