export const createSQL = `

CREATE TABLE categories (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE components (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    code VARCHAR(50) UNIQUE NOT NULL,
    link VARCHAR(255)
);

CREATE TABLE pods (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(10) UNIQUE NOT NULL,
    category_id INT NOT NULL REFERENCES categories (id) ON DELETE RESTRICT
);

CREATE TABLE pod_components (
    pod_id INT NOT NULL REFERENCES pods (id) ON DELETE CASCADE,
    component_id INT NOT NULL REFERENCES components (id) ON DELETE CASCADE,
    note VARCHAR(255),
    PRIMARY KEY (pod_id, component_id)
);

CREATE TABLE pod_compatibility (
    pod1_id INT NOT NULL REFERENCES pods (id) ON DELETE CASCADE,
    pod2_id INT NOT NULL REFERENCES pods (id) ON DELETE CASCADE,
    PRIMARY KEY (pod1_id, pod2_id),
    CHECK (pod1_id < pod2_id)
);

CREATE INDEX idx_components_code ON components (code);
CREATE INDEX idx_pod_components_component_id ON pod_components (component_id);
CREATE INDEX idx_pod_compatibility_pod1_id ON pod_compatibility (pod1_id);
CREATE INDEX idx_pod_compatibility_pod2_id ON pod_compatibility (pod2_id);


`;
