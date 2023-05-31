import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Spinner,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
  Tooltip,
  chakra,
} from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Multiline } from "@scaleforge-ui/chakra";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
      shouldUnregister: true,
      shouldFocusError: true,
      defaultValues: {
        email: "",
        password: "",
      },
    },
  );

  return (
    <Box
      w="400px"
      maxW="full"
      mx="auto"
      p={4}
      pt={{
        base: 12,
        md: 16,
        lg: 24,
      }}
    >
      <chakra.form
        onSubmit={handleSubmit(async () => {
          await sleep();
          navigate("/");
        })}
      >
        <FormControl isInvalid={!!formState.errors.email}>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <Input placeholder="johndoe@dumm.y" {...register("email")} />
            <InputRightElement>
              <Icon as={MagnifyingGlassIcon} w={5} h={5} />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!formState.errors.password} mt={4}>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Enter password" {...register("password")} />
          <FormErrorMessage>
            {formState.errors.password?.message}
          </FormErrorMessage>
          {!formState.errors.password && (
            <FormHelperText>This is a hint</FormHelperText>
          )}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Message</FormLabel>
          <Multiline placeholder="Type here" />
        </FormControl>

        <Tooltip label="This is a tooltip" hasArrow>
          <Button
            w="full"
            mt={6}
            type="submit"
            isLoading={formState.isSubmitting}
            colorScheme="primary"
          >
            Login
          </Button>
        </Tooltip>
      </chakra.form>

      <Switch mt={4} />

      <Box mt={4}>
        <Tag>
          <TagLabel>Hello</TagLabel>
          <TagCloseButton />
        </Tag>
      </Box>

      <RangeSlider mt={4} defaultValue={[10, 30]}>
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>

      <Progress mt={4} value={80} />

      <Spinner mt={6} />
    </Box>
  );
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(50),
});

function sleep(seconds = 2.5) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
