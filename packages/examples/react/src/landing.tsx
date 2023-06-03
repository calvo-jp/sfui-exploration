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
import {
  Combobox,
  ComboboxArrow,
  ComboboxControl,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Multiline,
  Select,
  SelectArrow,
  SelectOption,
  SelectOptions,
  SelectSpacer,
  SelectTrigger,
} from "@sfui/chakra";
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
        <Input placeholder="johndoe@dumm.y" {...register("email")} />

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

        <HStack spacing={4} mt={4}>
          <PinInput placeholder="0">
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>

        <FormControl mt={4}>
          <FormLabel>Search</FormLabel>

          <Combobox>
            {() => (
              <>
                <ComboboxControl>
                  <ComboboxInput />
                  <ComboboxArrow />
                </ComboboxControl>

                <ComboboxOptions>
                  <ComboboxOption label="Option 1" value="1" />
                  <ComboboxOption label="Option 2" value="2" />
                  <ComboboxOption label="Option 3" value="3" />
                </ComboboxOptions>
              </>
            )}
          </Combobox>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Select</FormLabel>

          <Select>
            {({ selectedOption }) => (
              <>
                <SelectTrigger>
                  {selectedOption?.label ?? "Please Select"}

                  <SelectSpacer />
                  <SelectArrow />
                </SelectTrigger>

                <SelectOptions>
                  <SelectOption value="1" label="One" />
                  <SelectOption value="2" label="Two" />
                  <SelectOption value="3" label="Three" />
                </SelectOptions>
              </>
            )}
          </Select>
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
            /* colorScheme="error" */
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
