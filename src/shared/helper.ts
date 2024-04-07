export const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username?.slice(0, 3) + '***';
    return maskedUsername + '@' + domain;
  }