import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Input,
  PinInput,
  PinInputField,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Progress,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Spinner,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
  Tooltip,
  chakra,
} from "@chakra-ui/react";
import { CloudIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Multiline } from "@sfui/chakra";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export function Landing() {
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
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder="johndoe@dumm.y" {...register("email")} />{" "}
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

        <FormControl mt={6}>
          <FormLabel>Select</FormLabel>

          <Select>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </Select>
        </FormControl>

        <Tooltip label="This is a tooltip" hasArrow>
          <Button
            w="full"
            mt={6}
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Primary
          </Button>
        </Tooltip>

        <Button w="full" mt={4} type="submit" colorScheme="error">
          Danger
        </Button>

        <HStack spacing={4} mt={6}>
          <PinInput placeholder="0">
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
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

      <Box mt={4}>
        <Popover>
          <PopoverTrigger>
            <chakra.button display="flex">
              <Icon as={CloudIcon} w={5} h={5} />
            </chakra.button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Hello</PopoverHeader>
            <PopoverBody>Hello</PopoverBody>
            <PopoverFooter>Hello</PopoverFooter>
          </PopoverContent>
        </Popover>
      </Box>
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
