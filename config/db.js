var dbURIs = {
  test: "mongodb://localhost/ocean-trip-test",
  development: "mongodb://localhost/ocean-trip",
  production: process.env.MONGODB_URI || "mongodb://localhost/ocean-trip"
};

module.exports = function(env) {
  return dbURIs[env];
}