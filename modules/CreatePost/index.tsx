import { Textarea } from "@/ui/Textarea";
import { Box, Button, Flex, styled, TextField } from "@aura-ui/react";
import { FormikErrors, useFormik } from "formik";

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
  const formik = useFormik<PostFormValues>({
    initialValues: {
      name: "",
      description: "",
    },
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
    onSubmit: async (values, { setSubmitting, validateForm }) => {
      setSubmitting(true);

      await validateForm().then(() => {
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
          required
          value={formik.values.name}
          onChange={formik.handleChange}
          variant="outline"
          placeholder="Name for your idea..."
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
          placeholder="Add your idea..."
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
        {formik.errors.description && (
          <FormErrorText>{formik.errors.description}</FormErrorText>
        )}
      </FormGroup>
      <Button
        disabled={formik.isSubmitting}
        type="submit"
        variant="solid"
        colorScheme="blue"
      >
        {formik.isSubmitting ? "Submitting..." : "Submit idea"}
      </Button>
    </Flex>
  );
};
