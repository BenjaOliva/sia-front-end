import { KMeansRequest } from "../home/interfaces";

export interface ResultsController {
  results: KMeansResponse;
  trainData: KMeansRequest;
  openPredict: boolean;
  setOpenPredict: (value: boolean) => void;
  generatePrediccion: (point: number[]) => Promise<void>;
  predictedCluster: number | undefined;
}

export interface ResultsProps {
  useController?: () => ResultsController;
}

export interface KMeansResponse {
  asignaciones: number[];
  centroides: Array<number[]>;
  contador_puntos: number[];
  porcentajes_redondeados: number[];
}
