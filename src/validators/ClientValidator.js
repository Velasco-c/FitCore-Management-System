export class ClientValidator {

    static validateCreate(data = {}) {
        const {
            firstName,
            lastName,
            email,
            phone = null,
            birthDate = null,
            gender = null,
            status = "ACTIVE"
        } = data;

        this.validateName(firstName, "firstName");
        this.validateName(lastName, "lastName");
        this.validateEmail(email);
        this.validateGender(gender);
        this.validateStatus(status);
        this.validateDate(birthDate, "birthDate");

        return {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            phone,
            birthDate,
            gender,
            status
        };
    }

    static validateUpdate(data = {}) {
        return this.validateCreate(data);
    }

    static validateName(value, field) {
        if (typeof value !== "string" || !value.trim()) {
            throw new Error(`${field} es obligatorio.`);
        }
    }

    static validateEmail(email) {
        if (
            typeof email !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            throw new Error("El email no es válido.");
        }
    }

    static validateGender(gender) {
        if (
            gender !== null &&
            !["MALE", "FEMALE", "OTHER"].includes(gender)
        ) {
            throw new Error("El género no es válido.");
        }
    }

    static validateStatus(status) {
        if (!["ACTIVE", "INACTIVE"].includes(status)) {
            throw new Error("El estado no es válido.");
        }
    }

    static validateDate(value, field) {
        if (value === null) return;

        if (Number.isNaN(Date.parse(value))) {
            throw new Error(`${field} no es una fecha válida.`);
        }
    }
}