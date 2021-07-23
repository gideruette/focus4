module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    extends: ["eslint:all", "plugin:react/all", "plugin:@typescript-eslint/all", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module"
    },
    plugins: ["only-warn", "import", "@typescript-eslint", "react"],
    rules: {
        "class-methods-use-this": "off",
        complexity: "off",
        "consistent-return": "off",
        "consistent-this": "off",
        "default-case": "off",
        "func-style": ["warn", "declaration", {allowArrowFunctions: true}],
        "guard-for-in": "off",
        "id-length": "off",
        "linebreak-style": ["warn", "windows"],
        "line-comment-position": "off",
        "no-case-declarations": "off",
        "no-underscore-dangle": "off",
        "max-classes-per-file": "off",
        "max-lines": "off",
        "max-lines-per-function": "off",
        "max-params": "off",
        "max-statements": "off",
        "new-cap": "off",
        "no-await-in-loop": "off",
        "no-bitwise": "off",
        "no-console": ["warn", {allow: ["info", "warn", "error"]}],
        "no-constant-condition": ["warn", {checkLoops: false}],
        "no-continue": "off",
        "no-else-return": "off",
        "no-implicit-coercion": "off",
        "no-inline-comments": "off",
        "no-negated-condition": "off",
        "no-nested-ternary": "off",
        "no-param-reassign": "off",
        "no-plusplus": "off",
        "no-prototype-builtins": "off",
        "no-ternary": "off",
        "no-undefined": "off",
        "no-useless-return": "off",
        "one-var": ["warn", "never"],
        "prefer-arrow-callback": "off",
        "prefer-destructuring": ["warn", {array: false, object: true}],
        "prefer-named-capture-group": "off",
        "quote-props": ["warn", "as-needed"],
        radix: "off",
        "require-atomic-updates": "off",
        "require-unicode-regexp": "off",
        "sort-keys": "off",
        "sort-imports": ["warn", {ignoreDeclarationSort: true, ignoreCase: true}],
        "spaced-comment": ["warn", "always", {markers: ["/", "//"]}],

        "@typescript-eslint/ban-types": [
            "warn",
            {
                extendDefaults: false,
                types: {
                    String: {
                        message: "Use string instead",
                        fixWith: "string"
                    },
                    Number: {
                        message: "Use number instead",
                        fixWith: "number"
                    },
                    Boolean: {
                        message: "Use boolean instead",
                        fixWith: "boolean"
                    },
                    Function: {
                        message: "Use a proper function type instead"
                    }
                }
            }
        ],
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/class-literal-property-style": "off",
        "@typescript-eslint/consistent-indexed-object-style": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/init-declarations": "off",
        "@typescript-eslint/lines-between-class-members": ["warn", "always", {exceptAfterSingleLine: true}],
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/method-signature-style": "off",
        "@typescript-eslint/naming-convention": [
            "warn",
            {selector: "default", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow"},
            {selector: "enumMember", format: ["PascalCase"]},
            {selector: "objectLiteralMethod", format: null},
            {selector: "objectLiteralProperty", format: null},
            {selector: "typeLike", format: ["PascalCase"], leadingUnderscore: "allow"},
            {selector: "variable", format: ["camelCase", "PascalCase", "UPPER_CASE"]}
        ],
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/no-dynamic-delete": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-invalid-void-type": "off",
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-this-alias": ["warn", {allowDestructuring: true, allowedNames: ["self", "that"]}],
        "@typescript-eslint/no-type-alias": "off",
        "@typescript-eslint/no-unnecessary-condition": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "@typescript-eslint/prefer-reduce-type-parameter": "off",
        "@typescript-eslint/prefer-ts-expect-error": "off",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/require-array-sort-compare": ["warn", {ignoreStringArrays: true}],
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/sort-type-union-intersection-members": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/switch-exhaustiveness-check": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/unified-signatures": "off",

        "import/order": [
            "warn",
            {
                alphabetize: {order: "asc", caseInsensitive: true},
                groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
                "newlines-between": "always",
                pathGroups: [
                    {
                        pattern:
                            "{.,..,../..,../../..,../../../..,../../../../..,../../../../../..}/{model,services,stores}/**",
                        group: "parent",
                        position: "before"
                    },
                    {
                        pattern: "*.css",
                        patternOptions: {matchBase: true},
                        group: "type",
                        position: "after"
                    }
                ]
            }
        ],

        "react/destructuring-assignment": "off",
        "react/display-name": "off",
        "react/forbid-component-props": "off",
        "react/jsx-filename-extension": ["warn", {extensions: [".tsx"]}],
        "react/jsx-handler-names": "off",
        "react/jsx-max-depth": "off",
        "react/jsx-no-bind": "off",
        "react/jsx-no-literals": "off",
        "react/jsx-no-target-blank": "off",
        "react/jsx-props-no-spreading": "off",
        "react/jsx-sort-props": ["warn", {reservedFirst: true, ignoreCase: true}],
        "react/no-array-index-key": "off",
        "react/no-deprecated": "off",
        "react/no-multi-comp": "off",
        "react/no-set-state": "off",
        "react/no-unescaped-entities": "off",
        "react/no-unstable-nested-components": "off",
        "react/sort-comp": "off",
        "react/sort-comp": [
            "warn",
            {
                order: [
                    "static-variables",
                    "static-methods",
                    "instance-variables",
                    "lifecycle",
                    "getters",
                    "setters",
                    "everything-else",
                    "render"
                ]
            }
        ],
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off",
        "react/require-optimization": "off"
    },
    settings: {
        "import/internal-regex": "^@focus4/",
        react: {
            version: "detect"
        }
    }
};
