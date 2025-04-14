-- Create Users Table
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       email VARCHAR(50) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       status VARCHAR(15) DEFAULT 'ACTIVE' CHECK ( status in('ACTIVE','INACTIVE') ),
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Roles Table
CREATE TABLE roles (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(50) NOT NULL UNIQUE
);

-- -- Create User Roles Join Table
CREATE TABLE user_roles (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            user_id BIGINT NOT NULL,
                            role_id BIGINT NOT NULL,
                            FOREIGN KEY (user_id) REFERENCES users(id),
                            FOREIGN KEY (role_id) REFERENCES roles(id)
);
