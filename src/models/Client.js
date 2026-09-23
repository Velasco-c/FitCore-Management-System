export class Client {
    #id;
    #firstName;
    #lastName;
    #email;
    #phone;
    #birthDate;
    #gender;
    #status;
    #createdAt;
    #updatedAt;

    constructor({
        id = null,
        firstName = null,
        lastName = null,
        email = null,
        phone = null,
        birthDate = null,
        gender = null,
        status = "ACTIVE",
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.#id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.birthDate = birthDate;
        this.gender = gender;
        this.status = status;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    get id() {
        return this.#id;
    }

    get firstName() {
        return this.#firstName;
    }

    set firstName(value) {
        this.#firstName = value;
    }

    get lastName() {
        return this.#lastName;
    }

    set lastName(value) {
        this.#lastName = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get phone() {
        return this.#phone;
    }

    set phone(value) {
        this.#phone = value;
    }

    get birthDate() {
        return this.#birthDate;
    }

    set birthDate(value) {
        this.#birthDate = value;
    }

    get gender() {
        return this.#gender;
    }

    set gender(value) {
        this.#gender = value;
    }

    get status() {
        return this.#status;
    }

    set status(value) {
        this.#status = value;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }
}