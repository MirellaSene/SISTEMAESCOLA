module.exports = {
  jwtConfig: {
    secret: process.eventNames.JWT_SECRET || "segredo",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  }
};