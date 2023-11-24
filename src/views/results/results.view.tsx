import React, { useEffect, useState } from "react";
import { ResultsProps } from "./interfaces";
import { useResultsController } from "./results.controller";
import {
  Box,
  Button,
  Collapse,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export const Results: React.FC<ResultsProps> = ({
  useController = useResultsController,
}) => {
  const controller = useController();
  const navigation = useNavigate();

  const formikInstance = useFormik<{ point: number[] }>({
    initialValues: {
      point: [],
    },
    onSubmit: async (values) => {
      console.log(values);

      await controller.generatePrediccion(values.point);
    },
  });

  const addValueToPoint = (value: number) => {
    const point = formikInstance.values.point;

    point.push(value);

    if (point.length > controller.trainData.atributos.length) {
      const newPoint = [];
      newPoint.push(value);
      formikInstance.setFieldValue("point", newPoint);
    } else {
      formikInstance.setFieldValue("point", point);
    }
  };

  return (
    <Box
      mx="auto"
      px={8}
      py={4}
      rounded="lg"
      shadow="lg"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      w={"fit-content"}
      textAlign={"left"}
    >
      <Box mt={2}>
        <Link
          fontSize="2xl"
          color="gray.700"
          _dark={{
            color: "white",
          }}
          fontWeight="700"
          _hover={{
            color: "gray.600",
            _dark: {
              color: "gray.200",
            },
            textDecor: "underline",
          }}
        >
          Resultado de entrenamiento
        </Link>
        <Stack mt={2} direction="column" spacing={4} align="left">
          <Text fontSize="md" fontWeight="700">
            Atributos utilizados:{" "}
            {controller.trainData.atributos.map((atributo, index) => (
              <span key={index}>{atributo}, </span>
            ))}
          </Text>
          <Text fontSize="md" fontWeight="700">
            Clusters: {controller.results.centroides.length}
          </Text>
          <Stack mt={2} direction="row" spacing={4} align="left">
            {controller.results.centroides.map((centroid, index) => (
              <Text key={index} fontSize="md" fontWeight="700" w="1/2">
                Cluster {index + 1}:{" "}
                {centroid.map((value, index) => (
                  <span key={index}>{value.toFixed(4)}, </span>
                ))}
              </Text>
            ))}
          </Stack>
          <Text fontSize="md" fontWeight="700" hidden>
            Valores de asignaciones: {controller.results.asignaciones}
          </Text>
          <Stack mt={2} direction="row" spacing={4} align="left" w="full">
            {controller.results.porcentajes_redondeados.map(
              (porcentaje, index) => (
                <Text key={index} fontSize="md" fontWeight="700" w="1/2">
                  Porcentaje cluster {index + 1}: {porcentaje.toFixed(2)}%
                </Text>
              )
            )}
          </Stack>
          <Stack mt={2} direction="row" spacing={4} align="left" w="full">
            {controller.results.contador_puntos.map((puntos, index) => (
              <Text key={index} fontSize="md" fontWeight="700" w="1/2">
                Puntos por cluster {index + 1}: {puntos}
              </Text>
            ))}
          </Stack>
          <Text fontSize="md" fontWeight="700" w="full">
            Tipo de Modelo: {controller.trainData.type}
          </Text>
        </Stack>
        <Stack mt={2} direction="row" spacing={4} align="left">
          <Button mt={4} colorScheme="teal" onClick={() => navigation("/")}>
            Volver a entrenar
          </Button>
          <Button
            mt={4}
            colorScheme="green"
            onClick={() => controller.setOpenPredict(!controller.openPredict)}
          >
            Predecir un punto nuevo
          </Button>
        </Stack>
        <Collapse in={controller.openPredict} animateOpacity>
          <Stack
            spacing={2}
            p="40px"
            color="white"
            mt="4"
            bg="teal.800"
            rounded="md"
            shadow="md"
          >
            <Text fontSize="md" fontWeight="700" w="full">
              Ingrese los valores del nuevo punto a predecir <br /> (1 valor por
              atributo usado en entrenamiento):
            </Text>
            {controller.trainData.atributos.map((atributo, index) => (
              <NewPointField
                key={index}
                index={index}
                addValueToPoint={addValueToPoint}
                fieldValue={formikInstance.values.point}
              />
            ))}
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={formikInstance.isSubmitting}
              onClick={() => {
                formikInstance.handleSubmit();
                formikInstance.resetForm();
              }}
            >
              Predecir
            </Button>
            <Text fontSize="md" fontWeight="700" w="full">
              Resultado:{" "}
              {controller?.predictedCluster !== undefined
                ? controller.predictedCluster + 1
                : "Sin resultado"}
            </Text>
          </Stack>
        </Collapse>
      </Box>
    </Box>
  );
};

const NewPointField: React.FC<{
  index: number;
  addValueToPoint: (value: number) => void;
  fieldValue: number[];
}> = ({ index, addValueToPoint, fieldValue }) => {
  const [value, setValue] = useState<number>(0);

  return (
    <InputGroup>
      <InputLeftAddon children={index} />
      <Input
        type="number"
        placeholder="Valor del punto. por ej: 0.245"
        onChange={(e) => setValue(e.target.valueAsNumber)}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={() => addValueToPoint(value)}>
          Agregar
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
