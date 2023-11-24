import { useLocation } from "react-router-dom";
import { KMeansResponse, ResultsController } from "./interfaces";
import { KMeansRequest } from "../home/interfaces";
import { useState } from "react";
import { useKMeansService } from "../../services/kmeansService/kmeansService";

export const useResultsController = (): ResultsController => {
  // get route state
  const location = useLocation();

  const [openPredict, setOpenPredict] = useState<boolean>(false);

  const [predictedCluster, setPredictedCluster] = useState()

  const KMeanService = useKMeansService();

  const state = location.state as {
    data: KMeansResponse;
    trainData: KMeansRequest;
  };

  const generatePrediccion = async (point: number[]) => {
    try {
      const response = await KMeanService.predictResult({
        point,
        modelData: state.trainData,
      });

      console.log("Res: ", response);
      
      setPredictedCluster(response.cluster_predicho);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    results: state.data,
    trainData: state.trainData,
    generatePrediccion,
    openPredict,
    setOpenPredict,
    predictedCluster,
  };
};
