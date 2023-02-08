import { useAuth } from "@/hooks/useAuth";
import { writePostToContract } from "@/lib/post";
import { Textarea } from "@/ui/Textarea";
import {
  Box,
  Button,
  Flex,
  styled,
  TextField,
  Typography,
} from "@aura-ui/react";
import { CheckCircledIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { FormikErrors, useFormik } from "formik";
import { useState } from "react";

const FormHelperText = styled("label", {
  fontSize: "$2",
  color: "$slate11",
});

const FormErrorText = styled("label", {
  fontSize: "$2",
  color: "$red11",
});

const FormGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
});

interface PostFormValues {
  name: string;
  description: string;
}

export const CreatePost = () => {
  const [submitted, setSubmitted] = useState(false);
  const { walletAddress } = useAuth();
  const formik = useFormik<PostFormValues>({
    initialValues: {
      name: "",
      description: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => {
      const errors: FormikErrors<PostFormValues> = {};

      if (values.name && values.name.length > 50) {
        errors.name = "Name is too long";
      }

      if (values.description && values.description.length > 240) {
        errors.description = "Description is too long";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      await writePostToContract(values.description)
        .then((res) => {
          console.log(res);
          setSubmitting(false);
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
            formik.resetForm();
          }, 2000);
        })
        .catch((err) => {
          console.error(err);
          formik.setErrors({
            description:
              "Something went wrong when trying to create your post. Please try again.",
          });
          setSubmitting(false);
        });
    },
  });
  return (
    <Flex direction="column" gap="5" as="form" onSubmit={formik.handleSubmit}>
      <FormGroup>
        <FormHelperText>Name</FormHelperText>
        <TextField
          css={{
            fontSize: "$2",
          }}
          name="name"
          maxLength={50}
          value={formik.values.name}
          onChange={formik.handleChange}
          variant="outline"
          placeholder="Name your idea..."
        />
        {formik.errors.name && (
          <FormErrorText>{formik.errors.name}</FormErrorText>
        )}
      </FormGroup>
      <FormGroup>
        <FormHelperText>Description</FormHelperText>
        <Textarea
          name="description"
          maxLength={240}
          required
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Describe your idea..."
          variant="outline"
          css={{
            resize: "none",
            minHeight: 120,

            "&:focus": {
              "&:hover": {
                boxShadow:
                  "inset 0 0 0 1px $colors$blue8, 0 0 0 1px $colors$blue8",
              },
            },
          }}
        />
        <FormHelperText css={{ fontSize: "$1" }}>
          Max. 240 characters. You have used {formik.values.description.length}{" "}
          characters.
        </FormHelperText>
        {formik.errors.description && (
          <FormErrorText>{formik.errors.description}</FormErrorText>
        )}
      </FormGroup>
      {submitted ? (
        <Button
          css={{ pointerEvents: "none" }}
          variant="solid"
          colorScheme="green"
        >
          Submitted
          <CheckCircledIcon />
        </Button>
      ) : (
        <Button
          disabled={formik.isSubmitting || !walletAddress}
          type="submit"
          variant="solid"
          colorScheme="blue"
        >
          {formik.isSubmitting ? "Submitting..." : "Submit idea"}
        </Button>
      )}
      {!walletAddress && (
        <Typography
          size="2"
          css={{
            display: "flex",
            alignItems: "center",
            gap: "$2",
            color: "$yellow11",
          }}
        >
          <Box css={{ lineHeight: 1 }} as="span">
            <InfoCircledIcon />
          </Box>
          Please connect your wallet in order to create a post.
        </Typography>
      )}
    </Flex>
  );
};
