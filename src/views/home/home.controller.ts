import { useNavigate } from "react-router-dom";
import { useKMeansService } from "../../services/kmeansService/kmeansService";
import { HomeController, KMeansRequest } from "./interfaces";

export const useHomeController = (): HomeController => {
  const navigate = useNavigate();
  const KMeansService = useKMeansService();

  const onSubmit = async (data: KMeansRequest) => {
    try {
      const response = await KMeansService.trainRequest(data);

      console.log("Res: ", response);

      navigate("/results", { state: { data: response, trainData: data } });
    } catch (error) {
      console.log(error);
    }
  };

  return { example: "example", onSubmit };
};
