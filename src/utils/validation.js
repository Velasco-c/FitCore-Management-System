const DATE_PATTERN =
    /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/;


export function isFiniteNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
}

export function isPositiveInteger(value) {
    return Number.isInteger(value) && value > 0;
}

export function isValidDate(value) {
    if (value instanceof Date) {
        return !Number.isNaN(value.getTime());
    }

    if (typeof value !== "string") {
        return false;
    }

    const match = DATE_PATTERN.exec(value);

    if (!match) {
        return false;
    }

    const [year, month, day, hour = 0, minute = 0, second = 0] =
        match.slice(1).map(Number);

    if (hour > 23 || minute > 59 || second > 59) {
        return false;
    }

    const date = new Date(Date.UTC(year, month - 1, day));

    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
    );
}
