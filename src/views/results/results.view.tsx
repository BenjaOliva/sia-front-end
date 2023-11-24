import React from "react";
import { ResultsProps } from "./interfaces";
import { useResultsController } from "./results.controller";
import { Box, Button, Link, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Results: React.FC<ResultsProps> = ({
  useController = useResultsController,
}) => {
  const controller = useController();
  const navigation = useNavigate();
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
      maxW="2xl"
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
        <Stack mt={2} direction="column" spacing={4} align="center">
          <Text fontSize="md" fontWeight="700" noOfLines={1}>
            Valores de clusters: {controller.results.centroides}
          </Text>
          <Text fontSize="md" fontWeight="700" hidden>
            Valores de asignaciones: {controller.results.asignaciones}
          </Text>
          <Text fontSize="md" fontWeight="700">
            Porcentaje por cluster:{" "}
            {controller.results.porcentajes_redondeados.map(
              (porcentaje, index) => (
                <span key={index}>{porcentaje.toFixed(2)}% </span>
              )
            )}
          </Text>
          <Text fontSize="md" fontWeight="700">
            Puntos por cluster:{" "}
            {controller.results.contador_puntos.map((puntos, index) => (
              <span key={index}>{puntos} </span>
            ))}
          </Text>
        </Stack>
        <Button
          mt={4}
          colorScheme="teal"
          onClick={() => navigation("/")}
        >
          Volver a entrenar
        </Button>
      </Box>
    </Box>
  );
};
