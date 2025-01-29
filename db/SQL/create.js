export const createSQL = `

CREATE TABLE categories (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE components (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    code VARCHAR(50) UNIQUE NOT NULL,
    category_id INT NOT NULL REFERENCES categories (id) ON DELETE RESTRICT,
    link VARCHAR(255)
);

CREATE TABLE compatibility (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    component_id INT NOT NULL REFERENCES components (id) ON DELETE CASCADE,
    compatible_id INT NOT NULL REFERENCES components (id) ON DELETE CASCADE,
    component_note VARCHAR(255),
    compatible_note VARCHAR(255),
    UNIQUE (component_id, compatible_id)
);

`;
