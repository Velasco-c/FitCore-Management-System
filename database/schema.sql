-- ============================================================
-- BASE DE DATOS
-- ============================================================

DROP DATABASE IF EXISTS fitcore_management;

CREATE DATABASE fitcore_management;

USE fitcore_management;


-- ============================================================
-- TABLA: CLIENTES
-- ============================================================

CREATE TABLE clients (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    birth_date DATE,
    gender VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_clients_status
        CHECK (
            status IN ('ACTIVE', 'INACTIVE')
        ),

    CONSTRAINT chk_clients_gender
        CHECK (
            gender IS NULL
            OR gender IN ('MALE', 'FEMALE', 'OTHER')
        )
) ENGINE=InnoDB;


-- ============================================================
-- TABLA: PLANES DE ENTRENAMIENTO
-- ============================================================

CREATE TABLE training_plans (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    duration_weeks SMALLINT UNSIGNED NOT NULL,
    physical_goals TEXT,
    level VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_training_plans_duration
        CHECK (
            duration_weeks > 0
        ),

    CONSTRAINT chk_training_plans_level
        CHECK (
            level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')
        ),

    CONSTRAINT chk_training_plans_price
        CHECK (
            price >= 0
        ),

    CONSTRAINT chk_training_plans_status
        CHECK (
            status IN ('ACTIVE', 'INACTIVE')
        )
) ENGINE=InnoDB;


-- ============================================================
-- TABLA: PLANES ASIGNADOS A CLIENTES
-- ============================================================

