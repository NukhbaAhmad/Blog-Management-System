const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("Password length must be greater then 8");
  }
  if (value.length > 128) {
    return helpers.message("Password length cannot be greater then 128.");
  }
  if (
    !/(?=.*[a-z])/.test(value) ||
    !/(?=.*[A-Z])/.test(value) ||
    !/(?=.*\d)/.test(value) ||
    !/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value)
  ) {
    return helpers.message(
      "Password must include one uppercase, one lowercase, one number, and one special character"
    );
  }
  return value;
};
module.exports = { password, objectId };
