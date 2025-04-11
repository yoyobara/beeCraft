type ValidationResult = { ok: true } | { ok: false; reason: string };

export const validateEmail = (email: string): ValidationResult => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? { ok: true }
        : { ok: false, reason: 'please enter a valid email.' };
};

export const validatePassword = (password: string): ValidationResult => {
    return password.length >= 8
        ? { ok: true }
        : {
              ok: false,
              reason: 'password length must be 8 characters or more.',
          };
};

export const validateFullName = (fullName: string): ValidationResult => {
    return fullName.length === 0
        ? { ok: false, reason: 'full name is empty.' }
        : { ok: true };
};
