export interface ResultsController {
  results: KMeansResponse;
  generatePrediccion: () => void;
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
