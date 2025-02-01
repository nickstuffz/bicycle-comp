export const createSQL = `

CREATE TABLE categories (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE components (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    code VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL,
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
    podA_id INT NOT NULL REFERENCES pods (id) ON DELETE CASCADE,
    podB_id INT NOT NULL REFERENCES pods (id) ON DELETE CASCADE,
    PRIMARY KEY (podA_id, podB_id),
    CHECK (podA_id <= podB_id)
);

CREATE INDEX idx_components_code ON components (code);
CREATE INDEX idx_pods_name ON pods (name);
CREATE INDEX idx_pod_components_pod_id ON pod_components (pod_id);
CREATE INDEX idx_pod_components_component_id ON pod_components (component_id);
CREATE INDEX idx_pod_compatibility_pod1_id ON pod_compatibility (podA_id);
CREATE INDEX idx_pod_compatibility_pod2_id ON pod_compatibility (podB_id);


`;
