/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { KMeansRequest } from "../../views/home/interfaces";

// localhost url
const appUrl = "http://localhost:8000";

export interface BikletaPointsService {
  trainRequest: (params: KMeansRequest) => Promise<any>;
  predictResult: (params?: any) => Promise<any>;
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

  const predictResult = async (search: any) => {
    //console.log('Params get: ', search);
    const res = await axios.get(appUrl + "/searchEngine/bikleta/predict", {
      params: {
        search,
      },
    });
    return res.data;
  };

  return { trainRequest, predictResult };
};
