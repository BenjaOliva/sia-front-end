import { useLocation } from "react-router-dom";
import { KMeansResponse, ResultsController } from "./interfaces";

export const useResultsController = (): ResultsController => {

  // get route state
  const location = useLocation();
  const state = location.state as { data: KMeansResponse };


  const onExamplePressed = () => {};

  return { results: state.data, generatePrediccion: onExamplePressed };
};
