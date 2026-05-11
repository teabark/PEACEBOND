export function isProtectedIdentity(peaceBond) {
  const protectedValue = peaceBond?.protectedIdentity;
  const rawParticipantId =
    typeof peaceBond?.participantId === "string" ? peaceBond.participantId.trim() : "";

  return (
    protectedValue === true ||
    protectedValue === "true" ||
    protectedValue === 1 ||
    protectedValue === "1" ||
    protectedValue === "on" ||
    rawParticipantId.length > 0
  );
}

export function getParticipantId(peaceBond) {
  const storedParticipantId =
    typeof peaceBond?.participantId === "string" ? peaceBond.participantId.trim() : "";

  if (storedParticipantId) {
    return storedParticipantId;
  }

  if (!isProtectedIdentity(peaceBond)) {
    return "";
  }

  const sourceId = String(peaceBond?._id || peaceBond?.id || "").trim();

  if (!sourceId) {
    return "PB-PROTECTED";
  }

  return `PB-${sourceId.slice(-6).toUpperCase()}`;
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
    return getParticipantReference(peaceBond, t);
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
    return value.replace(/\d/g, "*");
  }

  let digitIndex = 0;
  return [...value]
    .map((character) => {
      if (!/\d/.test(character)) {
        return character;
      }

      digitIndex += 1;
      return digitIndex <= 4 || digitIndex > totalDigits - 3 ? character : "*";
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
