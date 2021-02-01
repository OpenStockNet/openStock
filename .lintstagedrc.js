module.exports = {
  "client/**/*.js": ["npm run --prefix client lint-fix"],
  "routes/**/*.js": ["npm run lint-fix"],
};
