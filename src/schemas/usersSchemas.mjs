const fetchingUserByQuery = {
  filter: {
    notEmpty: {
      errorMessage: "field must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "field must be atleast 5",
    },
    isString: {
      errorMessage: "field must be a string",
    },
  },
  value: {
    notEmpty: {
      errorMessage: "value field must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "value field must be atleast 3",
    },
    isString: {
      errorMessage: "value field must be a string",
    },
  },
};

const createUserSchema = {
  name: {
    notEmpty: {
      errorMessage: "name must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "name must be atleast 3 characters",
    },
    isString: {
      errorMessage: "name must be a string",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "email field must not be empty",
    },
    isString: {
      errorMessage: "email field must be a string",
    },
  },
};

export const userSchemas = { fetchingUserByQuery, createUserSchema };
