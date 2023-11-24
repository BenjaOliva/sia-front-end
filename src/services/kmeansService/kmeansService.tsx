/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { KMeansRequest } from "../../views/home/interfaces";

// localhost url
const appUrl = "http://localhost:8000";

export interface BikletaPointsService {
  trainRequest: (params: KMeansRequest) => Promise<any>;
  predictResult: (params: {
    point: number[];
    modelData: KMeansRequest;
  }) => Promise<any>;
}

export const useKMeansService = (): BikletaPointsService => {
  const trainRequest = async (req: KMeansRequest) => {
    //console.log('Params get: ', search);

    const endpoint =
      req.type === "vectorizado"
        ? "/k-means-vectorizado"
        : "/k-means-no-vectorizado";

    const res = await axios.post(appUrl + endpoint, {
      ...req,
    });
    return res.data;
  };

  const predictResult = async (params: {
    point: number[];
    modelData: KMeansRequest;
  }) => {
    const endpoint =
    params.modelData.type === "vectorizado"
      ? "/predecir-cluster"
      : "/predecir-cluster-nv";
          const res = await axios.post(appUrl + endpoint, {
      nuevo_elemento: params.point,
      atributos: params.modelData.atributos,
      clusters: params.modelData.clusters,
    });
    return res.data;
  };

  return { trainRequest, predictResult };
};