CREATE TABLE client_plans (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_id BIGINT UNSIGNED NOT NULL,
    training_plan_id BIGINT UNSIGNED NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    agreed_price DECIMAL(10,2) NOT NULL,
    goal TEXT,
    cancelled_at DATETIME,
    cancellation_reason VARCHAR(255),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_client_plans_dates
        CHECK (
            end_date >= start_date
        ),

    CONSTRAINT chk_client_plans_status
        CHECK (
            status IN (
                'ACTIVE',
                'COMPLETED',
                'CANCELLED',
                'EXPIRED'
            )
        ),

    CONSTRAINT chk_client_plans_price
        CHECK (
            agreed_price >= 0
        ),

    CONSTRAINT chk_client_plans_cancellation
        CHECK (
            (
                status = 'CANCELLED'
                AND cancelled_at IS NOT NULL
            )
            OR
            (
                status <> 'CANCELLED'
                AND cancelled_at IS NULL
            )
        ),

    CONSTRAINT fk_client_plans_client
        FOREIGN KEY (client_id)
        REFERENCES clients(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_client_plans_training_plan
        FOREIGN KEY (training_plan_id)
        REFERENCES training_plans(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;


-- ============================================================
-- TABLA: CONTRATOS
-- ============================================================

CREATE TABLE contracts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_plan_id BIGINT UNSIGNED NOT NULL,
    contract_number VARCHAR(50) NOT NULL,
    conditions TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_contracts_dates
        CHECK (
            end_date >= start_date
        ),

    CONSTRAINT chk_contracts_price
        CHECK (
            price >= 0
        ),

    CONSTRAINT chk_contracts_status
        CHECK (
            status IN (
                'ACTIVE',
                'COMPLETED',
                'CANCELLED',
                'EXPIRED'
            )
        ),

    CONSTRAINT fk_contracts_client_plan
        FOREIGN KEY (client_plan_id)
        REFERENCES client_plans(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;


-- ============================================================
-- TABLA: REGISTROS DE PROGRESO FÍSICO
-- ============================================================

CREATE TABLE progress_records (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_plan_id BIGINT UNSIGNED NOT NULL,
    record_date DATE NOT NULL,
    weight_kg DECIMAL(5,2),
    body_fat_percentage DECIMAL(5,2),
    waist_cm DECIMAL(6,2),
    chest_cm DECIMAL(6,2),
    arm_cm DECIMAL(6,2),
    leg_cm DECIMAL(6,2),
    photo_url VARCHAR(500),
    comments TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_progress_weight
        CHECK (
            weight_kg IS NULL
            OR weight_kg > 0
        ),

    CONSTRAINT chk_progress_body_fat
        CHECK (
            body_fat_percentage IS NULL
            OR (
                body_fat_percentage >= 0
                AND body_fat_percentage <= 100
            )
        ),

    CONSTRAINT chk_progress_waist
        CHECK (
            waist_cm IS NULL
            OR waist_cm > 0
        ),

    CONSTRAINT chk_progress_chest
        CHECK (
            chest_cm IS NULL
            OR chest_cm > 0
        ),

    CONSTRAINT chk_progress_arm
        CHECK (
            arm_cm IS NULL
            OR arm_cm > 0
        ),

    CONSTRAINT chk_progress_leg
        CHECK (
            leg_cm IS NULL
            OR leg_cm > 0
        ),

    CONSTRAINT fk_progress_client_plan
        FOREIGN KEY (client_plan_id)
        REFERENCES client_plans(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;


-- ============================================================
-- TABLA: PLANES DE NUTRICIÓN
-- ============================================================

CREATE TABLE nutrition_plans (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_plan_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    daily_calorie_target DECIMAL(8,2),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_nutrition_plans_dates
        CHECK (
            end_date >= start_date
        ),

    CONSTRAINT chk_nutrition_calories
        CHECK (
            daily_calorie_target IS NULL
            OR daily_calorie_target > 0
        ),

    CONSTRAINT chk_nutrition_plans_status
        CHECK (
            status IN (
                'ACTIVE',
                'INACTIVE',
                'COMPLETED'
            )
        ),

    CONSTRAINT fk_nutrition_plans_client_plan
        FOREIGN KEY (client_plan_id)
        REFERENCES client_plans(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;


-- ============================================================
-- TABLA: DÍAS DE NUTRICIÓN
-- ============================================================

CREATE TABLE nutrition_days (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nutrition_plan_id BIGINT UNSIGNED NOT NULL,
    day_date DATE NOT NULL,
    notes TEXT,

    CONSTRAINT fk_nutrition_days_plan
        FOREIGN KEY (nutrition_plan_id)
        REFERENCES nutrition_plans(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;


-- ============================================================
-- TABLA: ALIMENTOS
-- ============================================================

CREATE TABLE foods (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    calories_per_100g DECIMAL(8,2),
    unit VARCHAR(30) NOT NULL DEFAULT 'g',
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_foods_calories
        CHECK (
            calories_per_100g IS NULL
            OR calories_per_100g >= 0
        ),

    CONSTRAINT chk_foods_status
        CHECK (
            status IN ('ACTIVE', 'INACTIVE')
        )
) ENGINE=InnoDB;


-- ============================================================
-- TABLA: ALIMENTOS POR DÍA DE NUTRICIÓN
-- ============================================================

CREATE TABLE nutrition_day_foods (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nutrition_day_id BIGINT UNSIGNED NOT NULL,
    food_id BIGINT UNSIGNED NOT NULL,
    meal_type VARCHAR(20) NOT NULL,
    quantity DECIMAL(8,2) NOT NULL,
    estimated_calories DECIMAL(8,2),
    notes TEXT,

    CONSTRAINT chk_nutrition_day_foods_quantity
        CHECK (
            quantity > 0
        ),

    CONSTRAINT chk_nutrition_day_foods_calories
        CHECK (
            estimated_calories IS NULL
            OR estimated_calories >= 0
        ),

    CONSTRAINT chk_nutrition_day_foods_meal
        CHECK (
            meal_type IN (
                'BREAKFAST',
                'SNACK',
                'LUNCH',
                'DINNER'
            )
        ),

    CONSTRAINT fk_nutrition_day_foods_day
        FOREIGN KEY (nutrition_day_id)
        REFERENCES nutrition_days(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_nutrition_day_foods_food
        FOREIGN KEY (food_id)
        REFERENCES foods(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;


-- ============================================================
-- TABLA: TRANSACCIONES FINANCIERAS
-- ============================================================

CREATE TABLE financial_transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_plan_id BIGINT UNSIGNED,
    type VARCHAR(20) NOT NULL,
    category VARCHAR(30) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_date DATETIME NOT NULL,
    payment_method VARCHAR(30),
    description VARCHAR(255),
    reference VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'COMPLETED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_financial_type
        CHECK (
            type IN ('INCOME', 'EXPENSE')
        ),

    CONSTRAINT chk_financial_category
        CHECK (
            category IN (
                'MEMBERSHIP',
                'PERSONAL_SESSION',
                'SERVICES',
                'SUPPLEMENTS',
                'OPERATING',
                'OTHER'
            )
        ),

    CONSTRAINT chk_financial_amount
        CHECK (
            amount > 0
        ),

    CONSTRAINT chk_financial_status
        CHECK (
            status IN (
                'PENDING',
                'COMPLETED',
                'CANCELLED'
            )
        ),

    CONSTRAINT chk_financial_payment_method
        CHECK (
            payment_method IS NULL
            OR payment_method IN (
                'CASH',
                'CARD',
                'TRANSFER',
                'OTHER'
            )
        ),

    CONSTRAINT fk_financial_transactions_client_plan
        FOREIGN KEY (client_plan_id)
        REFERENCES client_plans(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;


-- ============================================================
-- ÍNDICES
-- ============================================================

-- CLIENTS

CREATE UNIQUE INDEX uq_clients_email
    ON clients(email);

CREATE INDEX idx_clients_last_name
    ON clients(last_name);


-- TRAINING_PLANS

CREATE UNIQUE INDEX uq_training_plans_name
    ON training_plans(name);


-- CLIENT_PLANS

CREATE INDEX idx_client_plans_training_plan
    ON client_plans(training_plan_id);

CREATE INDEX idx_client_plans_client_status
    ON client_plans(client_id, status);


-- CONTRACTS

CREATE UNIQUE INDEX uq_contracts_client_plan
    ON contracts(client_plan_id);

CREATE UNIQUE INDEX uq_contracts_number
    ON contracts(contract_number);

CREATE INDEX idx_contracts_status
    ON contracts(status);


-- PROGRESS_RECORDS

CREATE UNIQUE INDEX uq_progress_client_plan_date
    ON progress_records(client_plan_id, record_date);


-- NUTRITION_PLANS

CREATE INDEX idx_nutrition_plans_client_status
    ON nutrition_plans(client_plan_id, status);


-- NUTRITION_DAYS

CREATE UNIQUE INDEX uq_nutrition_days_plan_date
    ON nutrition_days(nutrition_plan_id, day_date);


-- FOODS

CREATE UNIQUE INDEX uq_foods_name
    ON foods(name);


-- NUTRITION_DAY_FOODS

CREATE INDEX idx_nutrition_day_foods_food
    ON nutrition_day_foods(food_id);


-- FINANCIAL_TRANSACTIONS

CREATE INDEX idx_financial_client_date
    ON financial_transactions(client_plan_id, transaction_date);

CREATE INDEX idx_financial_date_type
    ON financial_transactions(transaction_date, type);