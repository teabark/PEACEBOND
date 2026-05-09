export function isProtectedIdentity(peaceBond) {
  return Boolean(peaceBond?.protectedIdentity);
}

export function getParticipantId(peaceBond) {
  return typeof peaceBond?.participantId === "string" ? peaceBond.participantId.trim() : "";
}

export function getParticipantReference(peaceBond, t) {
  const participant = typeof t === "function" ? t("identity.participant") : "Participant";
  const participantId = getParticipantId(peaceBond);
  return participantId ? `${participant} ${participantId}` : participant;
}

export function getSharedDisplayName(peaceBond, t) {
  if (isProtectedIdentity(peaceBond)) {
    return getParticipantReference(peaceBond, t);
  }

  return peaceBond?.fighterName || (typeof t === "function" ? t("certificate.rehabilitatee") : "Rehabilitatee");
}

export function getCertificateSubject(peaceBond, t) {
  if (isProtectedIdentity(peaceBond)) {
    return getParticipantId(peaceBond) || getParticipantReference(peaceBond, t);
  }

  return peaceBond?.fighterName || (typeof t === "function" ? t("certificate.rehabilitatee") : "Rehabilitatee");
}

export function maskPhoneNumber(phoneNumber) {
  const value = typeof phoneNumber === "string" ? phoneNumber.trim() : "";

  if (!value) {
    return "";
  }

  const totalDigits = [...value].filter((character) => /\d/.test(character)).length;

  if (totalDigits <= 6) {
    return value.replace(/\d/g, "•");
  }

  let digitIndex = 0;
  return [...value]
    .map((character) => {
      if (!/\d/.test(character)) {
        return character;
      }

      digitIndex += 1;
      return digitIndex <= 4 || digitIndex > totalDigits - 3 ? character : "•";
    })
    .join("");
}

export function getSharedPhoneNumber(peaceBond, fallback = "") {
  const phoneNumber = typeof peaceBond?.phoneNumber === "string" ? peaceBond.phoneNumber.trim() : "";

  if (!phoneNumber) {
    return fallback;
  }

  return isProtectedIdentity(peaceBond) ? maskPhoneNumber(phoneNumber) : phoneNumber;
}
