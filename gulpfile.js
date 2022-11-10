const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const del = require("del");
const eslint = require("gulp-eslint");

let eslintConfig = {
  envs: ["es6", "browser", "node"],
  globals: ["jQuery", "$", "html2canvas", "ClipboardItem"],
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "constructor-super": "error",
    "for-direction": "error",
    "getter-return": "error",
    "no-async-promise-executor": "error",
    "no-case-declarations": "error",
    "no-class-assign": "error",
    "no-compare-neg-zero": "error",
    "no-cond-assign": "error",
    "no-const-assign": "error",
    "no-constant-condition": "error",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-delete-var": "error",
    "no-dupe-args": "error",
    "no-dupe-class-members": "error",
    "no-dupe-else-if": "warn",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": ["warn", { allowEmptyCatch: true }],
    "no-empty-character-class": "error",
    "no-empty-pattern": "error",
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-semi": "error",
    "no-fallthrough": "error",
    "no-func-assign": "error",
    "no-global-assign": "error",
    "no-import-assign": "error",
    "no-inner-declarations": "error",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-misleading-character-class": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-new-symbol": "error",
    "no-obj-calls": "error",
    "no-octal": "error",
    "no-prototype-builtins": "error",
    "no-redeclare": "error",
    "no-regex-spaces": "error",
    "no-self-assign": "error",
    "no-setter-return": "error",
    "no-shadow-restricted-names": "error",
    "no-sparse-arrays": "error",
    "no-this-before-super": "error",
    "no-undef": "error",
    "no-unexpected-multiline": "warn",
    "no-unreachable": "error",
    "no-unsafe-finally": "error",
    "no-unsafe-negation": "error",
    "no-unused-labels": "error",
    "no-unused-vars": ["warn", { argsIgnorePattern: "e|event" }],
    "no-use-before-define": "warn",
    "no-useless-catch": "error",
    "no-useless-escape": "error",
    "no-with": "error",
    "require-yield": "error",
    "use-isnan": "error",
    "valid-typeof": "error",
  },
};

gulp.task("styles", () => {
  return gulp
    .src("sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./build/css/"));
});

gulp.task("clean", () => {
  return del(["css/main.css"]);
});

gulp.task("copy-js", () => {
  return gulp.src("script/**/*.js").pipe(gulp.dest("build/script"));
});

gulp.task("copy-html", () => {
  return gulp.src("*.html").pipe(gulp.dest("build"));
});

gulp.task("copy-lib", () => {
  return gulp.src("lib/**/*").pipe(gulp.dest("build/lib"));
});

gulp.task("lint", function () {
  return gulp
    .src("script/*.js")
    .pipe(eslint(eslintConfig))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("compile", (done) => {
  gulp.series(["clean", "styles", "copy-js", "copy-html", "copy-lib", "lint"])(
    done
  );
});

gulp.task("watch", () => {
  gulp.watch(["sass/**/*.scss"], (done) => {
    gulp.series(["clean", "styles"])(done);
  });
  gulp.watch(["script/*.js"], (done) => {
    gulp.series(["lint", "copy-js"])(done);
  });
  gulp.watch(["*.html"], (done) => {
    gulp.series(["copy-html"])(done);
  });
});
