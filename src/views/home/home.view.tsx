import React from "react";
import { HomeProps, KMeansRequest } from "./interfaces";
import { useHomeController } from "./home.controller";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, FormikProvider, useFormik } from "formik";

export const Home: React.FC<HomeProps> = ({
  useController = useHomeController,
}) => {
  const controller = useController();

  const formikInstance = useFormik<KMeansRequest>({
    initialValues: {
      type: "vectorizado",
      clusters: 0,
      atributos: [],
      iteraciones: 100,
      seed_inicial: 10,
    },
    onSubmit: async (values) => {
      await controller.onSubmit(values);
    },
  });

  const updateAndOrderAtributos = (value: number) => {
    const atributos = formikInstance.values.atributos;
    const index = atributos.indexOf(value);
    if (index > -1) {
      atributos.splice(index, 1);
    } else {
      atributos.push(value);
    }
    // ordenar de menor a mayor
    atributos.sort((a, b) => a - b);
    console.log(atributos);

    formikInstance.setFieldValue("atributos", atributos);
  };

  return (
    <>
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <FormikProvider value={formikInstance}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Trabajo final - K-Means</Heading>
              <Text fontSize={"lg"}>Oliva Benjamin</Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="type">
                  <FormLabel>Tipo de Modelo (vectorizacion)</FormLabel>
                  <Field
                    as={Select}
                    name="type"
                    placeholder="Seleccione una opción"
                  >
                    <option value="vectorizado">Vectorizado</option>
                    <option value="no-vectorizado">No Vectorizado</option>
                  </Field>
                </FormControl>
                <FormControl id="atributos">
                  <FormLabel>Atributos</FormLabel>
                  <Stack spacing={[1, 5]} direction={["row", "column"]}>
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      onChange={() => updateAndOrderAtributos(0)}
                    >
                      fixedacid
                    </Checkbox>
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      onChange={() => updateAndOrderAtributos(1)}
                    >
                      volacid
                    </Checkbox>
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      onChange={() => updateAndOrderAtributos(2)}
                    >
                      citricacid
                    </Checkbox>
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      onChange={() => updateAndOrderAtributos(3)}
                    >
                      residualsugar
                    </Checkbox>
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      onChange={() => updateAndOrderAtributos(4)}
                    >
                      chlorides
                    </Checkbox>
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      onChange={() => updateAndOrderAtributos(5)}
                    >
                      freesulfur
                    </Checkbox>
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      onChange={() => updateAndOrderAtributos(6)}
                    >
                      totalsulfur
                    </Checkbox>
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      onChange={() => updateAndOrderAtributos(7)}
                    >
                      density
                    </Checkbox>
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      onChange={() => updateAndOrderAtributos(8)}
                    >
                      pH
                    </Checkbox>
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      onChange={() => updateAndOrderAtributos(9)}
                    >
                      sulphates
                    </Checkbox>
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      onChange={() => updateAndOrderAtributos(10)}
                    >
                      alcohol
                    </Checkbox>
                  </Stack>
                </FormControl>
                <FormControl id="clusters">
                  <FormLabel>Cantidad de Clusters</FormLabel>
                  <Field as={Input} name="clusters" type="number" />
                </FormControl>
                <FormControl id="iteraciones">
                  <FormLabel>Cantidad de Iteraciones</FormLabel>
                  <Field as={Input} name="iteraciones" type="number" />
                </FormControl>
                <FormControl id="seed">
                  <FormLabel>Seed Inicial</FormLabel>
                  <Field as={Input} name="seed_inicial" type="number" />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    onClick={formikInstance.submitForm}
                    isLoading={formikInstance.isSubmitting}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Entrenar
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </FormikProvider>
      </Flex>
    </>
  );
};
