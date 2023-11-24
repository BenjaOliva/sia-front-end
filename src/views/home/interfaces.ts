export interface HomeController {
  example: string;
  onSubmit: (data: KMeansRequest) => Promise<void>;
}

export interface HomeProps {
  useController?: () => HomeController;
}


export interface KMeansRequest {
  type: 'vectorizado' | 'no-vectorizado';
  iteraciones: number;
  clusters: number;
  seed_inicial: number;
  atributos: number[];
}