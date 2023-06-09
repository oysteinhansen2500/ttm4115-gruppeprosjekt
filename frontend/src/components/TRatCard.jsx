import {
  Radio,
  RadioGroup,
  Card,
  CardHeader,
  Heading,
  Stack,
  CardBody,
  Box,
  Text,
  StackDivider,
  Button,
  CardFooter,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const TRatCard = (props) => {
  const { register, handleSubmit, watch } = useForm();

  useEffect(() => {
    const sub = watch((data) => {
      props.publishSelected(data.answer);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [watch]);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">RAT</Heading>
        <Text fontSize={"lg"}>Team RAT</Text>
        <Text fontSize={"sm"} color={"gray.500"}>
          Question {props.currentQuestion + 1}
        </Text>
      </CardHeader>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        {props.question && (
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Text>{props.question.question}</Text>
                <RadioGroup value={props.selected?.toString() ?? ""}>
                  <Stack py={2}>
                    {props.question.answers.map((alt, i) => (
                      <Radio
                        {...register("answer")}
                        value={i.toString()}
                        key={i}
                        isDisabled={props.question.previous_answers.includes(i)}
                      >
                        {alt}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>
            </Stack>
          </CardBody>
        )}
        <CardFooter>
          <Stack direction={"row"} spacing={2}>
            <Button type="submit" colorScheme="blue">
              Confirm
            </Button>
          </Stack>
        </CardFooter>
      </form>
    </Card>
  );
};
